const gulp = require('gulp');
const path = require('path');
const shell = require('shelljs');

const convert = require('@mborne/markdown-to-html').convert;

gulp.task('clean',function(){
    shell.rm('-rf',path.resolve(__dirname,'dist'));
});

/* construction des présentations */
gulp.task('slides',function(){
    convert({
        outputDir: path.resolve(__dirname,'dist'),
        rootDir: path.resolve(__dirname,'src/slides'),
        layoutPath: path.resolve(__dirname,'layout/slides')
    });
});

/* construction annexe */
gulp.task('annexe',function(){
    const outputDir = path.resolve(__dirname,'dist/annexe');
    convert({
        outputDir: outputDir,
        rootDir: path.resolve(__dirname,'src/annexe'),
        layoutPath: path.resolve(__dirname,'node_modules/@mborne/markdown-to-html/layout/github')
    });
});

gulp.task('default', ['clean','slides','annexe']);

