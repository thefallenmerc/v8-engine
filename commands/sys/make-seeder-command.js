const chalk = require("chalk");
const path = require('path');
const { promises: fs } = require('fs');
const replicator = require("./lib/replicator");

const MakeSeeder = {
    // Command signature
    signature: "make:seeder",
    // Command description
    description: "This command creates a new seeder.",
    /**
     * Handle function, takes all the args as input
     */
    handle: async (args = [], dirname = __dirname) => {
        // check if controller name missing
        if (args.length < 1) {
            console.log(chalk.red("Command name is required!"));
            return 0;
        }
        const [seederName] = args;
        // get controllers dir path
        const seederDir = path.join(dirname, 'seeders');
        // generate filename
        const filename = path.join(seederDir, seederName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase() + ".js");
        // get template content
        const templateFile = path.join(__dirname, 'templates', 'seeder.jstemplate');

        return await replicator(seederDir, filename, templateFile, "Seeder", content => {
            return content.replace(/__SEEDER_NAME__/g, seederName);
        });
    }
};

module.exports = MakeSeeder;