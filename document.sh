#!/bin/bash

# this will generate a markdown documentation file and place it in the documentation Folders
# in order for this to work:
#   you will need to install jsdoc2md for this this to work: https://github.com/jsdoc2md/jsdoc-to-markdown
#   provide origin folder where you would like to export from - this should be: ~/workspace/riffyn/unity/app/imports/client/ui/components/*
#   set destination of documentation folder where you would to to export to - this should be: ~/workspace/Documentation

# [ ] todo - how to handle errors if either location is not found
# [x] todo - generate/update readme.md when script is rerun
# [ ] todo - write script to create documentation from js files from both Unity and Core
# see https://stackoverflow.com/questions/18027115/committing-via-travis-ci-failing to work through Travis authentication
echo 'updating documentation'

# /home/travis/build/[username]/[repo_name]
echo 'current directory' $PWD
# echo $HOME

cd ..

mkdir temp
cd temp
echo 'current directory' $PWD
git clone https://github.com/jonarnaldo/duck_typing.git
cd duck_typing

# set variables if they don't exist
SHA=`git rev-parse --verify HEAD`

# configure git vars
# git config --global user.email "jonarnaldo@gmail.com"
# git config --global user.name "Travis CI"
  
# overwrite readme file with updated info
echo "# Documentation"$'\r'$'\r' > ./documentation/document.md
echo "## Component Table of Contents" >> ./documentation/document.md

# writes jsdoc console output to markdown file
write_markdown_file () {
  local fileName
  fileName=$(basename $1)
  echo 'filename: ' $fileName
  # # pass a string instead using bash operator <<<
  # DesName=$(sed s/js/md/g <<< ${fileName})

  # echo "writing file ${DesName} to ./documentation/"
  # jsdoc2md $1 > ./documentation${DesName}
  # 
  # # create appropriate link in readme
  # echo "* [${fileName}](${DesName})" >> ./documentation/document.md
}

# export write_markdown_file

# find ./src/* -type f -name '*.jsx' ! -name '*.test.jsx' -exec bash -c 'write_markdown_file "$1"' - {} \;

# Commit the "changes", i.e. the new version.
# The delta will show diffs between new and old versions.
echo 'git add'
git add .
echo 'git commit'
git commit -m "Deploy to GitHub Pages: ${SHA}"

# Now that we're all set up, we can push.
echo 'git push'
git push origin master

exit
