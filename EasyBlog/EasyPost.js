"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dirConfig_1 = __importDefault(require("./dirConfig"));
const showdown_1 = __importDefault(require("showdown"));
class EasyPost {
    constructor() {
        // Returns TRUE if file IS found in config.postsDir
        this.checkForMarkdown = (fileName) => {
            const files = fs_1.default.readdirSync(dirConfig_1.default.postsDir);
            if (files.includes(fileName)) {
                console.log(`✅ Found Markdown file: ${fileName}`);
                return true;
            }
            else {
                console.log(`❌ Could not find Markdown file: ${fileName}`);
                return false;
            }
        };
        // Returns TRUE if file IS NOT found in config.viewsDir
        this.checkExistingViews = (fileName) => {
            fileName = (fileName.split('.')[0]) + '.hbs';
            const files = fs_1.default.readdirSync(dirConfig_1.default.viewsDir);
            return files.includes(fileName);
        };
        this.markdownToHTML = (newFileName, filePath) => {
            // Read the markdown file
            const mdContent = fs_1.default.readFileSync(filePath).toString();
            console.log(`🤔 Processing raw Markdown:\n ${mdContent}`);
            // Convert the markdown to HTML
            const sd = new showdown_1.default.Converter();
            const generatedHTML = sd.makeHtml(mdContent);
            // Generate the HTML to add to the view.
            const postHTML = this.generateHTMLContent(generatedHTML);
            console.log(`✅ Generated post HTML: ${postHTML}`);
            // Get the path to write the new HTML file to, and write to it.
            // If the file exists after writing, return true. Otherwise return false.
            const newFilePath = path_1.default.join(dirConfig_1.default.viewsDir, newFileName);
            fs_1.default.writeFile(newFilePath, postHTML, () => {
                console.log(`❓ Attempting to write new file: ${newFilePath}`);
                if (fs_1.default.existsSync(path_1.default.join(dirConfig_1.default.viewsDir, newFileName))) {
                    return true;
                }
                else {
                    return false;
                }
            });
            return false;
        };
        this.generateHTMLContent = (postHTML) => {
            return `
        <div class="post-title">
            <h2>{{ meta.title }}</h2>
        </div>
        <div class="post-body">
            ${postHTML}
        </div>
        `;
        };
        this.createNewPostFiles = (fileName) => {
            console.log(`🙂 Attempting to create files: posts/${fileName}.md, meta/${fileName}.json.`);
            // Create the new markdown file
            const mdFilePath = path_1.default.join(dirConfig_1.default.postsDir, `${fileName}.md`);
            fs_1.default.writeFileSync(mdFilePath, `## ${fileName}.md`);
            // Create the corresponding meta json file
            const jsonFilePath = path_1.default.join(dirConfig_1.default.metaDir, `${fileName}.json`);
            const defaultMeta = {
                title: `${fileName}`,
                createdAt: Date.now()
            };
            fs_1.default.writeFileSync(jsonFilePath, JSON.stringify(defaultMeta, undefined, 4));
            const mdFileExists = fs_1.default.existsSync(mdFilePath);
            const metaFileExists = fs_1.default.existsSync(jsonFilePath);
            if (mdFileExists && metaFileExists) {
                console.log(`✅ Successfully created markdown file: ${fileName}.md`);
                console.log(`✅ Successfully created meta file: ${fileName}.json`);
                return true;
            }
            else {
                return false;
            }
        };
    }
}
exports.default = EasyPost;
