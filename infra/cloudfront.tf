###############################################################################
# Origin Access Control — modern replacement for OAI. Lets CloudFront sign
# requests to S3 with SigV4 so the bucket can stay fully private.
###############################################################################

resource "aws_cloudfront_origin_access_control" "site" {
  name                              = "${replace(var.domain_name, ".", "-")}-oac"
  description                       = "OAC for ${var.domain_name} site bucket"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

###############################################################################
# Response Headers Policy — the security headers contract.
# CSP, HSTS, frame-ancestors, etc. served as real HTTP headers, not <meta>.
###############################################################################

resource "aws_cloudfront_response_headers_policy" "security" {
  name    = "${replace(var.domain_name, ".", "-")}-security-headers"
  comment = "Security headers for ${var.domain_name}"

  security_headers_config {
    strict_transport_security {
      access_control_max_age_sec = 31536000
      include_subdomains         = true
      preload                    = true
      override                   = true
    }
    content_type_options {
      override = true
    }
    frame_options {
      frame_option = "DENY"
      override     = true
    }
    referrer_policy {
      referrer_policy = "strict-origin-when-cross-origin"
      override        = true
    }
    xss_protection {
      mode_block = true
      protection = true
      override   = true
    }
    content_security_policy {
      content_security_policy = join(" ", [
        "default-src 'self';",
        "script-src 'self';",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;",
        "font-src 'self' https://fonts.gstatic.com;",
        "img-src 'self' data: https:;",
        "connect-src 'self' https://formspree.io;",
        "form-action 'self' https://formspree.io;",
        "frame-ancestors 'none';",
        "base-uri 'self';",
        "object-src 'none';",
        "upgrade-insecure-requests;",
      ])
      override = true
    }
  }

  custom_headers_config {
    items {
      header   = "Permissions-Policy"
      value    = "camera=(), microphone=(), geolocation=(), payment=(), usb=()"
      override = true
    }
    items {
      header   = "Cross-Origin-Opener-Policy"
      value    = "same-origin"
      override = true
    }
    items {
      header   = "Cross-Origin-Resource-Policy"
      value    = "same-origin"
      override = true
    }
  }
}

###############################################################################
# Cache policies — two flavours:
#   - long_cache:  /assets/* (immutable, hashed filenames)
#   - no_cache:    index.html (always fresh entry point)
###############################################################################

data "aws_cloudfront_cache_policy" "caching_optimized" {
  name = "Managed-CachingOptimized"
}

data "aws_cloudfront_cache_policy" "caching_disabled" {
  name = "Managed-CachingDisabled"
}

data "aws_cloudfront_origin_request_policy" "cors_s3" {
  name = "Managed-CORS-S3Origin"
}

###############################################################################
# Distribution
###############################################################################

resource "aws_cloudfront_distribution" "site" {
  enabled             = true
  is_ipv6_enabled     = true
  comment             = "${var.domain_name} portfolio site"
  default_root_object = "index.html"
  http_version        = "http2and3"
  price_class         = "PriceClass_100" # US, Canada, Europe — cheapest tier that covers commercial / gov targets
  web_acl_id          = aws_wafv2_web_acl.site.arn

  aliases = [var.domain_name, "www.${var.domain_name}"]

  origin {
    domain_name              = aws_s3_bucket.site.bucket_regional_domain_name
    origin_id                = "s3-site-origin"
    origin_access_control_id = aws_cloudfront_origin_access_control.site.id
  }

  default_cache_behavior {
    target_origin_id           = "s3-site-origin"
    viewer_protocol_policy     = "redirect-to-https"
    allowed_methods            = ["GET", "HEAD"]
    cached_methods             = ["GET", "HEAD"]
    compress                   = true
    cache_policy_id            = data.aws_cloudfront_cache_policy.caching_optimized.id
    origin_request_policy_id   = data.aws_cloudfront_origin_request_policy.cors_s3.id
    response_headers_policy_id = aws_cloudfront_response_headers_policy.security.id
  }

  # index.html — never cache at the edge for long; we want React Router to
  # always boot from the freshest entry point.
  ordered_cache_behavior {
    path_pattern               = "/index.html"
    target_origin_id           = "s3-site-origin"
    viewer_protocol_policy     = "redirect-to-https"
    allowed_methods            = ["GET", "HEAD"]
    cached_methods             = ["GET", "HEAD"]
    compress                   = true
    cache_policy_id            = data.aws_cloudfront_cache_policy.caching_disabled.id
    response_headers_policy_id = aws_cloudfront_response_headers_policy.security.id
  }

  # SPA support: client-side routes (e.g. /clients, /services/iam) aren't real
  # objects in S3, so the bucket returns 403/404. Rewrite both to /index.html
  # with a 200 so React Router can take over.
  custom_error_response {
    error_code            = 403
    response_code         = 200
    response_page_path    = "/index.html"
    error_caching_min_ttl = 10
  }
  custom_error_response {
    error_code            = 404
    response_code         = 200
    response_page_path    = "/index.html"
    error_caching_min_ttl = 10
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate_validation.site.certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  logging_config {
    bucket          = aws_s3_bucket.logs.bucket_domain_name
    include_cookies = false
    prefix          = "cloudfront/"
  }
}
