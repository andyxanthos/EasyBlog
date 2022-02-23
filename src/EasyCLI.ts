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

    metrics = (logFile: string) => {
        const metrics = new EasyMetrics();
        metrics.generateMetrics(logFile);
    };
}