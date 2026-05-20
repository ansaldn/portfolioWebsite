# Security review — May 2026

This document captures the security pass on `ansaldn/portfolioWebsite` after the davidansa.com cutover. It's split into: what was fixed in this pass, what you need to verify manually (Auth0, GitHub Pages), and what's deferred to the phase‑2 CloudFront migration.

## Findings fixed in this pass

### Dependency CVEs (npm audit)

Production-impact CVE — fixed.

- **GHSA-2w69-qvjg-hvjx** (CVSS 8.0, HIGH) — *React Router vulnerable to XSS via Open Redirects* in `@remix-run/router <= 1.23.1`, transitively pulled in by `react-router-dom@6.23.1`. Bumped `react-router-dom` to `^6.30.3`, which pulls a patched router.

Dev-environment CVEs — fixed by safe within-major upgrades.

- **GHSA-3xgq-45jj-v275** (CVSS 7.5, HIGH) — ReDoS in `cross-spawn`.
- **GHSA-25h7-pfq9-p65f** + **GHSA-rf6f-7fwh-wjgh** (HIGH) — unbounded recursion + prototype pollution in `flatted`.
- **GHSA-968p-4wvh-cqc8** (MOD) — ReDoS in `@babel/helpers`.
- **GHSA-2g4f-4pwh-qvx6** (MOD) — ReDoS in `ajv`.
- **GHSA-v6h2-p8h4-qcjw** + **GHSA-f886-m6hf-6m8v** (MOD) — `brace-expansion` ReDoS / process hang.
- **GHSA-mh29-5h37-fv8m** (MOD) — `js-yaml` prototype pollution.

These resolved automatically once the direct dev dependencies were bumped to their latest within-major versions (`@vitejs/plugin-react ^4.7.0`, `vite ^5.4.21`, `eslint ^8.57.1`, `@typescript-eslint/* ^7.18.0`, `@types/node ^20.19.0`, `bootstrap ^5.3.8`, `react/react-dom ^18.3.1`).

Dev-only CVE that intentionally remains.

- **GHSA-67mh-4wv8-2f99** (CVSS 5.3, MOD) — `esbuild <= 0.24.2` allows any visited website to issue cross-origin requests to the local Vite dev server. Only fixable by upgrading to Vite 6, which is a breaking change for plugins. Filed as a phase-2 item. Exposure is limited: it requires `npm run dev` to be running *and* you to visit a malicious page in the same browser session. Never affects production.

### Code-level — fixed

- **CWE-1022 (Reverse Tabnabbing)** — five `<a target="_blank">` elements were missing `rel="noopener noreferrer"`. Without it, the opened tab can call `window.opener.location = "phishing.example"` and silently redirect the original tab. Modern browsers default to `noopener` since 2021, but stating it explicitly defeats older browsers and makes the security intent reviewable.
  - `src/App.tsx` — Vite logo link, React logo link.
  - `src/pages/HomePage.tsx` — Vite logo link, React logo link.
  - `src/components/Navbar.tsx` — brand logo link.

- **Invalid markup** — `src/components/Navbar.tsx` had `target=""` on the Services link, which is invalid HTML. Removed.

- **Broken navbar brand link** — the brand element pointed to `https://google.com` (left over from scaffolding). Changed to `href="/"`.

- **Services link href fixed** — was `./Services/` (case-sensitive 404 on GitHub Pages); now `/services` matching the React Router route.

### Hardening — added

- **Content-Security-Policy** added via `<meta http-equiv>` in `index.html`. Whitelists same-origin for scripts, styles, images, media and fonts; allows the Auth0 tenant for login redirects and XHR; blocks all object embeds; pins `base-uri` and `form-action` to self. Build-time placeholder `%VITE_AUTH0_DOMAIN%` is replaced by Vite. **Limitation:** CSP via `<meta>` does *not* support `frame-ancestors` or `report-uri`. Phase-2 CloudFront migration should move CSP to an HTTP response header so those work.

- **Referrer-Policy** set to `strict-origin-when-cross-origin` via meta tag.

- **`upgrade-insecure-requests`** CSP directive added — auto-upgrades any accidental `http://` resource to HTTPS.

- **SEO + social meta tags** — title, description, OpenGraph, Twitter Card, canonical URL.

## What you must verify manually

### Auth0 dashboard hygiene — high priority

The Auth0 client ID `yaMlPbWX7bAzrL6zTZflnBNklk4i4uKk` and domain `dev-ljarqqxtl07wecwz.us.auth0.com` exist in git history (commit `7538927`). In the Auth0 SPA flow these are public identifiers by design — anyone who loads the site can read them from the bundled JavaScript — so this is not a credential leak. However the safety of those public IDs depends entirely on your tenant configuration:

1. **Tenant type.** You're using a `dev-*` tenant. Dev tenants have aggressive rate limits and Auth0 reserves the right to revoke them. Before sending traffic from real prospects, create a production tenant.
2. **Allowed Callback URLs.** In Application → Settings → Application URIs, restrict to exactly:
   - `https://davidansa.com`
   - `https://www.davidansa.com`
   - `http://localhost:5173` (only while you actively dev)
3. **Allowed Logout URLs.** Same list as above.
4. **Allowed Web Origins.** Same list.
5. **Allowed Origins (CORS).** Same list.
6. **Grant Types.** Confirm only `Authorization Code` and `Refresh Token` are enabled. Disable Implicit and Password.
7. **Refresh Token Rotation.** Enable it, with reuse interval set to a few seconds.
8. **Application Login URI.** Set to `https://davidansa.com`.

If any of these is wide-open (e.g. wildcard origins, or the old Jekyll repo's URL still in the list), someone could initiate login flows in your name. **Lock these down before launch.**

### GitHub Pages settings

After the CUTOVER steps:

- Confirm `Enforce HTTPS` is enabled on the new repo.
- Confirm only the `gh-pages` branch is the Pages source — no other branch.
- On the **old** `da5905p/portfolio` repo, set Pages source to `None` so it cannot claim `davidansa.com` again.

### Auth0 production tenant secret hygiene

Auth0 production tenants additionally let you configure:

- **Bot Detection** — turn on.
- **Attack Protection** → Brute Force Protection, Suspicious IP Throttling, Breached Password Detection — all on.
- **MFA** at least as optional for accounts.

## Deferred to phase-2 (CloudFront)

GitHub Pages cannot send custom HTTP response headers, so these hardening items can't be applied at the current host. When you migrate to S3 + CloudFront (recommended in the earlier conversation), add a CloudFront Response Headers Policy with:

- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` (and submit to hstspreload.org).
- `X-Content-Type-Options: nosniff`.
- `X-Frame-Options: DENY` (or move to CSP `frame-ancestors 'none'` once CSP is in a header).
- `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()` — explicitly deny browser features the site doesn't use.
- `Cross-Origin-Opener-Policy: same-origin`.
- `Cross-Origin-Resource-Policy: same-origin`.
- Move the existing CSP from `<meta>` to an HTTP header so `frame-ancestors` and `report-uri` work.

CloudFront-level controls worth adding in phase-2:

- AWS WAF with the AWSManagedRulesCommonRuleSet and AWSManagedRulesKnownBadInputsRuleSet.
- AWS Shield Standard (free, automatic).
- Geo restriction if you don't want traffic from certain countries.
- Origin Access Control (OAC) on the S3 bucket so it's only reachable via CloudFront.
- CloudFront Functions or Lambda@Edge to inject the security headers if you'd rather generate them in code than the headers policy.

## Apply locally

Pull the dep upgrades into your working tree:

```bash
cd ~/portfolioWebsite
rm -rf node_modules package-lock.json
npm install
npm audit            # should report only 2 moderate (esbuild dev-only)
npm run build        # confirm the build still works
npm run dev          # smoke test locally
```

Then commit:

```bash
git add package.json package-lock.json index.html src/ SECURITY.md
git commit -m "Security pass: bump deps (incl. react-router-dom CVE), add CSP/referrer meta, fix tabnabbing"
git push origin gh-pages
npm run deploy
```
