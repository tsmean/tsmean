#!/usr/bin/env bash

ls
pwd
cat package.json
echo $NODE_ENV
npm i
npm run deploy:backend -- 220
./deployment/deploy-frontend.sh
