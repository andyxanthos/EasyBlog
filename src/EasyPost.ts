import fs from 'fs';
import path from 'path';

import dirConfig from "./dirConfig";
import showdown from 'showdown';

export default class EasyPost {

    // Returns TRUE if file IS found in config.postsDir
    checkForMarkdown = (fileName: string): boolean => {
        const files = fs.readdirSync(dirConfig.postsDir);
        if (files.includes(fileName)) {
            console.log(`✅ Found Markdown file: ${fileName}`);
            return true;
        } else {
            console.log(`❌ Could not find Markdown file: ${fileName}`);
            return false;
        }
    }

    // Returns TRUE if file IS NOT found in config.viewsDir
    checkExistingViews = (fileName: string) => {
        fileName = (fileName.split('.')[0]) + '.hbs';
        const files = fs.readdirSync(dirConfig.viewsDir);
        return files.includes(fileName);
    }

    markdownToHTML = (newFileName: string, filePath: string): boolean => {
        // Read the markdown file
        const mdContent = fs.readFileSync(filePath).toString();
        console.log(`🤔 Processing raw Markdown:\n ${mdContent}`);

        // Convert the markdown to HTML
        const sd = new showdown.Converter();
        const generatedHTML = sd.makeHtml(mdContent);

        // Generate the HTML to add to the view.
        const postHTML = this.generateHTMLContent(generatedHTML);
        console.log(`✅ Generated post HTML: ${postHTML}`);

        // Get the path to write the new HTML file to, and write to it.
        // If the file exists after writing, return true. Otherwise return false.
        const newFilePath = path.join(dirConfig.viewsDir, newFileName);
        fs.writeFile(newFilePath, postHTML, () => {
            console.log(`❓ Attempting to write new file: ${newFilePath}`);
            if (fs.existsSync(path.join(dirConfig.viewsDir, newFileName))) {
                return true;
            } else {
                return false;
            }
        });
        return false;
    }

    generateHTMLContent = (postHTML: string) => {
        return `<div class="post-title">\n\t<h2>{{ meta.title }}</h2>\n</div>\n<div class="post-body">\n\t${postHTML}\n</div>`;
    }

    createNewPostFiles = (fileName: string): boolean => {
        console.log(`🙂 Attempting to create files: posts/${fileName}.md, meta/${fileName}.json.`);

        // Create the new markdown file
        const mdFilePath = path.join(dirConfig.postsDir, `${fileName}.md`);
        fs.writeFileSync(mdFilePath, `## ${fileName}.md`);

        // Create the corresponding meta json file
        const jsonFilePath = path.join(dirConfig.metaDir, `${fileName}.json`);
        const defaultMeta = {
            title: `${fileName}`,
            createdAt: Date.now()
        }
        fs.writeFileSync(jsonFilePath, JSON.stringify(defaultMeta, undefined, 4));

        const mdFileExists = fs.existsSync(mdFilePath);
        const metaFileExists = fs.existsSync(jsonFilePath);
        if (mdFileExists && metaFileExists) {
            console.log(`✅ Successfully created markdown file: ${fileName}.md`);
            console.log(`✅ Successfully created meta file: ${fileName}.json`);
            return true;
        } else {
            return false;
        }
    }
}