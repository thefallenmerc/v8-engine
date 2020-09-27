const chalk = require("chalk")
const path = require('path')
const { promises: fs } = require('fs')

const MakeCommandCommand = {
    // Command signature
    signature: "make:command",
    // Command description
    description: "This command creates commands. LOL.",
    /**
     * Handle function, takes all the args as input
     */
    handle: async (args = [], dirname = __dirname) => {
        // check if command name missing
        if (args.length < 1) {
            console.log(chalk.red("Command name is required!"));
            return 0;
        }
        const [commandName] = args;
        // get command dir path
        const commandDir = path.join(dirname, 'commands');
        // generate filename
        const filename = path.join(commandDir, commandName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase() + ".js");
        // check if file exists
        try {
            const stats = await fs.stat(filename);
            console.log(chalk.red("Command with similiar name exists"));
            return 0
        } catch (error) {
            // get template content
            const templateFile = path.join(__dirname, 'templates', 'command.jstemplate');
            const templateContent = (await fs.readFile(templateFile, { encoding: "utf-8" })).replace(/__COMMAND_NAME__/g, commandName);
            // make changes
            await fs.writeFile(filename, templateContent);
            console.log(chalk.green("Command created successfully, register this into config/commander to start using it."));
            return 1;
        }
    }
};

module.exports = MakeCommandCommand;