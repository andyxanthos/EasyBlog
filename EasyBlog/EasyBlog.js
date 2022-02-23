"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importStar(require("fs"));
const dirConfig_1 = __importDefault(require("./dirConfig"));
const path_1 = __importDefault(require("path"));
class EasyBlog {
    constructor() {
        // Set the strings defined in EasyConfig as locals accessible by the view.
        this.setLocals = (req, res, next) => {
            res.locals.blogTitle = this.config.blogTitle;
            res.locals.blogSubtitle = this.config.blogSubtitle;
            res.locals.userNames = this.config.userNames;
            next();
        };
        this.log = (req, res, next) => {
            if (!fs_1.default.existsSync(dirConfig_1.default.logDir)) {
                fs_1.default.mkdirSync(dirConfig_1.default.logDir);
            }
            if (req.path == '/favicon.ico')
                next();
            const now = new Date(Date.now());
            const time = now.toLocaleTimeString();
            const date = now.toLocaleDateString();
            const timestamp = `${date} at ${time}`;
            const logString = `${timestamp}: (${req.ip}) ${req.method} ${req.path} -> ${res.statusCode}`;
            console.log(logString);
            const logFilePath = path_1.default.join(dirConfig_1.default.logDir, '/server.log');
            fs_1.default.appendFileSync(logFilePath, `${logString}\n`);
            next();
        };
        // Input: post-id (url param) | output: view name (e.g. blog-post.ejs) or NULL
        this.findPost = (viewName) => {
            viewName = `${viewName}.hbs`;
            const files = (0, fs_1.readdirSync)(this.dirConfig.viewsDir);
            if (files.includes(viewName))
                return viewName;
            return null;
        };
        this.findPosts = () => {
            const files = fs_1.default.readdirSync(this.dirConfig.viewsDir);
            const posts = [];
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
            return posts.sort((a, b) => { return b.meta.createdAt - a.meta.createdAt; });
        };
        this.getPostMeta = (fileName) => {
            fileName = `${fileName}.json`;
            const filePath = path_1.default.join(this.dirConfig.metaDir, fileName);
            const metaFileExists = fs_1.default.existsSync(filePath);
            if (metaFileExists) {
                const jsonData = fs_1.default.readFileSync(filePath);
                const metaData = JSON.parse(jsonData.toString());
                return Object.assign({}, metaData);
            }
            else {
                console.log(`❌ Unable to find meta file "${fileName} in ${this.dirConfig.metaDir}."`);
                return {
                    title: `${fileName}`,
                    createdAt: 12345678
                };
            }
        };
        const configJSON = fs_1.default.readFileSync(path_1.default.join(__dirname, '../easyconfig.json'));
        const parsedConfig = JSON.parse(configJSON.toString());
        this.config = parsedConfig;
        this.dirConfig = dirConfig_1.default;
    }
}
exports.default = EasyBlog;
