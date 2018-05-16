#!/usr/bin/env bash

pip install --user awscli
export PATH=$PATH:$HOME/.local/bin
aws configure set default.region eu-central-1

