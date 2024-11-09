const path = require('path');
const shell = require('shelljs');

const convert = require('@mborne/markdown-to-html').convert;

console.log('rm -rf public...');
shell.rm('-rf',path.resolve(__dirname,'public'));

const options = {
    language: "fr"
}

console.log('src/slides -> public with layout/slides...');
convert(
    path.resolve(__dirname,'src/slides'),
    path.resolve(__dirname,'public'),
    path.resolve(__dirname,'layout/slides'),
    options
);

console.log('src/annexe -> docs/annexe with default layout...');
convert(
    path.resolve(__dirname,'src/annexe'),
    path.resolve(__dirname,'public/annexe'),
    path.resolve(__dirname,'layout/annexe'),
    options
);
