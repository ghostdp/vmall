const { src , dest , series , parallel , watch } = require('gulp');
const webserver = require('gulp-webserver');
const sass = require('gulp-sass');
const clean = require('gulp-clean');
const fileinclude = require('gulp-file-include');

const cssmin = require('gulp-cssmin');
const htmlmin = require('gulp-htmlmin');
const requirejsOptimize = require('gulp-requirejs-optimize');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

function webTask(){
    return src('./dist')
            .pipe(webserver({
                    host : 'localhost',
                    port : 3000,
                    open : './views/index.html',
                    livereload : true
            }))
}

function sassTask(){
    return src('./src/css/all.scss')
            .pipe(sass())
            .pipe(dest('./dist/css'))
}

function htmlTask(){
    return src('./src/views/**')
            .pipe(fileinclude({
                prefix : '@',
                basepath : './src/views/components'
            }))
            .pipe(dest('./dist/views'))
}

function staticTask(){
    return src('./src/static/**')
            .pipe(dest('./dist/static'))
}

function libTask(){
    return src('./src/lib/**')
            .pipe(dest('./dist/lib'))
}

function jsTask(){
    return src('./src/js/**')
            .pipe(dest('./dist/js'))
}

function serverTask(){
    return src('./src/server/**')
            .pipe(dest('./dist/server'))
}

function mockTask(){
    return src('./src/mock/**')
            .pipe(dest('./dist/mock'))
}

function cleanTask(){
    return src('./dist',{ allowEmpty : true })
            .pipe(clean())
}

function watchTask(){
    watch('./src/css/*.scss', sassTask);
    watch('./src/views/*.html' , htmlTask);
    watch('./src/static/**' , staticTask);
    watch('./src/lib/**' , libTask);
    watch('./src/js/**' , jsTask);
    watch('./src/server/**' , serverTask);
    watch('./src/mock/**' , mockTask);
}

function sassTaskBuild(){
    return src('./src/css/all.scss')
            .pipe(sass())
            .pipe(cssmin())
            .pipe(dest('./dist/css'))
}

function htmlTaskBuild(){
    return src('./src/views/**')
            .pipe(fileinclude({
                prefix : '@',
                basepath : './src/views/components'
            }))
            .pipe(htmlmin({
                collapseWhitespace: true, // 去除空格
                removeEmptyAttributes: true, // 移出空的属性
                minifyCSS: true, // 压缩 style 标签
                minifyJS: true, // 压缩 script 标签
                removeComments: true   // 去除注释
            }))
            .pipe(dest('./dist/views'))
}

function jsTaskBuild(){
    return src(['./src/js/index.js','./src/js/detail.js','./src/js/cart.js'])
            .pipe(requirejsOptimize({
                optimize:"none",
                paths:{                        
                    "jquery":"empty:"
                }
            }))
            .pipe(babel({
                presets: ['es2015']
            }))
            .pipe(uglify())
            .pipe(dest('./dist/js'))
}
function serverTaskBuild(){
    return src('./src/server/**')
            .pipe(babel({
                presets: ['es2015']
            }))
            .pipe(uglify())
            .pipe(dest('./dist/server'))
}

module.exports = {
    dev : series(cleanTask , parallel(sassTask , htmlTask , staticTask , libTask , jsTask , serverTask , mockTask) , parallel(webTask,watchTask)),
    build : series(cleanTask , parallel(sassTaskBuild , htmlTaskBuild , staticTask , libTask , jsTaskBuild , serverTaskBuild , mockTask) , webTask)
};