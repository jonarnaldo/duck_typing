#!/bin/bash

# this will generate a markdown documentation file and place it in the documentation Folders
# in order for this to work:
#   you will need to install jsdoc2md for this this to work: https://github.com/jsdoc2md/jsdoc-to-markdown
#   provide origin folder where you would like to export from - this should be: ~/workspace/riffyn/unity/app/imports/client/ui/components/*
#   set destination of documentation folder where you would to to export to - this should be: ~/workspace/Documentation

# [ ] todo - how to handle errors if either location is not found
# [x] todo - generate/update readme.md when script is rerun
# [ ] todo - write script to create documentation from js files from both Unity and Core
echo 'updating documentation'

git clone https://github.com/jonarnaldo/duck_typing.git

cd duck_type

echo $pwd

# # set variables if they don't exist
# ${DOCUMENTATION:=$HOME/workspace/meteor/packages/Documentation/}
# ${UNITY_COMPONENTS:=$HOME/workspace/unity/app/imports/client/ui/components/*}
#
# # overwrite readme file with updated info
# echo "# Documentation"$'\r'$'\r' > $DOCUMENTATION/README.md
# echo "## Unity Component Table of Contents" >> $DOCUMENTATION/README.md
#
# # writes jsdoc console output to markdown file
# write_markdown_file () {
#   local fileName
#   fileName=$(basename $1)
#   DesName=$(sed s/jsx/md/g <<< ${fileName})
#   jsdoc2md $1 > $DOCUMENTATION${DesName}
#   echo "writing file ${DesName} to ${DOCUMENTATION}"
#
#   # create appropriate link in readme
#   echo "* [${fileName}](${DesName})" >> $DOCUMENTATION/README.md
# }
#
# export -f write_markdown_file
#
# find $UNITY_COMPONENTS -type f -name '*.jsx' ! -name '*.test.jsx' -exec bash -c 'write_markdown_file "$1"' - {} \;
