const chalk = require("chalk");
const path = require('path');
const { promises: fs } = require('fs');

async function replicator(destinationpath, filepath, templatepath, entity, contentModifier) {
    try {
        const stats = await fs.stat(filepath);
        console.log(chalk.red(entity + " with similiar name exists"));
        return 0
    } catch (error) {
        // get template content
        const templateContent = contentModifier(await fs.readFile(templatepath, { encoding: "utf-8" }));
        // ensure director exists
        await ensureDirectoryExists(filepath);
        // make changes
        await fs.writeFile(filepath, templateContent);
        console.log(chalk.green(entity + " created successfully."));
        return 1;
    }
}

async function ensureDirectoryExists(filename = "") {
    const dirname = path.dirname(filename);

    // check if directory exists
    try {
        const lstat = await fs.lstat(dirname);
        return true;
    } catch (error) {
        await ensureDirectoryExists(dirname);
        await fs.mkdir(dirname);
    }

}

module.exports = replicator;