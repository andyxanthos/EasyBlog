import EasyCLI from "./EasyCLI"
import dirConfig from "./dirConfig";
import { fstat } from "fs";
import path from "path";

const cli = new EasyCLI();

const args = cli.parseArgs(process.argv);

switch(args.command) {
    case null || 'help':
        cli.showHelp();
        break;
    ///////////////
    case 'convert':
        if (args.parameters.length > 0) {
            // The filename should be the first (and only) parameter.
            cli.handleConvert(args.parameters[0]);
            break;
        } else {
            console.log('❌ ERROR: You must supply a filename to convert.');
            break;
        }
    ///////////////
    case 'newPost':
        if (args.parameters.length > 0) {
            cli.newPost(args.parameters[0]);
            break;
        } else {
            console.log('❌ ERROR: You must provide a filename for the new post.');
            break;
        }
    ///////////////
    case 'updatePost':
        cli.updatePost(args.parameters[0]);
        break;    
    ///////////////
    case 'metrics':
        const logPath = path.join(dirConfig.logDir, '/server.log');
        cli.metrics(logPath);
        break;
    ///////////////
    default:
        console.log(`Command ${args.command} not recognized.`);
        cli.showHelp();
        break;
}


