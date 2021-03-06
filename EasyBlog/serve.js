"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const hbs_1 = __importDefault(require("hbs"));
const path_1 = __importDefault(require("path"));
const dirConfig_1 = __importDefault(require("./dirConfig"));
const EasyBlog_1 = __importDefault(require("./EasyBlog"));
const StaticManager_1 = __importDefault(require("./StaticManager"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3030;
app.use(express_1.default.static('static'));
app.set('view engine', 'hbs');
app.set('views', dirConfig_1.default.viewsDir);
hbs_1.default.registerHelper('readableTime', (timestamp) => {
    return new Date(timestamp).toLocaleDateString();
});
const blog = new EasyBlog_1.default();
app.use(blog.setLocals);
app.use(blog.log);
const cssDir = path_1.default.join(__dirname, '../static/css/');
const scssDir = path_1.default.join(__dirname, '../static/scss/');
new StaticManager_1.default(cssDir, scssDir).SCSStoCSS();
app.get('/', (req, res) => {
    res.render('index', {
        posts: blog.findPosts()
    });
});
app.get('/blog/:postId', (req, res) => {
    const postView = blog.findPost(req.params.postId);
    if (postView) {
        res.render(postView, {
            meta: blog.getPostMeta(req.params.postId)
        });
    }
});
app.listen(PORT, () => {
    console.log(`😀 App started. http://localhost:${PORT}/`);
});
