"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dirConfig_1 = __importDefault(require("./dirConfig"));
const EasyPost_1 = __importDefault(require("./EasyPost"));
class EasyCLI {
    constructor() {
        this.parseArgs = (argv) => {
            if (argv.length == 3) {
                return {
                    command: argv[2],
                    parameters: []
                };
            }
            const args = argv.slice(2);
            const [command, ...parameters] = args;
            return { command, parameters };
        };
        this.showHelp = () => {
            console.log('🙂 EasyBlog Help!');
        };
        this.handleConvert = (fileName) => {
            // Check for file in config.postsDir
            // Check to see if it already exists in config.viewsDir
            // If both false, create a new file
            // 1. convert MD to HTML
            // 2. fs.writeFile() -- filename is same as MD file
            const post = new EasyPost_1.default();
            if (!fileName.split('').includes('.')) {
                fileName = `${fileName}.md`;
            }
            if (!post.checkForMarkdown(fileName)) {
                return console.log(`❌ ERROR: Could not find ${fileName} in config.postsDir.`);
            }
            // Past this point, we know we that the file exists.
            if (post.checkExistingViews(fileName)) {
                return console.log(`❌ ERROR: View ${fileName.split('.')[0]}.hbs already exists in config.viewsDir.`);
            }
            // Past this point, we know that there isn't an existing view with the same name.
            const newFileName = fileName.split('.')[0] + '.hbs';
            const result = post.markdownToHTML(newFileName, path_1.default.join(dirConfig_1.default.postsDir, fileName));
            if (result)
                return console.log(`✅ Succesfully created a view for: ${fileName}`);
        };
        this.newPost = (fileName) => {
            const post = new EasyPost_1.default();
            if (post.checkForMarkdown(`${fileName}.md`)) {
                return console.log(`❌ ERROR: ${fileName} already exists.`);
            }
            else {
                return post.createNewPostFiles(fileName);
            }
        };
    }
}
exports.default = EasyCLI;
