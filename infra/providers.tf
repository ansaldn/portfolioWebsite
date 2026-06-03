terraform {
  required_version = ">= 1.6.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.60"
    }
  }

  # Optional: uncomment after the first apply to move state to S3.
  # The backend bucket has to exist before this block can be used.
  #
  # backend "s3" {
  #   bucket         = "davidansa-com-tfstate"
  #   key            = "portfolio/terraform.tfstate"
  #   region         = "eu-west-2"
  #   encrypt        = true
  #   dynamodb_table = "davidansa-com-tfstate-lock"
  # }
}

# Default provider — site + logs buckets, IAM, OIDC provider all live here.
provider "aws" {
  region = var.aws_region

  default_tags {
    tags = local.common_tags
  }
}

# us-east-1 is mandatory for:
#   - ACM certs used by CloudFront
#   - WAFv2 web ACLs scoped to CLOUDFRONT
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"

  default_tags {
    tags = local.common_tags
  }
}

locals {
  common_tags = {
    Project   = "davidansa-com"
    ManagedBy = "terraform"
    Owner     = "David Ansa"
    Repo      = var.github_repo
  }
}
