#!/usr/bin/env bash

if [ "${TRAVIS_BRANCH}" = "fix/faster-build" ]; then
  npm run deploy:backend -- $TRAVIS_BUILD_NUMBER
  ./deployment/deploy-frontend.sh
fi

echo "DONE DEPLOYING"
