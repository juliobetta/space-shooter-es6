var gulp         = require('gulp'),
    handleErrors = require('../util/handleErrors');


gulp.task('processAssets', function () {
    gulp.src([
        './assets/**'
    ])
        .pipe(handleErrors())
        .pipe(gulp.dest(paths['product'] + '/assets'));
});
