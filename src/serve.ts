import express from 'express';
import path from 'path';
 
import dirConfig from './dirConfig';
import EasyBlog from './EasyBlog';

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'hbs');
app.set('views', dirConfig.viewsDir);

const blog = new EasyBlog();
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
        })
    }
});

app.listen(3030, () => {
    console.log('😀 App started. http://localhost:3030/');
});
