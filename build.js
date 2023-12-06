const path = require('path');
const shell = require('shelljs');

const convert = require('@mborne/markdown-to-html').convert;

console.log('rm -rf docs...');
shell.rm('-rf',path.resolve(__dirname,'docs'));

const options = {
    language: "fr"
}

console.log('src/slides -> docs with layout/slides...');
convert(
    path.resolve(__dirname,'src/slides'),
    path.resolve(__dirname,'docs'),
    path.resolve(__dirname,'layout/slides'),
    options
);

console.log('src/annexe -> docs/annexe with default layout...');
convert(
    path.resolve(__dirname,'src/annexe'),
    path.resolve(__dirname,'docs/annexe'),
    path.resolve(__dirname,'layout/annexe'),
    options
);
