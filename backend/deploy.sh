#!/usr/bin/env bash
server="ubuntu@35.158.213.131"

if [ "${1}" == "test" ]; then
  rootdir="tsmeandemo/testbe"
elif [ "${1}" == "prod" ]; then
  rootdir="tsmeandemo/be"
else
  echo "Provide argument test or prod"
  exit 0;
fi

# Setup server (Debian / Ubuntu assumed)
# ssh ${server} sudo apt-get install git
# ssh ${server} curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
# ssh ${server} sudo apt-get install -y nodejs
# ssh ${server} sudo npm install -g typescript
# ssh ${server} sudo npm install -g forever
# ssh ${server} sudo npm install -g yarn

# Those are the same steps for production & test setup
echo "Remove old test directory"
ssh ${server} "rm -rf ${rootdir}"

echo "Pull from github"
ssh ${server} "git clone https://github.com/tsmean/backend ${rootdir}"

echo "Install"
ssh ${server} "cd ${rootdir} && npm run install"

# Special logic for test setup
if [ "${1}" == "test" ]; then
  echo "Run tests"
  ssh ${server} "cd ${rootdir} && npm test"
else
  echo "(Re-)Start server"
  ssh ${server} "forever stop ${rootdir}/main-module/dist/index.js"
  ssh ${server} "forever start ${rootdir}/main-module/dist/index.js"
fi

echo "Done!!!"
