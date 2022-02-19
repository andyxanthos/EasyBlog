# EasyBlog

## What is EasyBlog?

EasyBlog intends to be a low-maintenance, easy to understand blog generator. Once you've initialized a blog, you write posts using Markdown syntax, put them in the `posts` directory, run a few CLI commands to generate HTML files, and you've got a fully-functional blog.

If you're interested in learning more, you can get started by following the guide below or downloading the [starter](https://github.com/andyxanthos/EasyBlog/raw/master/EasyBlog-v1-starter.zip).

**EasyBlog is a work in progress - expect breaking changes. Comprehensive documentation is in the works.**

------

## Get Started

### Setup
1. Download the `ezb` command-line tool. This tool allows you to create new EasyBlog blogs.

    `wget https://raw.githubusercontent.com/andyxanthos/EasyBlog/master/ezb.sh ; chmod +x ezb.sh`
2. Create a new blog using `sudo ./ezb.sh new <blog-name>`. 
    
    - *Note*: The project will be created in the directory where you run the command.

    - `ezb.sh` will copy itself to `/usr/local/bin/ezb` the first time it runs. This will mean that you only have to call `ezb <command> <params...>` in the future. Most people will need to use `sudo` to write to this directory.
3. Enter the project directory, e.g. `cd <blog-name>`.
4. Run `npm install` to install the dependencies.
5. Populate the data in `easyconfig.json` - this is where you set many values that apply across the entirety of your blog.

### Your First Post ❤️
1. From within the blog directory, run `npm run cli newPost <post-name>`.

    - *Note*: post-name should not include a file extension.
2. Take a peek in the `/posts` directory. You should see a newly generated Markdown file!
3. Notice that the `newPost` command created another file in the `/meta` directory.

    - Meta files allow us to store additional information about posts outside of their Markdown files. With the exception of the file extension, Markdown files will always share a filename with their associated Meta file. Take a look inside the Meta file to see what kind of information we put in there by default.
4. Write whatever you want in the Markdown file! Come back to us when you're done.

### Done writing?

1. Let's turn that Markdown into HTML by running `npm run cli convert <post-name>`.

     - Again, please do not include a file extension (ex. 'md') when running this command. This is true of all EasyBlog commands.
2. The output HTML will be written into a file named `<post-name>.hbs` in the `/views` directory. Unless you notice an inconsistency between your Markdown and the generated HTML, you should never need to look at the output.
3. Now you're ready to look at your blog in the browser. To start a local development server, run `npm run localServe`.
4. Navigate to `http://localhost:3030/` in your browser. Hopefully you are greeted with a plain, but (sort of) elegant index page!

-------

## Deployment

There are a few different ways to deploy your EasyBlog blog. When planning for deployment, something to keep in mind is that your blog is functionally indistinguishable from a regular Express app. The fact that you don't need a traditional database should only make deployment easier (and cheaper!).

- [Heroku](https://www.heroku.com/) is a wise choice for beginners (or if configuring an EC2 instance to your liking doesn't sound like fun to you). You provide your code, make some minor configuration changes, and they do everything else. They'll even manage your TLS certs.
- AWS EC2, Google Cloud Platform, and Azure are all good choices as well, though you'll be on your own in terms of configuration.

A more complete guide to deployment (and some handy shell scripts) are in the works.

-------

## Persistence

Optional persistence is in the works. Until then, I strongly recommend that you create manual backups.

`ezb backup` will create a ZIP file of your blog's essential files for backup purposes. I recommend creating a cronjob to run this regularly.

-------

## Philosophy

### General
A few key tenets of the EasyBlog philosophy are as follows:

1. Blogging is about content, not the tech behind it. I want you to forget about EasyBlog while using it. Once you've done some of the initial setup, I think your interaction with the software that powers your blog should be minimal. In EasyBlog's case, that's running a single command to generate a view from your Markdown.

2. Encourage extension without requiring it. Ultimately, this is just an Express application with a lot of abstraction. Anyone who's familiar with Express is welcome to download the source and tweak it to their liking, but, when making design decisions, I am more concerned with the people who are not interested in messing around. I want to provide a consistent and polished experience.

3. Simplicity over everything. While I'm still trying to correct overcomplicated design decisions early on in the development process, my first priority is creating an exceptionally simple user interface - meaning CLI, config, etc. I am a relative novice when it comes to software design outside the context of pet projects.



### Interface
A brand new EasyBlog blog contains a very small amount of CSS. This is an intentional design decision made to save you the headache of navigating someone else's CSS. Additionally, I've aimed to keep the HTML structure as simple as possible to mitigate confusion.

The `.hbs` files generated from your Markdown posts are available for you to edit as you see fit - you can find them in the `/views` directory. Additionally, the `/static` folder houses `css` and `js` subdirectories which contain some bare-bones files. You are encouraged to add your CSS and JavaScript to these directories, but keep in mind that you'll need to update `<head>` in `views/layout.hbs`.

"Themes" are a planned feature. As of right now, the thought is that a variety of CSS files will be held in a central repository. Switching between themes could be as simple as changing a line in `easyconfig.json` and running a CLI command.

That said, front-end configurability is not a core goal for this project. In fact, I'd say avoiding front-end configuration *is* a core goal and a theming system seems like a solid step in that direction.

------

## Contributing

All contributions are welcome. 

EasyBlog is licensed under GPLv3. Please avoid employing any part of this source code in closed-source software. All forks must be open-source, regardless of the extent of modification.