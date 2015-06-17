var gulp        = require('gulp'),
    browserSync = require('browser-sync');


gulp.task('html', function () {
    return gulp.src(paths['src'] + '/index.html')
        .pipe(gulp.dest(paths['temp']));
});
