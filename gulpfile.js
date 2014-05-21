var gulp = require('gulp');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var map = require('map-stream');

gulp.task('lint', function() {
  gulp.src('./src/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(map(function (test, cb) {
      cb(!test.jshint.success, test);
    }));
});

gulp.task('dist', function() {
  gulp.src('./src/*.js')
    .pipe(uglify({preserveComments:'some'}))
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['lint', 'dist']);
