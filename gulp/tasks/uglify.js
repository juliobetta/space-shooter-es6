var gulp       = require('gulp'),
    gutil      = require('gulp-util'),
    concat     = require('gulp-concat'),
    uglify     = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps');


gulp.task('uglify', [ 'scripts' ], function () {
    return gulp.src([
            './static/bower_components/traceur-runtime/traceur-runtime.js',
            
            './static/bower_components/phaser-official/build/custom/phaser-arcade-physics.js',
            
            './.tmp/game.js'
        ])
        .pipe(sourcemaps.init())
        .pipe(concat('game.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths['product']));
});
