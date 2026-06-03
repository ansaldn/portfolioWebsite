# davidansa.com — Infrastructure & Cutover

This document is the source of truth for how the site is hosted and how to
ship a change to production. The Terraform code lives in `infra/` and the
CI/CD workflow in `.github/workflows/deploy.yml`.

## Architecture

```
                           ┌──────────────────────────┐
                           │  Route 53 (davidansa.com)│
                           │  apex + www → ALIAS      │
                           └────────────┬─────────────┘
                                        │
                                        ▼
                  ┌────────────────────────────────────────┐
                  │           AWS WAFv2 (us-east-1)         │
                  │  Managed Core + Bad Inputs + IP rep +   │
                  │  rate limit 2k req/5min per IP          │
                  └────────────────────┬───────────────────┘
                                       │
                                       ▼
                  ┌────────────────────────────────────────┐
                  │           CloudFront distribution       │
                  │  TLS 1.2+ (ACM, us-east-1)              │
                  │  Security headers policy (HSTS, CSP,    │
                  │    frame-ancestors, COOP, CORP)         │
                  │  SPA error rewrites 403/404 → /index    │
                  │  Cache: /assets/* immutable, else no-cache │
                  └────────────────────┬───────────────────┘
                                       │ SigV4 via OAC
                                       ▼
                  ┌────────────────────────────────────────┐
                  │       Site S3 bucket (eu-west-2)        │
                  │  Private, BlockPublicAccess, SSE-S3,    │
                  │  versioned, OAC-only bucket policy      │
                  └────────────────────┬───────────────────┘
                                       │
                                       ▼
                  ┌────────────────────────────────────────┐
                  │      CloudFront access logs (S3)        │
                  │  30-day expiry, same region as site     │
                  └────────────────────────────────────────┘

  ┌─────────────────────────┐         ┌────────────────────────────┐
  │ GitHub repo (ansaldn/   │  OIDC   │ IAM role: ${domain}-github-│
  │ portfolioWebsite@main)  │ ◄─────► │ deploy. Trust narrowly     │
  │ Actions workflow        │         │ scoped to repo:branch.     │
  │  npm ci → build → sync  │         │ Perms: PutObject on bucket,│
  │  → invalidate /*        │         │ CreateInvalidation on dist │
  └─────────────────────────┘         └────────────────────────────┘
```

### Security boundaries

- **No long-lived AWS credentials anywhere.** The deploy role's trust policy
  only accepts an OIDC token issued by GitHub for the exact repo + branch.
- **Site bucket is never public.** Only CloudFront can read it, signed via
  Origin Access Control. The bucket policy also denies any non-TLS request.
- **TLS terminates at CloudFront** with a minimum protocol of TLSv1.2_2021.
  HSTS preload-ready (`includeSubDomains; preload; max-age=31536000`).
- **WAF in count → block ladder.** Managed rule groups operate on every
  request before they reach the origin. Rate limit blocks any IP exceeding
  2 000 req / 5 min.
- **Real security headers** (CSP, COOP, CORP, Permissions-Policy) served
  from CloudFront, not just from a `<meta>` tag. The meta CSP in
  `index.html` stays as defense-in-depth.

## Cutover runbook

This is the one-time migration from GitHub Pages to AWS.

### Pre-flight

- [ ] Confirm AWS CLI is authenticated against the account that owns the
      `davidansa.com` Route 53 hosted zone:
      `aws sts get-caller-identity`
- [ ] Confirm Terraform 1.6+ is installed: `terraform version`
- [ ] Note the current state — `davidansa.com` is currently down (Pages 404).
      That's the baseline; the cutover replaces it with the AWS stack.

### Step 1 — Terraform apply (15–25 min)

```bash
cd infra/
terraform init
terraform plan -out=plan.tfplan
terraform apply plan.tfplan
```

What this does, in order:
1. Creates the site + logs S3 buckets (private).
2. Requests ACM cert in us-east-1, writes DNS validation records to R53,
   waits for validation (~30s).
3. Creates WAFv2 web ACL in us-east-1.
4. Creates CloudFront distribution with all of the above attached. This is
   the long step — CloudFront takes ~15 min to propagate globally.
5. Replaces the apex + www A/AAAA records in R53 with ALIAS records pointing
   at the distribution. **At this moment davidansa.com starts resolving
   to CloudFront instead of GitHub Pages.** The bucket is still empty, so
   requests will get a CloudFront-formatted 404 or the SPA index fallback —
   which is fine, the next step populates the bucket.
6. Provisions the GitHub OIDC provider + deploy role.

Capture the outputs:

```bash
terraform output
```

### Step 2 — Wire GitHub Actions (5 min)

Go to `https://github.com/ansaldn/portfolioWebsite/settings/variables/actions`
and set these **Repository variables** (not secrets):

| Variable                          | Value                                 |
| --------------------------------- | ------------------------------------- |
| `AWS_DEPLOY_ROLE_ARN`             | (from `terraform output -raw github_deploy_role_arn`) |
| `AWS_SITE_BUCKET`                 | (from `terraform output -raw site_bucket_name`) |
| `AWS_CLOUDFRONT_DISTRIBUTION_ID`  | (from `terraform output -raw cloudfront_distribution_id`) |
| `AWS_REGION`                      | `eu-west-2`                           |

Optional Vite build-time vars (only set if/when you re-enable Auth0 + Formspree):

| Variable                  | Value                              |
| ------------------------- | ---------------------------------- |
| `VITE_AUTH0_DOMAIN`       | your Auth0 tenant                  |
| `VITE_AUTH0_CLIENT_ID`    | your Auth0 SPA client ID           |
| `VITE_FORMSPREE_ENDPOINT` | your Formspree form URL            |

### Step 3 — First deploy (3 min)

Push the infra commit, then trigger the workflow:

```bash
git add infra/ .github/ INFRA.md package.json public/CNAME
git rm -r --cached dist || true
git commit -m "Migrate hosting to AWS (S3 + CloudFront + WAF + OIDC)"
git push origin main
```

The push triggers `.github/workflows/deploy.yml` automatically. Or trigger
it manually from the Actions tab.

Watch the run. Steps that matter:
1. `npm ci` + `npm run build` — should finish in ~30s.
2. `Configure AWS credentials via OIDC` — should mint short-lived creds
   without any secret being read. If this fails, the OIDC trust policy is
   misconfigured (usually a typo in `github_repo` in tfvars).
3. `Sync /assets` and `Sync everything else` — uploads `dist/`.
4. `Invalidate CloudFront` — clears the global cache so the new build is
   served immediately.
5. `Smoke test` — `curl https://davidansa.com` and expect 200.

### Step 4 — Verify (2 min)

From your laptop:

```bash
curl -I https://davidansa.com
```

Expected headers (the ones worth checking):

```
HTTP/2 200
strict-transport-security: max-age=31536000; includeSubDomains; preload
content-security-policy: default-src 'self'; ...
x-frame-options: DENY
x-content-type-options: nosniff
referrer-policy: strict-origin-when-cross-origin
permissions-policy: camera=(), microphone=(), geolocation=(), ...
```

Then in a browser:
- `https://davidansa.com` → home page renders, no console errors.
- `https://davidansa.com/clients` → page renders (SPA error rewrite works).
- `https://www.davidansa.com` → home page renders.
- DevTools → Network → confirm `cloudfront` in response headers.
- `https://securityheaders.com/?q=davidansa.com` → should score A or A+.

### Step 5 — Decommission GitHub Pages (1 min)

- [ ] `https://github.com/ansaldn/portfolioWebsite/settings/pages` →
      Build and deployment → Source → **None**.
- [ ] Delete the `gh-pages` branch locally + remote:
      ```bash
      git push origin --delete gh-pages
      git branch -D gh-pages 2>/dev/null || true
      ```
- [ ] Already done in this commit: `gh-pages` npm package removed,
      `deploy` / `predeploy` scripts removed.

## Day-2 operations

### Pushing a code change

Just push to `main`. The Actions workflow handles everything.

### Rolling back

S3 versioning is on. To roll back the bucket to a previous deploy:

```bash
# List versions of index.html
aws s3api list-object-versions --bucket davidansa-com-site --prefix index.html

# Restore a specific version by copying it on top of itself
aws s3api copy-object \
  --bucket davidansa-com-site \
  --copy-source "davidansa-com-site/index.html?versionId=<VERSION_ID>" \
  --key index.html
```

Then invalidate CloudFront:

```bash
aws cloudfront create-invalidation \
  --distribution-id <DIST_ID> --paths "/*"
```

For a more drastic rollback, `git revert` the last commit on `main` and let
Actions redeploy.

### Tightening the CSP

The CSP currently allows `'unsafe-inline'` for `style-src` because Bootstrap
and several React libraries ship inline styles. To tighten:

1. Inventory inline styles in DevTools → Console.
2. Switch to nonce-based CSP — requires the build pipeline to generate a
   per-deploy nonce and inject it into both `index.html` and the
   `style-src` directive. That's a Day-2 follow-up, not a blocker.

### Cost

Expected baseline for low traffic:
- S3: <$0.10/mo (storage + a few thousand requests)
- CloudFront: $0–1/mo (under free tier on first 1 TB)
- Route 53: $0.50/mo (hosted zone fee, already paying)
- ACM: free
- WAFv2: ~$7/mo ($5 web ACL + $1/rule × 4 rules ≈ $9, minus the ~$2 you
  don't pay if you only have 3 managed rules — call it ~$8 actual)

Realistic total: **~$8–10/mo** with WAF on, **~$1–2/mo** with WAF off.

## Rollback plan (if cutover goes wrong)

If `terraform apply` partially succeeds and you want to back out:

```bash
cd infra/
terraform destroy
```

`destroy` is safe to retry. It will fail to delete the site bucket if it
contains objects — empty it first:

```bash
aws s3 rm s3://davidansa-com-site --recursive
```

After destroy completes, restore GitHub Pages by:
1. Repo Settings → Pages → Source → `gh-pages` branch.
2. Re-add `davidansa.com` to the Custom domain field (after re-verifying via
   TXT record at user-account level).
3. Re-add `public/CNAME` if you removed it.

But ideally we never run this — the stack is small enough that any partial
failure can be re-applied forward.
