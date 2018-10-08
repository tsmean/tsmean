import * as AWS from 'aws-sdk';
import {CommandId, CommandStatus} from 'aws-sdk/clients/ssm';

AWS.config.update({
  region: 'eu-central-1'
});

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
const TRAVIS_BUILD_NUMBER = args[1];

const ssm = new AWS.SSM();

const checkStatus = (commandId: CommandId) => {
  let iterations = 0;
  const getDetails  = () => {
    console.log('iteration:', iterations);
    ssm.listCommandInvocations({
      CommandId: commandId,
      Details: true
    }).promise().then(resp => {
      const command = resp.CommandInvocations[0];
      const status: CommandStatus = command.Status;
      if (status === 'Pending' || status === 'InProgress') {
        iterations++;
        getDetails();
      } else if (status === "Success") {
        console.log('COMMAND RESULT:');
        console.log(command);
        console.log('Command was successful.')
      } else {
        console.error('COMMAND RESULT:');
        console.error(command);
        console.error(`Result '${status}' was either unhandled or is an error.`);
        process.exit(1);
      }
    }).catch(errorResp => {
      console.error('An error occurrd with the promise to listCommandInvocations.');
      console.error(errorResp);
      process.exit(1);
    });
  };
  getDetails();
};

const deployBackend = () => {

  ssm.sendCommand({
    InstanceIds: [INSTANCE_ID],
    DocumentName: "AWS-RunShellScript",
    Parameters: {
      commands: [`export TRAVIS_BUILD_NUMBER=${TRAVIS_BUILD_NUMBER} && wget --no-cache -O docker-compose.yml https://raw.githubusercontent.com/tsmean/tsmean/"${TRAVIS_BRANCH}"/docker/docker-compose.yml && docker stack deploy --compose-file docker-compose.yml tsmean && rm docker-compose.yml`]
    }
  }).promise().then(resp => {
    const commandId = resp.Command.CommandId;
    checkStatus(commandId);
    console.log('Successfully Deployed Backend')
  }).catch(errorResp => {
    console.error(errorResp);
    console.error('Error in deploying backend');
    process.exit(1);
  });
};
deployBackend();
