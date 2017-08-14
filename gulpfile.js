const gulp = require('gulp');
const clean = require('gulp-clean');
const minify = require('gulp-minify');
const gls = require('gulp-live-server');


gulp.task('clean-dist', function() {
    return gulp.src('./dist', { read: false }).pipe(clean());
});

gulp.task('clean-app-components', function() {
    return gulp.src('./sample/app/components', { read: false }).pipe(clean());
});

gulp.task('publish', ['clean-dist'], function() {
    gulp
        .src('./src/qprotractor.js')
        .pipe(minify({
            ext: {
                min: '.min.js'
            }
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('serve-demo-app', function() {
    let server = gls.static('./sample/app/', 9000);
    server.start();
    gulp.watch('sample/app/**/*.*', function(file) {
        server.notify.apply(server, [file]);
    });
});

gulp.task('copy-app-components', ['clean-app-components'], function() {
    gulp
        .src(['./node_modules/angular/angular.min.js', './node_modules/angular-ui-router/release/angular-ui-router.min.js'])
        .pipe(gulp.dest('./sample/app/components'));
});