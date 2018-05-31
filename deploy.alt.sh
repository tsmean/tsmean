#!/usr/bin/env bash
# backend
aws ssm send-command --instance-ids "i-0ed7d2d2191c0c2d5" --document-name "AWS-RunShellScript" --parameters commands=["export TRAVIS_BUILD_NUMBER=$TRAVIS_BUILD_NUMBER && wget --no-cache -O docker-compose.yml https://raw.githubusercontent.com/tsmean/tsmean/"$TRAVIS_BRANCH"/docker/docker-compose.yml && docker stack deploy --compose-file docker-compose.yml tsmean && rm docker-compose.yml"] > docker/last-command.json
node docker/wait-for-aws-ssm.js
# frontend
aws configure set preview.cloudfront true
aws s3 cp tmp/dist s3://demo.tsmean.com/ --recursive
aws cloudfront create-invalidation --distribution-id E194UGLQ78RUJV --paths "/*"
