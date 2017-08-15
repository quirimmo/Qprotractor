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

gulp.task('publish', ['clean-dist'], function() {
    gulp
        .src(PATH.src)
        .pipe(minify({
            ext: {
                min: '.min.js'
            }
        }))
        .pipe(gulp.dest(PATH.dist));
});
let server;
gulp.task('serve-demo-app-watch', function() {
    server = gls.static(PATH.app, 9000);
    server.start();
    gulp.watch(APP_FILES_TO_WATCH, function(file) {
        server.notify.apply(server, [file]);
    });
});
gulp.task('serve-demo-app', function() {
    server = gls.static(PATH.app, 9000);
    server.start();
});

gulp.task('stop-demo-app', function() {
    server.stop();
});

gulp.task('copy-app-components', ['clean-app-components'], function() {
    gulp
        .src(APP_COMPONENTS)
        .pipe(gulp.dest(PATH.components));
});

gulp.task('protractor-test', ['serve-demo-app'], function() {
    gulp.src(PATH.test)
        .pipe(protractor({
            configFile: PATH.protractorConfig,
            args: ['--baseUrl', 'http://localhost:9000']
        }))
        .pipe(gulp.task)
        .on('error', function(e) { throw e })
});

gulp.task('protractor-test-stop', ['protractor-test'], function() {
    let server = gls.static(PATH.app, 9000);
    server.stop();
});