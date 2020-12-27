const chalk = require("chalk");
const path = require('path');
const { promises: fs } = require('fs');
const replicator = require("./lib/replicator");

const MakeMailCommand = {
    // Command signature
    signature: "make:mail",
    // Command description
    description: "This command created a new mail.",
    /**
     * Handle function, takes all the args as input
     */
    handle: async (args = [], dirname = __dirname) => {
        // check if controller name missing
        if (args.length < 1) {
            console.log(chalk.red("Command name is required!"));
            return 0;
        }
        const [mailName] = args;
        // get controllers dir path
        const mailDir = path.join(dirname, 'mails');
        // generate filename
        const filename = path.join(mailDir, mailName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase() + ".js");
        // get template content
        const templateFile = path.join(__dirname, 'templates', 'mail.jstemplate');

        return await replicator(mailDir, filename, templateFile, "Mail", content => {
            return content.replace(/__MAIL_NAME__/g, mailName);
        });
    }
};

module.exports = MakeMailCommand;