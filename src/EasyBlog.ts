import fs, { readdirSync } from 'fs';
import dirConfig, { DirConfigMap } from "./dirConfig";
import { Response, Request, NextFunction } from 'express';
import path from 'path';
import crypto from 'crypto';


export default class EasyBlog {

    // EasyBlog is responsible for:
    // 1. Holding the blog configuration
    // 2. Finding views
    // 3. Middleware

    config: {
        blogTitle: string,
        blogSubtitle: string,
        userNames: { string: string },
        metrics: boolean
    };
    dirConfig: DirConfigMap;

    constructor() {
        const configJSON = fs.readFileSync(path.join(__dirname, '../easyconfig.json'));
        const parsedConfig = JSON.parse(configJSON.toString());
        this.config = parsedConfig;
        this.dirConfig = dirConfig;
    }

    // Set the strings defined in EasyConfig as locals accessible by the view.
    setLocals = (req: Request, res: Response, next: NextFunction) => {
        res.locals.blogTitle = this.config.blogTitle;
        res.locals.blogSubtitle = this.config.blogSubtitle;
        res.locals.userNames = this.config.userNames;
        next();
    }

    log = (req: Request, res: Response, next: NextFunction) => {
        if (!fs.existsSync(dirConfig.logDir)) {
            fs.mkdirSync(dirConfig.logDir);
        }

        if (req.path == '/favicon.ico') next();

        const now = new Date(Date.now());
        const time = now.toLocaleTimeString();
        const date = now.toLocaleDateString();
        const timestamp = `${date} at ${time}`;

        const logString = `${Date.now()} (${timestamp}): (${req.ip}) ${req.method} ${req.path} -> ${res.statusCode}`;
        console.log(logString);

        const logFilePath = path.join(dirConfig.logDir, '/server.log');
        fs.appendFileSync(logFilePath, `${logString}\n`);

        next();
    }
      
    // Input: post-id (url param) | output: view name (e.g. blog-post.hbs) or NULL
    findPost = (viewName: string): string | null => {
        viewName = `${viewName}.hbs`;
        const files = readdirSync(this.dirConfig.viewsDir)
        if (files.includes(viewName)) return viewName;
        return null;
    }

    findPosts = () => {
        const files = fs.readdirSync(this.dirConfig.viewsDir);
        const posts: {meta: {title: string, createdAt: number}, url: string}[] = [];
        files.forEach(file => {
            const fileName = file.split('.')[0];
            if (!this.dirConfig.staticFiles.includes(file)) {
                const postMeta = this.getPostMeta(fileName);
                posts.push({
                    meta: postMeta,
                    url: `/blog/${fileName}`
                });
            }
        });
        return posts.sort((a, b) => { return b.meta.createdAt - a.meta.createdAt });
    }

    getPostMeta = (fileName: string): {title: string, createdAt: number} => {
        fileName = `${fileName}.json`;
        const filePath = path.join(this.dirConfig.metaDir, fileName);
        const metaFileExists = fs.existsSync(filePath);
        if (metaFileExists) {
            const jsonData = fs.readFileSync(filePath);
            const metaData = JSON.parse(jsonData.toString());
            return { ...metaData };
        } else {
            console.log(`❌ Unable to find meta file "${fileName} in ${this.dirConfig.metaDir}."`);
            return {
                title: `${fileName}`,
                createdAt: 12345678
            };
        }
    }
}