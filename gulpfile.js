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
    './node_modules/angular-ui-router/release/angular-ui-router.min.js',
    './node_modules/angular-messages/angular-messages.min.js',
];

// Tasks List
// --------------------------------------------------------------

gulp.task('protractor-test', ['serve-no-watch'], protractorTest);
gulp.task('copy-app-components', ['clean-app-components'], copyAppComponents);
gulp.task('clean-dist', cleanDist);
gulp.task('clean-app-components', cleanAppComponents);
gulp.task('publish', ['clean-dist', 'copy-app-components'], publish);
gulp.task('serve', ['publish'], serve);
gulp.task('serve-no-watch', ['publish'], serveNoWatch);
gulp.task('default', ['protractor-test']);

// Tasks Functions
// -------------------------------------------------------------

function protractorTest() {
    return gulp.src(PATH.test)
        .pipe(protractor({ configFile: PATH.protractorConfig }))
        .on('close', () => {
            console.log('exit');
            serverNoWatch.stop();
        })
        .on('error', (e) => { throw e; });
}

function copyAppComponents() {
    gulp.src(APP_COMPONENTS).pipe(gulp.dest(PATH.components));
}

function cleanDist() {
    return gulp.src(PATH.dist, { read: false }).pipe(clean());
}

function cleanAppComponents() {
    return gulp.src(PATH.components, { read: false }).pipe(clean());
}

function publish() {
    gulp
        .src(PATH.src)
        .pipe(minify({
            ext: {
                min: '.min.js'
            }
        }))
        .pipe(gulp.dest(PATH.dist));
}

function serve() {
    let server = gls.static(PATH.app, 9000);
    server.start();
    gulp.watch(APP_FILES_TO_WATCH, (file) => {
        server.notify.apply(server, [file]);
    });
}

let serverNoWatch;
function serveNoWatch() {
    serverNoWatch = gls.static(PATH.app, 9000);
    serverNoWatch.start();
}