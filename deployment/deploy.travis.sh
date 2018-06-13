#!/usr/bin/env bash

if [ "${TRAVIS_BRANCH}" = "fix/faster-buid" ]; then
  npm run deploy:backend -- 220
  ./deployment/deploy-frontend.sh
fi

echo "DONE DEPLOYING"
