import EasyCLI from "./EasyCLI"
import dirConfig from "./dirConfig";

const cli = new EasyCLI();

const args = cli.parseArgs(process.argv);
console.log(`Parsed arguments: cmd = ${args.command}, params = ${args.parameters} `);

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
}


