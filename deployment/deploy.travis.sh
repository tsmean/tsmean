#!/usr/bin/env bash

if [ "${TRAVIS_BRANCH}" = "fix/faster-build" ]; then
  npm run deploy:backend -- 220
  ./deployment/deploy-frontend.sh
fi

echo "DONE DEPLOYING"
