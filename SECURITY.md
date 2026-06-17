# Security review — May 2026

This document captures the original security pass on `ansaldn/portfolioWebsite`. It's split into: what was fixed in this pass, what you need to verify manually (Auth0), and hardening that has since been implemented on AWS.

> **Hosting note:** the site now runs entirely on AWS (S3 + CloudFront + WAF), deployed via GitHub Actions on push to `main`. Some items below were originally written while the site was on static hosting without custom response headers; the "deferred" hardening they describe has since been delivered through the CloudFront response-headers policy in `infra/cloudfront.tf`. See the June 2026 section at the end for the current state.

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

- **GHSA-67mh-4wv8-2f99** (CVSS 5.3, MOD) — `esbuild <= 0.24.2` allows any visited website to issue cross-origin requests to the local Vite dev server. **Resolved** — see the "esbuild removed" note below.

### Code-level — fixed

- **CWE-1022 (Reverse Tabnabbing)** — five `<a target="_blank">` elements were missing `rel="noopener noreferrer"`. Without it, the opened tab can call `window.opener.location = "phishing.example"` and silently redirect the original tab. Modern browsers default to `noopener` since 2021, but stating it explicitly defeats older browsers and makes the security intent reviewable.
  - `src/App.tsx` — Vite logo link, React logo link.
  - `src/pages/HomePage.tsx` — Vite logo link, React logo link.
  - `src/components/Navbar.tsx` — brand logo link.

- **Invalid markup** — `src/components/Navbar.tsx` had `target=""` on the Services link, which is invalid HTML. Removed.

- **Broken navbar brand link** — the brand element pointed to `https://google.com` (left over from scaffolding). Changed to `href="/"`.

- **Services link href fixed** — was `./Services/` (case-sensitive 404 on static hosting); now `/services` matching the React Router route.

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

If any of these is wide-open (e.g. wildcard origins, or a stale/old URL still in the list), someone could initiate login flows in your name. **Lock these down before launch.**

### Hosting hygiene

- TLS + HSTS are enforced at CloudFront (`viewer_protocol_policy = redirect-to-https`, minimum TLS 1.2_2021).
- The S3 origin is private and only reachable via CloudFront (OAC); there is no public bucket URL to leak.
- Deploys are gated to the `main` branch of `ansaldn/portfolioWebsite` via the OIDC trust policy — no other repo or branch can assume the deploy role.

### Auth0 production tenant secret hygiene

Auth0 production tenants additionally let you configure:

- **Bot Detection** — turn on.
- **Attack Protection** → Brute Force Protection, Suspicious IP Throttling, Breached Password Detection — all on.
- **MFA** at least as optional for accounts.

## Now implemented on AWS

These items were originally deferred because the previous static host couldn't send custom HTTP response headers. They are now live, served as real headers from the CloudFront Response Headers Policy in `infra/cloudfront.tf`:

- `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`.
- `X-Content-Type-Options: nosniff`.
- `X-Frame-Options: DENY` plus CSP `frame-ancestors 'none'`.
- `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()`.
- `Cross-Origin-Opener-Policy: same-origin` and `Cross-Origin-Resource-Policy: same-origin`.
- CSP served as a real HTTP header (the `<meta>` CSP in `index.html` is kept as defense-in-depth and mirrors it).

CloudFront-level controls now in place (`infra/`):

- AWS WAFv2 with the Common Rule Set, Known Bad Inputs, Amazon IP reputation list, and a per-IP rate limit.
- AWS Shield Standard (free, automatic with CloudFront).
- Origin Access Control (OAC) so the S3 bucket is only reachable via CloudFront, never publicly.
- Deploys via GitHub Actions using short-lived OIDC credentials — no long-lived AWS keys stored anywhere.

Still optional / future: a `report-uri`/`report-to` CSP reporting endpoint, and geo-restriction if you ever want to limit traffic by country.

## Refresh pass — June 2026 (light/dark, new pages, booking)

This pass added a light/dark theme, two new pages (`/business`, `/engage`), and a calendar-booking flow gated by a form + CAPTCHA. Security-relevant changes:

### Content-Security-Policy widened deliberately

Two new third-party origins are now allowed, scoped as tightly as the features require:

- `https://challenges.cloudflare.com` — Cloudflare Turnstile. Added to `script-src` (its widget JS), `connect-src` (token exchange) and `frame-src` (the challenge iframe).
- `https://calendar.google.com` — added to `frame-src` only, for the Google Calendar appointment-schedule embed.

The previously unconditional `script-src 'self'` would have blocked both Turnstile *and* the new no-flash theme bootstrap script. Rather than open the policy with `'unsafe-inline'`, the inline theme script is whitelisted by its **sha256 hash** (`sha256-FM9335IYB+CagqAQ5LlFs4CWc4d0wQH8kSORA7tA04I=`). If you edit that script in `index.html`, recompute the hash and update it in **both** `index.html` and `infra/cloudfront.tf`:

```bash
printf '%s' '<exact script contents>' | openssl dgst -sha256 -binary | openssl base64
```

The authoritative CSP is the CloudFront Response Headers Policy (`infra/cloudfront.tf`); the `<meta>` copy in `index.html` is a fallback and is kept in sync.

### Booking-form anti-abuse

The `/engage` form gates access to the calendar behind three layers:

1. **Required real details** — name, work email, company and a context note are mandatory before the booking step renders.
2. **Cloudflare Turnstile** — a privacy-preserving CAPTCHA. Falls back to Cloudflare's official "always passes" test key (`1x00000000000000000000AA`) with an on-screen notice when `VITE_TURNSTILE_SITE_KEY` is unset, so the flow stays demoable. **Set your real site key before launch.**
3. **Honeypot field** — a hidden `website` input; any submission that fills it is silently dropped.

**Important limitation (read before relying on the CAPTCHA).** Turnstile only provides real protection when the returned token is verified server-side against your Turnstile **secret** key. This site is statically hosted (S3/CloudFront) with no backend, so the token is currently collected and forwarded but not cryptographically verified. As-is, the CAPTCHA meaningfully raises the bar against casual/automated abuse of the UI, but it is not a server-enforced gate. To make it authoritative, do one of:

- Enable Formspree's own built-in CAPTCHA/spam protection (simplest, free), or
- Add a tiny verifier (e.g. an AWS Lambda behind API Gateway, or a Cloudflare Worker) that POSTs the token to `https://challenges.cloudflare.com/turnstile/v0/siteverify` with the secret key and only then accepts the submission. The secret key must live there, never in the client bundle.

### Env / secret hygiene

All `VITE_*` variables are baked into the public client bundle at build time. Only public identifiers belong there (Turnstile *site* key, Auth0 *client* ID, Formspree endpoint, the Google Calendar embed URL). Never put a Turnstile *secret* key, Auth0 client secret, or any private token in a `VITE_*` variable. `.env.example` now states this explicitly.

## esbuild removed — Vite 8 upgrade (June 2026)

A Dependabot alert flagged a high-severity esbuild issue (RCE via `NPM_CONFIG_REGISTRY`, fixed in esbuild ≥ 0.28.1). esbuild was a **transitive, build-time-only** dependency pulled in by Vite 5 (`vite 5.4.21 → esbuild 0.21.5`); it is never shipped in the production browser bundle.

Forcing `esbuild ≥ 0.28.1` via an npm `overrides` entry was tested and **breaks the Vite 5 build** ("transforming destructuring … not supported yet") — Vite 5 is not compatible with that esbuild line.

The clean fix was to upgrade the build toolchain:

- `vite` → `^8.0.16`, `@vitejs/plugin-react` → `^6.0.2`.
- **Vite 8 no longer depends on esbuild at all** (it bundles with Rolldown), so the vulnerable package is removed from the tree entirely rather than merely bumped. `npm ls esbuild` returns empty; the only remaining reference in `package-lock.json` is an *optional* peer-dependency declaration (`^0.27.0 || ^0.28.0`) that is not installed.
- This also resolves the older dev-server CVE (GHSA-67mh-4wv8-2f99) for the same reason.

Operational notes:

- **Node version:** Vite 8 requires Node `^20.19.0 || >=22.12.0`. The GitHub Actions workflow was bumped to Node 22; make sure your local Node is on a supported version before running `npm install` / `npm run dev`.
- Verified with a clean `npm ci` + `tsc` + `vite build` on the new lockfile.

## Apply locally

Pull the dep upgrades into your working tree:

```bash
cd ~/portfolioWebsite
rm -rf node_modules package-lock.json
npm install
npm audit            # esbuild is gone post-Vite-8; expect a clean or near-clean report
npm run build        # confirm the build still works
npm run dev          # smoke test locally
```

Then commit:

```bash
git add package.json package-lock.json index.html src/ SECURITY.md
git commit -m "Security pass: bump deps (incl. react-router-dom CVE), add CSP/referrer meta, fix tabnabbing"
git push origin main   # GitHub Actions builds and deploys to AWS automatically
```
