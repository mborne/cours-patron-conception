const path = require('path');
const shell = require('shelljs');

const convert = require('@mborne/markdown-to-html').convert;

console.log('rm -rf dist...');
shell.rm('-rf',path.resolve(__dirname,'dist'));

console.log('src/slides -> dist ...');
convert({
    outputDir: path.resolve(__dirname,'dist'),
    rootDir: path.resolve(__dirname,'src/slides'),
    layoutPath: path.resolve(__dirname,'layout/slides')
});

console.log('src/slides -> dist ...');
convert({
    outputDir: path.resolve(__dirname,'dist/annexe'),
    rootDir: path.resolve(__dirname,'src/annexe'),
    layoutPath: path.resolve(__dirname,'node_modules/@mborne/markdown-to-html/layout/github')
});
