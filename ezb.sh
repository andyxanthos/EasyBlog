#!/bin/bash
file_url="https://github.com/andyxanthos/EasyBlog/raw/master/EasyBlog-v1-starter.zip"
file_name="EasyBlog-v1-starter.zip"

ezb_path=$(which ezb)
if [ -z "${ezb_path}" ]; then cp ./ezb.sh /usr/local/bin/ezb; fi

if [ "$1" == "backup" ]; then
    cd "${PWD}"
    mkdir -p backups
    mkdir backup
    cp -r EasyBlog backup/
    cp -r meta backup/
    cp -r posts backup/
    cp -r static backup/
    cp -r views backup/
    cp easyconfig.json backup/
    cp package-lock.json backup/
    cp package.json backup/
    timestamp=$(date +%s)
    zip -r "blog-backup-$timestamp.zip" backup
    mv blog-backup-* backups
    rm -r ./backup
fi

if [ "$1" == "new"  -a  ! -z "$2" ]; then
    cd "${PWD}"
    wget "$file_url" # get the .zip file from Github
    echo "unzipping $file_name..."
    unzip "$file_name" # unzip it, getting a folder called 'starter'
    echo "renaming starter to $2..."
    mv starter "$2" # rename the starter directory to the user supplied name
    rm "$file_name"
fi