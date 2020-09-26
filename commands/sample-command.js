const chalk = require("chalk")

const SampleCommand = {
    // Command signature
    signature: "sample:command",
    // Command description
    description: "This is a sample command",
    /**
     * Handle function, takes all the args as input
     */
    handle: (args) => {
        console.log(chalk.yellow("Hi, this is a sample command!"));
        return 1;
    }
};

module.exports = SampleCommand;