var gulp = require('gulp'),
    browserSync = require('browser-sync');


gulp.task('server', function () {
    browserSync({
        server: {
            baseDir: [
                '',
                paths['temp']
            ]
        }
    });
});
