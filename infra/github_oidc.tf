###############################################################################
# GitHub OIDC trust + deploy role.
#
# The workflow exchanges its short-lived GitHub-issued OIDC token for AWS
# credentials by assuming this role. No long-lived AWS access keys ever leave
# AWS or get stored as GitHub Secrets.
#
# Trust is scoped narrowly to:
#   - this repo
#   - the main branch (workflow_dispatch from main also works; PRs do not)
#   - the standard sts.amazonaws.com audience
###############################################################################

# GitHub's well-known OIDC thumbprints. AWS no longer validates these against
# the cert chain (since 2023) but the field is still required.
resource "aws_iam_openid_connect_provider" "github" {
  url = "https://token.actions.githubusercontent.com"

  client_id_list = [
    "sts.amazonaws.com",
  ]

  thumbprint_list = [
    "6938fd4d98bab03faadb97b34396831e3780aea1",
    "1c58a3a8518e8759bf075b76b750d4f2df264fcd",
  ]
}

data "aws_iam_policy_document" "github_oidc_trust" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRoleWithWebIdentity"]

    principals {
      type        = "Federated"
      identifiers = [aws_iam_openid_connect_provider.github.arn]
    }

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"
      values   = ["sts.amazonaws.com"]
    }

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:sub"
      values = [
        "repo:${var.github_repo}:ref:refs/heads/${var.github_branch}",
      ]
    }
  }
}

resource "aws_iam_role" "github_deploy" {
  name               = "${replace(var.domain_name, ".", "-")}-github-deploy"
  description        = "Assumed by GitHub Actions in ${var.github_repo}@${var.github_branch} to deploy the site."
  assume_role_policy = data.aws_iam_policy_document.github_oidc_trust.json
  max_session_duration = 3600
}

# Permission boundary: the workflow can sync to the site bucket, list it, and
# invalidate the distribution. That's the whole set.
data "aws_iam_policy_document" "github_deploy" {
  statement {
    sid    = "SyncSiteBucket"
    effect = "Allow"
    actions = [
      "s3:PutObject",
      "s3:DeleteObject",
      "s3:GetObject",
      "s3:GetObjectVersion",
      "s3:GetObjectTagging",
      "s3:PutObjectTagging",
    ]
    resources = ["${aws_s3_bucket.site.arn}/*"]
  }

  statement {
    sid    = "ListSiteBucket"
    effect = "Allow"
    actions = [
      "s3:ListBucket",
      "s3:GetBucketLocation",
    ]
    resources = [aws_s3_bucket.site.arn]
  }

  statement {
    sid    = "InvalidateThisDistributionOnly"
    effect = "Allow"
    actions = [
      "cloudfront:CreateInvalidation",
      "cloudfront:GetInvalidation",
      "cloudfront:ListInvalidations",
    ]
    resources = [aws_cloudfront_distribution.site.arn]
  }
}

resource "aws_iam_role_policy" "github_deploy" {
  name   = "deploy"
  role   = aws_iam_role.github_deploy.id
  policy = data.aws_iam_policy_document.github_deploy.json
}
