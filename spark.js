const chalk = require('chalk');
const { signature } = require('./commands/test-command');
const app = require('./config/app');
const commander = require('./config/commander');

init();

function init() {

    const [executor, currentFile, command, ...args] = process.argv;

    // check if command undefined
    if (command === undefined) {
        console.log(chalk.red('Provide a command!'));
        return 1;
    }

    // Handle system Commands
    if (handleSystemCommands(command, args, commander)) {
        // If the command should be handled by system do it, and return
        return 0;
    }

    // check if command has the command registered
    if (!commander.hasOwnProperty(command)) {
        console.log(chalk.red('Command ' + command + ' not found!'));
        return 1;
    }

    // handle the command
    commander[command].handle(args); // should return 0 for failure 1 for success

    return 0;
}

function handleSystemCommands(command, args) {
    switch(command) {
        case "version":
            console.log(chalk.green(app.version.toFixed(1)));
            break;
        case "help":
            console.log(chalk.white("This utility will provide you with a variety of commandline tools to make your work easy."));
            console.log(chalk.white("Try ") + chalk.green("node spark list") + chalk.white(" to get all available commands."));
            console.log(chalk.white("Try ") + chalk.green("node spark version") + chalk.white(" to know which version of spark are you using."));
            break;
        case "list":
            console.log(chalk.white("--------------------------------"));
            for(const signature in commander) {
                console.log(chalk.green(signature) + chalk.white(": \t\t\t " + commander[signature].description));
            }
            break;
        default:
            return false;
    }
    return true;
}
