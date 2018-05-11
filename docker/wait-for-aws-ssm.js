const {execSync} = require('child_process');
const commandOutput = require('./last-command.json');

const getStatus = (commandId) => {
    return new Promise((resolve, reject) => {
        let iterations = 0;
        const getDetails  = () => {
            console.log('iteration:', iterations);
            const detailsBuffer = execSync(`aws ssm list-command-invocations --command-id ${commandId} --details`);
            const detailsStr = detailsBuffer.toString();
            // This will have a format like { CommandInvokations: [{Status: 'Failed' | 'Pending' | 'Success', CommandPlugins: [{Output: ...}]},...]}
            const details = JSON.parse(detailsStr);
            const status = details.CommandInvocations[0].Status;
            if (status === 'Pending' || status === 'InProgress') {
                setTimeout(getDetails, 100)
                iterations++;
            } else {
                console.log('===========')
                console.log('details')
                console.log(details)
                console.log('=============')
                resolve({
                    status: status,
                    output: details.CommandInvocations[0].CommandPlugins[0].Output
                });
            }
        };
        getDetails();
    });
};

if (commandOutput != null) {
    const commandId = commandOutput.Command.CommandId;
    getStatus(commandId).then(resp => {
        if (resp.status === 'Success') {
            console.log('success');
        } else if (resp.status === 'Failed') {
            console.error(resp.output);
            process.exit(1);
        } else {
            console.error('state not handled');
            console.error(resp.status);
            console.error(resp.output);
            process.exit(1);
        }
    });
} else {
    console.error("needs command output");
    process.exit(1);
}

