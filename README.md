# EasyBlog

## What is EasyBlog?

EasyBlog intends to be a low-maintenance, easy to understand blog generator. Once you've initialized a blog, you write posts using Markdown syntax, put them in the `posts` directory, run a few CLI commands to generate HTML files, and you've got a fully-functional blog.

## Get Started

### Setup
1. Download the `ezb` command-line tool. This tool allows you to create new EasyBlog blogs.
2. Create a new blog using `ezb new <blog-name>`. 
    
    *Note*: The project will be created in the directory where you run the command.
3. Enter the project directory, e.g. `cd <blog-name>`.
4. Run `npm install` to install the dependencies.
5. Populate the data in `easyconfig.json` - this is where you set many values that apply across the entirety of your blog.

### Your First Post ❤️
1. From within the blog directory, run `npm run cli newPost <post-name>`.

    *Note*: post-name should not include a file extension.
2. Take a peek in the `/posts` directory. You should see a newly generated Markdown file!
3. Notice that the `newPost` command created another file in the `/meta` directory.

    *What's this file for?* Meta files allow us to store additional information about posts outside of their Markdown files. With the exception of the file extension, Markdown files will always share a filename with their associated Meta file. Take a look inside the Meta file to see what kind of information we put in there by default.
4. Write whatever you want in the Markdown file! Come back to us when you're done.

### Done writing?

1. Let's turn that Markdown into HTML by running `npm run cli convert <post-name>`.

    *Note*: Again, please do not include a file extension (ex. 'md') when running this command. This is true of all EasyBlog commands.
2. The output HTML will be written into a file named `<post-name>.hbs` in the `/views` directory. Unless you notice an inconsistency between your Markdown and the generated HTML, you should never need to look at the output.
3. Now you're ready to look at your blog in the browser. To start a local development server, run `npm run localServe`.
4. Navigate to `http://localhost:3030/` in your browser. Hopefully you are greeted with a plain, but (sort of) elegant index page!

## Deployment

**TODO**: Write deployment guide

## Interface

### Philosophy
A brand new EasyBlog blog is styled only very minimally. This is an intentional design decision made to save you the headache of navigating someone else's CSS code. Additionally, we've aimed to keep the HTML structure as simple as possible to mitigate confusion.
