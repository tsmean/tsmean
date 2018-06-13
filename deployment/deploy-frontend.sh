#!/usr/bin/env bash
aws configure set preview.cloudfront true
aws s3 cp tmp/dist s3://demo.tsmean.com/ --recursive
aws cloudfront create-invalidation --distribution-id E194UGLQ78RUJV --paths "/*"
