#!/bin/bash
file_url="https://github.com/andyxanthos/EasyBlog/raw/master/EasyBlog-v1-starter.zip"
file_name="EasyBlog-v1-starter.zip"

if [-z "${which ezb}"]; then cp ./ezb.sh /usr/local/bin/ezb; fi

if [ "$1" == "new"  -a  ! -z "$2" ]; then
    cd "${PWD}"
    wget "$file_url" # get the .zip file from Github
    echo "unzipping $file_name..."
    unzip "$file_name" # unzip it, getting a folder called 'starter'
    echo "renaming starter to $2..."
    mv starter "$2" # rename the starter directory to the user supplied name
    rm "$file_name"
fi