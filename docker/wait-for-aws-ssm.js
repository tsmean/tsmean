const {execSync} = require('child_process');
const commandOutput = require('./last-command.json');

const getStatus = (commandId) => {
    const getDetails  = () => {
        const detailsBuffer = execSync(`aws ssm list-command-invocations --command-id ${commandId} --details`);
        const detailsStr = detailsBuffer.toString();
        // This will have a format like { CommandInvokations: [{Status: 'Failed' | 'Pending' | 'Success', CommandPlugins: [{Output: ...}]},...]}
        const details = JSON.parse(detailsStr);
        return details;
    };
    return new Promise((resolve, reject) => {
        const details = getDetails();
        if (details.Status === 'Pending') {
            setTimeout(getDetails(), 100)
        } else {
            resolve({
                status: details.CommandInvocations[0].CommandPlugins[0].Status,
                output: details.CommandInvocations[0].CommandPlugins[0].Output
            });
        }
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
            console.log('state not handled');
            process.exit(1);
        }
    });
} else {
    console.error("needs command output");
    process.exit(1);
}
