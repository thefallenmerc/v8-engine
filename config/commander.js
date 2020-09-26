const SampleCommand = require('../commands/sample-command');

const Commander = {
    // register all your command here with their signature
    [SampleCommand.signature]: SampleCommand,
};

module.exports = Commander;