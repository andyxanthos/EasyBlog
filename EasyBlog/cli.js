"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EasyCLI_1 = __importDefault(require("./EasyCLI"));
const cli = new EasyCLI_1.default();
const args = cli.parseArgs(process.argv);
switch (args.command) {
    case null || 'help':
        cli.showHelp();
        break;
    ///////////////
    case 'convert':
        if (args.parameters.length > 0) {
            // The filename should be the first (and only) parameter.
            cli.handleConvert(args.parameters[0]);
            break;
        }
        else {
            console.log('❌ ERROR: You must supply a filename to convert.');
            break;
        }
    ///////////////
    case 'newPost':
        if (args.parameters.length > 0) {
            cli.newPost(args.parameters[0]);
            break;
        }
        else {
            console.log('❌ ERROR: You must provide a filename for the new post.');
            break;
        }
    ///////////////
    default:
        console.log(`Command ${args.command} not recognized.`);
        cli.showHelp();
        break;
}
