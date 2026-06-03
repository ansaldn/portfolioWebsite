# infra/ — Terraform for davidansa.com

Production hosting for the portfolio: S3 (private) → CloudFront (TLS, security
headers, SPA routing) → Route 53 (apex + www), with WAFv2 in front and a
GitHub Actions deploy role wired to AWS via OIDC.

## What this stack creates

| Resource                       | Region     | Notes                                      |
| ------------------------------ | ---------- | ------------------------------------------ |
| Site S3 bucket                 | eu-west-2  | Private, OAC-only, SSE-S3, versioned       |
| Logs S3 bucket                 | eu-west-2  | CloudFront access logs, 30-day expiry      |
| ACM certificate                | us-east-1  | Apex + www, DNS-validated via R53          |
| CloudFront distribution        | global     | HTTP/3, OAC origin, SPA error rewrites     |
| Response Headers Policy        | global     | HSTS, CSP, frame-ancestors, COOP/CORP      |
| WAFv2 web ACL                  | us-east-1  | Managed Core + Bad Inputs + IP rep + rate  |
| Route 53 A + AAAA aliases      | global     | Apex + www → CloudFront                    |
| GitHub OIDC provider + role    | global     | Trust scoped to ansaldn/portfolioWebsite@main |

No long-lived AWS keys are created or required.

## Prerequisites

1. AWS CLI v2 authenticated with an account that owns the `davidansa.com`
   Route 53 hosted zone. Easiest: `aws configure sso` or `aws configure`.
2. Terraform >= 1.6 installed locally (`brew install terraform`).
3. The `davidansa.com` hosted zone already exists in Route 53 — Terraform
   reads it via data source, does not create it.

## First apply

```bash
cd infra/
terraform init
terraform plan -out=plan.tfplan
terraform apply plan.tfplan
```

Apply takes ~15–25 minutes — most of it is CloudFront propagating globally.
ACM cert validation kicks in within seconds because R53 is in the same account.

## Post-apply

After apply finishes, capture the outputs:

```bash
terraform output
```

In the GitHub repo (`https://github.com/ansaldn/portfolioWebsite/settings/variables/actions`),
set the following **Repository variables** (not secrets — these aren't secret,
they're identifiers):

| Variable                          | Source                                |
| --------------------------------- | ------------------------------------- |
| `AWS_DEPLOY_ROLE_ARN`             | `terraform output -raw github_deploy_role_arn` |
| `AWS_SITE_BUCKET`                 | `terraform output -raw site_bucket_name` |
| `AWS_CLOUDFRONT_DISTRIBUTION_ID`  | `terraform output -raw cloudfront_distribution_id` |
| `AWS_REGION`                      | `eu-west-2` (or whatever you set)     |

Then trigger the deploy workflow (Actions tab → "Deploy to AWS" → Run workflow
on `main`). First run populates the bucket and warms CloudFront.

## What happens to davidansa.com

Terraform replaces the existing GitHub Pages A records on apex + www with
ALIAS records pointing at CloudFront. DNS propagation is usually under 60
seconds because R53's authoritative NS responds immediately and TTL is short.

## Drift / re-apply

Safe to re-run `terraform apply` any time — it's idempotent. Future changes
to e.g. security headers can be made in `cloudfront.tf` and applied in a few
minutes.

## Tearing down (don't, but if you must)

```bash
terraform destroy
```

`destroy` will remove the bucket only if empty — empty it first with
`aws s3 rm s3://davidansa-com-site --recursive`.
