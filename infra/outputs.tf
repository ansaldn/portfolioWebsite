output "site_bucket_name" {
  description = "Name of the S3 bucket holding dist/. Paste into the GitHub repo as an Actions variable AWS_SITE_BUCKET."
  value       = aws_s3_bucket.site.bucket
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID. Paste into the GitHub repo as an Actions variable AWS_CLOUDFRONT_DISTRIBUTION_ID."
  value       = aws_cloudfront_distribution.site.id
}

output "cloudfront_distribution_domain_name" {
  description = "CloudFront default domain (xxxx.cloudfront.net). Useful for smoke tests before DNS is fully cut over."
  value       = aws_cloudfront_distribution.site.domain_name
}

output "github_deploy_role_arn" {
  description = "IAM role the GitHub Actions workflow assumes via OIDC. Paste into the GitHub repo as an Actions variable AWS_DEPLOY_ROLE_ARN."
  value       = aws_iam_role.github_deploy.arn
}

output "logs_bucket_name" {
  description = "Name of the CloudFront access-logs bucket."
  value       = aws_s3_bucket.logs.bucket
}

output "waf_web_acl_arn" {
  description = "WAFv2 web ACL ARN attached to the distribution."
  value       = aws_wafv2_web_acl.site.arn
}

output "acm_certificate_arn" {
  description = "ACM certificate ARN (us-east-1)."
  value       = aws_acm_certificate.site.arn
}

output "route53_zone_name_servers" {
  description = "Authoritative name servers for the hosted zone. Make sure the registrar (AWS, GoDaddy, wherever) still points to these."
  value       = data.aws_route53_zone.primary.name_servers
}
