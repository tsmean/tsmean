#!/usr/bin/env bash

if [ "${TRAVIS_BRANCH}" = "fix/faster-build" ]; then
  npm run deploy:backend -- $TRAVIS_BRANCH
  ./deployment/deploy-frontend.sh
fi

echo "DONE DEPLOYING"
