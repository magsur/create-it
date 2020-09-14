const gulp = require('gulp'),
    less = require('gulp-less'),
    browserSync = require('browser-sync'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('reload', function () {
    browserSync.reload();
});

gulp.task('serve', ['less', 'script'], function () {
    browserSync.init({
        server: "./"
    });

    gulp.watch('styles/less/*.less', ['less']);
    gulp.watch('scripts/*.js', ['script']);
});

gulp.task('less', function () {
    gulp.src('styles/less/*.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(
            autoprefixer({
                browsers: ['last 3 versions'],
            }),
        )
        .pipe(sourcemaps.write('./maps/'))
        .pipe(gulp.dest('dist/styles/'))
        .pipe(browserSync.stream());
});

gulp.task('script', function () {
    gulp.src('scripts/*.js')
        .pipe(gulp.dest('dist/scripts/'))
        .pipe(browserSync.stream());
});


gulp.task('default', ['serve']);



