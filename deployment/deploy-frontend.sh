#!/usr/bin/env bash

SCRIPT_DIR=$(dirname $0)

aws configure set preview.cloudfront true

aws s3 cp $SCRIPT_DIR/../frontend/dist s3://demo.tsmean.com/ --recursive
aws cloudfront create-invalidation --distribution-id E194UGLQ78RUJV --paths "/*"
