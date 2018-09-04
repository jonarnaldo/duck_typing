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
# writes jsdoc console output to markdown file
write_markdown_file () {
  local fileName
  fileName=$(basename $1)
  echo 'filename: ' $fileName

  # replace 'js' extension to 'md' using sed
  DesName=$(sed s/js/md/g <<< ${fileName})

  echo "writing file ${DesName} to ./documentation/"
  jsdoc2md $1 > ./documentation${DesName}

  # create appropriate link in readme
  echo "* [${fileName}](${DesName})" >> ../../documentation/document.md
}

# export functions, set variables if they don't exist, clone repo, add jsdoc package
init() {
  echo 'initiliazing updating documentation'
  export write_markdown_file

  SHA=`git rev-parse --verify HEAD`

  npm install -g jsdoc-to-markdown

  # clone repo into temp folder and cd into it
  cd ..
  mkdir temp
  cd temp
  echo 'current directory' $PWD
  git clone https://github.com/jonarnaldo/duck_typing.git
  cd duck_typing
}

# find all jsx files excluding test.jsx and write markdown file
writeAllDocumentation() {
  echo "# Documentation"$'\r'$'\r' > ../../documentation/document.md
  echo "## Component Table of Contents" >> ../../documentation/document.md
  find ./src/* -type f -name '*.jsx' ! -name '*.test.jsx' -exec bash -c 'write_markdown_file "$1"' - {} \;
}

setup_git() {
  git config --global user.email "jonarnaldo@gmail.com"
  git config --global user.name "jonarnaldo"
}

commit_documentation_files() {
  git checkout -b documentation
  git add .
  git commit --message "Travis build: ${SHA}"
}

upload_files() {
  git remote add upstream https://${GH_TOKEN}@github.com/jonarnaldo/duck_typing.git
  git push --quiet --set-upstream upstream documentation
}

init()
writeAllDocumentation()
setup_git()
commit_documentation_files()
upload_files()

exit
