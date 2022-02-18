"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dirConfig_1 = __importDefault(require("./dirConfig"));
const EasyBlog_1 = __importDefault(require("./EasyBlog"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.set('view engine', 'hbs');
app.set('views', dirConfig_1.default.viewsDir);
const blog = new EasyBlog_1.default();
app.use(blog.setLocals);
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
app.listen(3030, () => {
    console.log('😀 App started. http://localhost:3030/');
});
