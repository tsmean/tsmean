#!/usr/bin/env bash

if [ "${TRAVIS_BRANCH}" = "master" ]; then
  npm run deploy:backend -- 220
  ./deployment/deploy-frontend.sh
fi

