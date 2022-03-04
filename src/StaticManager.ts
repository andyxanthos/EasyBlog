import fs from 'fs';
import path from 'path';
import sass from 'sass';

export default class StaticManager {

    cssDir: string;
    sassDir: string;
    constructor(cssDir: string, sassDir: string) {
        this.cssDir = cssDir;
        this.sassDir = sassDir;
    }
    

    SCSStoCSS = () => {
        const sassFilenames = fs.readdirSync(this.sassDir);
         sassFilenames.forEach( filename => {
            fs.watchFile(path.join(this.sassDir, filename), (_, __) => {
                console.log(`Recompiling ${filename} to CSS.`);
                const fPath = path.join(__dirname, `../static/scss/${filename}`);
                const compiledCSS = sass.compile(fPath);
                const cssFileName = filename.split('.')[0];
                const cssFilePath = path.join(this.cssDir, `${cssFileName}.css`);
                fs.writeFileSync(cssFilePath, compiledCSS.css);
                this.updateLayoutFile(false, cssFileName);
            })
        })
    }

    updateLayoutFile = (isJS: boolean, newFileName: string) => {
        if (!isJS) {
            if (newFileName == 'styles') {
                return console.log('Not updating layout (import exists).');
            }

            const layoutPath = path.join(__dirname, '../views/layout.hbs');

            const fileContent = fs.readFileSync(layoutPath);
            const fileLines = fileContent.toString().split('\n');
            if (fileLines.includes(`\t<link rel="stylesheet" href="/css/${newFileName}.css">`)) return console.log('Not updating layout (import exists)');

            const headEnd = fileLines.indexOf('</head>');
            fileLines.splice(headEnd - 1, 0, `\t<link rel="stylesheet" href="/css/${newFileName}.css">`)
            const newFileContent = fileLines.join('\n');
            fs.writeFileSync(layoutPath, newFileContent);
        }
    }

}