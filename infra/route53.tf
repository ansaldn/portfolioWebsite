###############################################################################
# Route 53 — A + AAAA ALIAS records for both apex and www, pointing at the
# CloudFront distribution.
#
# This is the cutover. The moment terraform apply finishes these records,
# davidansa.com stops going to GitHub Pages and starts going to CloudFront.
###############################################################################

locals {
  site_hostnames = [
    var.domain_name,
    "www.${var.domain_name}",
  ]
}

resource "aws_route53_record" "site_a" {
  for_each = toset(local.site_hostnames)

  zone_id = data.aws_route53_zone.primary.zone_id
  name    = each.value
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.site.domain_name
    zone_id                = aws_cloudfront_distribution.site.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "site_aaaa" {
  for_each = toset(local.site_hostnames)

  zone_id = data.aws_route53_zone.primary.zone_id
  name    = each.value
  type    = "AAAA"

  alias {
    name                   = aws_cloudfront_distribution.site.domain_name
    zone_id                = aws_cloudfront_distribution.site.hosted_zone_id
    evaluate_target_health = false
  }
}
