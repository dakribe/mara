terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.26.0"
    }
  }
}

provider "aws" {
  profile = "system-admin"
  region  = "us-east-1"
}

resource "aws_s3_bucket" "mara_client" {
  bucket = "vite_build"
}

resource "aws_s3_object" "bootstrap_build" {
  bucket   = aws_s3_bucket.mara_client.bucket
  key      = each.key
  for_each = fileset("./dist", "**")
}

