#!/usr/bin/env bash

# install aws
pip install --user awscli
export PATH=$PATH:$HOME/.local/bin
aws configure set default.region eu-central-1

# get credentials
aws s3 cp s3://tsmean-credentials/production."$PROD_CREDENTIALS".properties.json backend/properties/production.properties.json
