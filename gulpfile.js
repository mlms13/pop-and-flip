var gulp = require('gulp');

gulp.task('stylus', function () {
    var stylus = require('gulp-stylus'),
        autoprefixer = require('gulp-autoprefixer');

    gulp.src('./styl/flip.styl')
        .pipe(stylus())
        .pipe(autoprefixer())
        .pipe(gulp.dest('./build/css'));
});

gulp.task('default', ['stylus']);