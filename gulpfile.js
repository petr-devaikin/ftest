var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    clean = require('gulp-clean'),
    //sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');


gulp.task('clean', function () {
    return gulp.src(['./public/*', '!./public/.gitignore'], {read: false})
        .pipe(clean());
});


gulp.task('css', function () {
    gulp.src(['./source/css/*.css'])
        //.pipe(sass({ onError: function (e) { console.log(e); } }))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./public/css'))
        .pipe(browserSync.reload({ stream: true }));
});


gulp.task('js', function () {
    gulp.src(['./source/js/**/*.js'])
        //.pipe(concat('app.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('./public/js'))
        .pipe(browserSync.reload({ stream: true }));
});

/*
gulp.task('img', function () {
    gulp.src(['./source/img/*.*'])
        .pipe(gulp.dest('./public/img'))
        .pipe(browserSync.reload({ stream: true }));
});
*/



gulp.task('html', function () {
    return gulp.src('./source/html/*.html')
        //.pipe(inject(sources, { addRootSlash: false }))
        .pipe(gulp.dest('public/'))
        .pipe(browserSync.reload({ stream: true }));
});


gulp.task('public', function(callback) {
    runSequence('clean',
        [
            'css',
            'js',
        ],
        'html',
        callback);
});


gulp.task('serve', ['html', 'js', 'css'], function () {
    browserSync({
        server: {
            baseDir: './public'
        }
    });

    gulp.watch('./source/js/**/*.js', ['js'])
    gulp.watch('./source/css/*.scss', ['css'])
    gulp.watch('./source/html/*.html', ['html'])
});
