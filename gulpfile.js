'use strict';

const gulp = require('gulp');
const clean = require('gulp-clean');
const minify = require('gulp-minify');
const gls = require('gulp-live-server');
const protractor = require("gulp-protractor").protractor;

const PATH = {
    components: './sample/app/components',
    dist: './dist',
    app: './sample/app/',
    src: './src/qprotractor.js',
    test: './test/*.spec.js',
    protractorConfig: './protractor.config.js'
};
const APP_FILES_TO_WATCH = 'sample/app/**/*.*';
const APP_COMPONENTS = [
    './node_modules/angular/angular.min.js',
    './node_modules/angular-ui-router/release/angular-ui-router.min.js'
];


gulp.task('clean-dist', function() {
    return gulp.src(PATH.dist, { read: false }).pipe(clean());
});

gulp.task('clean-app-components', function() {
    return gulp.src(PATH.components, { read: false }).pipe(clean());
});

gulp.task('publish', ['clean-dist', 'copy-app-components'], function() {
    gulp
        .src(PATH.src)
        .pipe(minify({
            ext: {
                min: '.min.js'
            }
        }))
        .pipe(gulp.dest(PATH.dist));
});

gulp.task('serve', ['publish'], function() {
    let server = gls.static(PATH.app, 9000);
    server.start();
    gulp.watch(APP_FILES_TO_WATCH, function(file) {
        server.notify.apply(server, [file]);
    });
});

let serverNoWatch;
gulp.task('serve-no-watch', ['publish'], function() {
    serverNoWatch = gls.static(PATH.app, 9000);
    serverNoWatch.start();
});

gulp.task('copy-app-components', ['clean-app-components'], function() {
    gulp
        .src(APP_COMPONENTS)
        .pipe(gulp.dest(PATH.components));
});

gulp.task('protractor-test', ['serve-no-watch'], function() {
    return gulp.src(PATH.test)
        .pipe(protractor({
            configFile: PATH.protractorConfig
        }))
        .on('close', function() {
            console.log('exit'); 
            serverNoWatch.stop();
        })
        .on('error', function(e) { throw e; });
});