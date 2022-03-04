import express from 'express';
import hbs from 'hbs';
import path from 'path';
 
import dirConfig from './dirConfig';
import EasyBlog from './EasyBlog';
import StaticManager from './StaticManager';

const app = express();
const PORT = process.env.PORT || 3030;

app.use(express.static('static'));

app.set('view engine', 'hbs');
app.set('views', dirConfig.viewsDir);
hbs.registerHelper('readableTime', (timestamp) => {
    return new Date(timestamp).toLocaleDateString();
});

const blog = new EasyBlog();
app.use(blog.setLocals);
app.use(blog.log);

const cssDir = path.join(__dirname, '../static/css/');
const scssDir = path.join(__dirname, '../static/scss/');
new StaticManager(cssDir, scssDir).SCSStoCSS();

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
        })
    }
});

app.listen(PORT, () => {
    console.log(`😀 App started. http://localhost:${PORT}/`);
});
