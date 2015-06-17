var gulp       = require('gulp'),
    gutil      = require('gulp-util'),
    concat     = require('gulp-concat'),
    uglify     = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps');


gulp.task('uglify', [ 'scripts' ], function () {
    return gulp.src([
          './bower_components/almond/almond.js',
          './bower_components/phaser-official/build/custom/phaser-arcade-physics.js',
          './node_modules/babel-core/browser-polyfill.js',
          './.tmp/assets/js/game.js'
        ])
        .pipe(sourcemaps.init())
        .pipe(concat('game.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths['product'] + '/assets/js'));
});
