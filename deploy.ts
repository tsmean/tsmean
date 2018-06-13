import * as AWS from 'aws-sdk';

AWS.config.update({region: 'eu-central-1'});

const args = process.argv.slice(2);
if (args.length < 1) {
  console.error(`
=============================
Please Provide a Build Number
=============================`);
  process.exit(1);
}
console.log('Deployment Started');

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
  }).promise().then(resp => {
    console.log(resp);
    console.log('Successfully Deployed Backend')
  }).catch(errorResp => {
    console.error(errorResp);
    console.error('Error in deploying backend')
  });
};
deployBackend();

const deployFrontend = () => {

};
deployFrontend();
