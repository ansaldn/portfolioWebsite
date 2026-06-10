###############################################################################
# Route 53 — A + AAAA ALIAS records for both apex and www, pointing at the
# CloudFront distribution. davidansa.com is served entirely from CloudFront.
###############################################################################

locals {
  site_hostnames = [
    var.domain_name,
    "www.${var.domain_name}",
  ]
}

resource "aws_route53_record" "site_a" {
  for_each = toset(local.site_hostnames)

  zone_id         = data.aws_route53_zone.primary.zone_id
  name            = each.value
  type            = "A"
  allow_overwrite = true # alias record for the apex, managed by Terraform

  alias {
    name                   = aws_cloudfront_distribution.site.domain_name
    zone_id                = aws_cloudfront_distribution.site.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "site_aaaa" {
  for_each = toset(local.site_hostnames)

  zone_id         = data.aws_route53_zone.primary.zone_id
  name            = each.value
  type            = "AAAA"
  allow_overwrite = true # cutover: replaces any existing AAAA if present

  alias {
    name                   = aws_cloudfront_distribution.site.domain_name
    zone_id                = aws_cloudfront_distribution.site.hosted_zone_id
    evaluate_target_health = false
  }
}
