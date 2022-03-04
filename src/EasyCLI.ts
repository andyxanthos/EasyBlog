import path from "path";
import dirConfig from "./dirConfig";
import EasyPost from "./EasyPost";
import EasyMetrics from "./EasyMetrics";

export default class EasyCLI {

    parseArgs = (argv: string[]) => {
        if (argv.length == 3) {
            return { 
                command: argv[2],
                parameters: []
            };
        }
        const args = argv.slice(2);
        const [command, ...parameters] = args;
        return { command, parameters };
    }

    showHelp = () => {
        console.log('🙂 EasyBlog Help!');
        console.log('Unfortunately, official documentation is still in the works.');
        console.log('In the mean time, you can get help on GitHub:');
        console.log('https://github.com/andyxanthos/EasyBlog');
    }

    handleConvert = (fileName: string) => {
        const post = new EasyPost();
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
        const result = post.markdownToHTML(newFileName, path.join(dirConfig.postsDir, fileName));
        if (result) return console.log(`✅ Succesfully created a view for: ${fileName}`);
    };

    newPost = (fileName: string) => {
        const post = new EasyPost();
        if (post.checkForMarkdown(`${fileName}.md`)) {
            return console.log(`❌ ERROR: ${fileName} already exists.`);
        } else {
            return post.createNewPostFiles(fileName);
        }
    };

    updatePost = (fileName: string) => {
        const post = new EasyPost();
        if (!post.checkForMarkdown(`${fileName}.md`)) {
            return console.log(`❌ Could not find ${fileName}.md!`);
        } else if (!post.checkExistingViews(fileName)) {
            console.log(`❌ Could not locate the view ${fileName}.hbs!`);
            return console.log('Did you mean `convert`?');
        } else {
            const currentViewPath = path.join(dirConfig.viewsDir, fileName);
            // Remove the existing view
            const postDeleted = post.deleteView(`${currentViewPath}.hbs`);
            if (postDeleted) {
                return this.handleConvert(fileName);
            } else {
                return console.log('EasyCLI.updatePost ERROR: Could not update post.');
            }
        }
    }

    metrics = (logFile: string) => {
        const metrics = new EasyMetrics();
        metrics.generateMetrics(logFile);
    };
}