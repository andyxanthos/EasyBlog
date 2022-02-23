#!/bin/bash
file_url="https://github.com/andyxanthos/EasyBlog/raw/master/EasyBlog-v1-starter.zip"
file_name="EasyBlog-v1-starter.zip"

cd "${PWD}"

# Install `ezb` to a directory in PATH, if it isn't there already
ezb_path=$(which ezb)
if [ -z "${ezb_path}" ]; then cp ./ezb.sh /usr/local/bin/ezb; fi

# Backup
if [ "$1" == "backup" ]; then
    mkdir -p backups
    mkdir backup
    cp -R EasyBlog backup/EasyBlog
    cp -R meta backup/meta
    cp -R posts backup/posts
    cp -R static backup/static
    cp -R views backup/views
    cp easyconfig.json backup/
    cp package-lock.json backup/
    cp package.json backup/
    timestamp=$(date +%s)
    zip -r "blog-backup-$timestamp.zip" backup
    mv blog-backup-* backups
    rm -r ./backup
fi

if [ "$1" == "deployment" ]; then
    mkdir -p deployments
    mkdir deployment
    cp -R EasyBlog deployment
    cp -R meta deployment
    cp -R views deployment
    cp -R static deployment
    cp easyconfig.json deployment/
    cp package-lock.json deployment/
    cp package.json deployment/
    timestamp=$(date +%s)
    zip -r "deploy-$timestamp.zip" deployment
    mv "deploy-$timestamp.zip" deployments/
    rm -r deployment
fi

# New
if [ "$1" == "new" ]; then
    if [ "$1" == "new" -a -z "$2" ]; then
        echo "ERROR: You must supply the name of your new blog to 'ezb new <blog-name>'."
        exit 1 
    fi
    wget "$file_url" # get the .zip file from Github
    echo "unzipping $file_name..."
    unzip "$file_name" # unzip it, getting a folder called 'starter'
    echo "renaming starter to $2..."
    mv starter "$2" # rename the starter directory to the user supplied name
    rm "$file_name"
fi