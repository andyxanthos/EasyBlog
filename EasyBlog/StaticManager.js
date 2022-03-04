"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sass_1 = __importDefault(require("sass"));
class StaticManager {
    constructor(cssDir, sassDir) {
        this.SCSStoCSS = () => {
            const sassFilenames = fs_1.default.readdirSync(this.sassDir);
            sassFilenames.forEach(filename => {
                fs_1.default.watchFile(path_1.default.join(this.sassDir, filename), (_, __) => {
                    console.log(`Recompiling ${filename} to CSS.`);
                    const fPath = path_1.default.join(__dirname, `../static/scss/${filename}`);
                    const compiledCSS = sass_1.default.compile(fPath);
                    const cssFileName = filename.split('.')[0];
                    const cssFilePath = path_1.default.join(this.cssDir, `${cssFileName}.css`);
                    fs_1.default.writeFileSync(cssFilePath, compiledCSS.css);
                    this.updateLayoutFile(false, cssFileName);
                });
            });
        };
        this.updateLayoutFile = (isJS, newFileName) => {
            if (!isJS) {
                if (newFileName == 'styles') {
                    return console.log('Not updating layout (import exists).');
                }
                const layoutPath = path_1.default.join(__dirname, '../views/layout.hbs');
                const fileContent = fs_1.default.readFileSync(layoutPath);
                const fileLines = fileContent.toString().split('\n');
                if (fileLines.includes(`\t<link rel="stylesheet" href="/css/${newFileName}.css">`))
                    return console.log('Not updating layout (import exists)');
                const headEnd = fileLines.indexOf('</head>');
                fileLines.splice(headEnd - 1, 0, `\t<link rel="stylesheet" href="/css/${newFileName}.css">`);
                const newFileContent = fileLines.join('\n');
                fs_1.default.writeFileSync(layoutPath, newFileContent);
            }
        };
        this.cssDir = cssDir;
        this.sassDir = sassDir;
    }
}
exports.default = StaticManager;
