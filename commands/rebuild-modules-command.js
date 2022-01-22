const chalk = require("chalk");
const { promises: fs } = require('fs');
const path = require('path');

const MODULE_FILENAME = 'module.js';

const RebuildModulesCommand = {
    // Command signature
    signature: "modules:rebuild",
    // Command description
    description: "This will rebuild the modules structure.",
    /**
     * Handle function, takes all the args as input
     */
    handle: async (args = [], dirname = __dirname) => {
        console.log(chalk.yellow("Rebuilding modules..."));

        let moduleLoaderContent = `
const loadModules = app => {
\n`;
        const moduleList = [];

        const sourcePath = path.join('modules');
        // scan the modules directory for new modules
        const modulesDir = await fs.readdir(sourcePath);
        // for each module dir, load the MODULE_FILENAME
        for (const module of modulesDir) {
            // for each module read its director
            const modulePath = path.join(sourcePath, module);
            if ((await fs.lstat(modulePath)).isDirectory()) {
                // read the module dir
                const moduleDirContent = await fs.readdir(modulePath);
                if (moduleDirContent.includes(MODULE_FILENAME)) {
                    try {
                        const moduleFilePath = '../' + path.join(modulePath, MODULE_FILENAME);
                        moduleList.push(moduleFilePath);
                        moduleLoaderContent += `\trequire("${moduleFilePath}")(app)\n`;
                        console.log(chalk.green("Module Loaded: ", module));
                    } catch (error) {
                        console.log(chalk.red("Module Failed: ", module, error));
                    }
                } else {
                    console.log(chalk.yellow(`Module '${modulePath}' missing '${MODULE_FILENAME}'!`));
                }
            }
        }

        // add export
        moduleLoaderContent += `
}
module.exports = loadModules;`;

        // write the file
        fs.writeFile(path.join('config', 'module-loader.js'), moduleLoaderContent);
        return 1;
    }
};

module.exports = RebuildModulesCommand;