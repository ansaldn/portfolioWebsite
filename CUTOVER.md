# Portfolio consolidation & domain cutover

This guide walks through finishing the consolidation of the two portfolio folders down to one (`portfolioWebsite`, the React/Vite site under `ansaldn/portfolioWebsite`), and pointing `davidansa.com` at it.

## What's already been done in this folder

Inside `~/portfolioWebsite` the following changes are staged but **not yet committed**:

- `CNAME` created (contents: `davidansa.com`) — tells GitHub Pages this site owns the custom domain.
- `vite.config.ts` — `base` changed from `"/portfolioWebsite/"` to `"/"`. Required for serving from an apex custom domain; without this every asset URL would 404.
- `package.json` — `homepage` changed from `https://beta.davidansa.com/` to `https://davidansa.com/`.
- `src/AppCSS.css` — reverted half-finished `#p1 { position: fixed; }` block.
- `src/components/MainBody.tsx` — reverted broken Cloudflare Stream embed experiment (an iframe URL was set as a `<video src>`, which would not have played).

## Step 1 — Commit and push the new config

```bash
cd ~/portfolioWebsite
git status                                # sanity check: CNAME new, vite.config.ts + package.json modified
git add CNAME vite.config.ts package.json
git commit -m "Configure for davidansa.com apex domain (CNAME, base path, homepage)"
git push origin gh-pages
```

## Step 2 — Build & deploy

The repo deploys via the `gh-pages` package. From `~/portfolioWebsite`:

```bash
npm install                               # only if node_modules is stale
npm run deploy                            # runs predeploy (build) then publishes /dist to gh-pages
```

If `gh-pages` isn't installed, run `npm install --save-dev gh-pages` first.

## Step 3 — Free `davidansa.com` from the old repo

GitHub Pages will refuse to attach `davidansa.com` to `ansaldn/portfolioWebsite` while another repo (`da5905p/portfolio`) is also claiming it via its CNAME.

Pick **one** of the following.

### Option A (recommended) — disable Pages on the old repo

1. Go to https://github.com/da5905p/portfolio/settings/pages
2. Under "Build and deployment", set Source to **None**, or delete the CNAME from the repo:
   ```bash
   cd ~/some-other-location
   git clone https://github.com/da5905p/portfolio.git portfolio-archive
   cd portfolio-archive
   git rm CNAME
   git commit -m "Release davidansa.com — superseded by ansaldn/portfolioWebsite"
   git push
   ```
3. (Optional) Archive the repo from its Settings page so it's clearly retired.

### Option B — delete the old repo entirely

Settings → "Danger Zone" → Delete repository. The local copy of `~/portfolio` has every commit already pushed, so nothing extra is being lost, but **once deleted from GitHub there is no recovery**. Option A is safer.

## Step 4 — Configure GitHub Pages on the new repo

1. https://github.com/ansaldn/portfolioWebsite/settings/pages
2. Source: **Deploy from a branch**, Branch: **gh-pages**, Folder: **/ (root)**.
3. Custom domain: **davidansa.com** → Save. GitHub will do a DNS check.
4. Check **Enforce HTTPS** once the cert provisions (can take a few minutes to an hour).

## Step 5 — DNS in AWS Route 53

You mentioned the domain is registered through AWS. In Route 53, on the hosted zone for `davidansa.com`:

1. Delete any existing A records for the apex that point elsewhere.
2. Add four A records for the apex (`davidansa.com`), each pointing to one of GitHub Pages' anycast IPs:
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`
3. Add a CNAME for `www.davidansa.com` → `ansaldn.github.io`.

DNS propagation usually finishes in minutes but can take up to 24h.

## Step 6 — Verify

```bash
# Apex resolves to GitHub Pages
dig +short davidansa.com
# Expect: 185.199.108.153 / .109.153 / .110.153 / .111.153

# CNAME for www points to GitHub
dig +short www.davidansa.com

# HTTPS works
curl -I https://davidansa.com
```

Open https://davidansa.com in a fresh browser/incognito to bypass cached redirects to the old Jekyll site.

## Step 7 — Delete the old local folder

Once the new site is live and you've confirmed it works:

```bash
rm -rf ~/portfolio
```

The `da5905p/portfolio` repo (if you didn't delete it in Step 3) is your backup.

## Step 8 — Future workflow

Going forward, this is the only folder you edit:

```bash
cd ~/portfolioWebsite
git pull
# edit src/ ...
npm run dev                               # local preview at http://localhost:5173
git add . && git commit -m "..."
git push origin gh-pages                  # source-of-truth branch
npm run deploy                            # publish updated /dist
```

## Heads up

- The `homepage` change to `https://davidansa.com/` assumes you're cutting straight over. If you'd rather use `beta.davidansa.com` as a staging subdomain in the future, you can add a separate CNAME and DNS record for it pointing back to the same `ansaldn.github.io`, and use a different gh-pages branch or repo for it.
- Your `.env` file is correctly gitignored — Auth0 keys won't leak. When you wire up Auth0 production CIAM, remember GitHub Pages is static-only, so any client-side secrets in the bundled JS will be visible. Stick to Auth0's SPA flow (PKCE, public client ID only).
