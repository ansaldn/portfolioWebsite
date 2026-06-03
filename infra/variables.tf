variable "domain_name" {
  description = "Apex domain name (e.g. davidansa.com). Used for ACM cert, R53 records, CloudFront aliases."
  type        = string
  default     = "davidansa.com"
}

variable "aws_region" {
  description = "AWS region for the site + logs S3 buckets and IAM resources. CloudFront/ACM/WAF are pinned to us-east-1 regardless."
  type        = string
  default     = "eu-west-2"
}

variable "github_repo" {
  description = "GitHub repo (owner/name) allowed to assume the deploy role via OIDC."
  type        = string
  default     = "ansaldn/portfolioWebsite"
}

variable "github_branch" {
  description = "Branch on the repo that is allowed to deploy."
  type        = string
  default     = "main"
}

variable "rate_limit_per_5min" {
  description = "WAF rate-based rule threshold per IP per 5 minutes."
  type        = number
  default     = 2000
}
