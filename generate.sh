#!/bin/sh

hash generate-md 2> /dev/null || { echo "#setup markdown-styles\nsudo npm install -g markdown-styles" ; exit 1; }
hash markdown-to-slides 2> /dev/null || { echo "#setup markdown-styles\nsudo npm install -g markdown-to-slides" ; exit 1; }

#generate-md --layout ./layout/page.html --input ./ --output ./html

rm -rf dist

generate-md --input ./design_pattern --output ./dist

markdown-to-slides PATRON_CONCEPTION.md \
	--style layout/slides/style.css \
	--script layout/slides/script.js \
	--template layout/slides/template.html \
	-o dist/index.html

cp -r lib/* dist/.
