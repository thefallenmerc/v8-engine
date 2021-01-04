const chalk = require("chalk");
const path = require('path');
const { promises: fs } = require('fs');
const replicator = require("./lib/replicator");

const MakeMailCommand = {
    // Command signature
    signature: "make:service",
    // Command description
    description: "This command created a new service.",
    /**
     * Handle function, takes all the args as input
     */
    handle: async (args = [], dirname = __dirname) => {
        // check if controller name missing
        if (args.length < 1) {
            console.log(chalk.red("Command name is required!"));
            return 0;
        }
        const [serviceName] = args;
        // get controllers dir path
        const serviceDir = path.join(dirname, 'services');
        // generate filename
        const filename = path.join(serviceDir, serviceName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase() + ".js");
        // get template content
        const templateFile = path.join(__dirname, 'templates', 'service.jstemplate');

        return await replicator(serviceDir, filename, templateFile, "Service", content => {
            return content.replace(/__SERVICE_NAME__/g, serviceName);
        });
    }
};

module.exports = MakeMailCommand;