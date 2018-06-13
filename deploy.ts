import * as AWS from 'aws-sdk';

const args = process.argv.slice(2);
if (args.length < 1) {
  process.exit(1);
}

const INSTANCE_ID = "i-0ed7d2d2191c0c2d5";
const TRAVIS_BRANCH = args[0];

const deployBackend = () => {
  const ssm = new AWS.SSM();
  ssm.sendCommand({
    InstanceIds: [INSTANCE_ID],
    DocumentName: "AWS-RunShellScript",
    Parameters: {
      commands: [`export TRAVIS_BUILD_NUMBER=$TRAVIS_BUILD_NUMBER && wget --no-cache -O docker-compose.yml https://raw.githubusercontent.com/tsmean/tsmean/"${TRAVIS_BRANCH}"/docker/docker-compose.yml && docker stack deploy --compose-file docker-compose.yml tsmean && rm docker-compose.yml`]
    }
  });
};
deployBackend();

const deployFrontend = () => {

};
deployFrontend();
