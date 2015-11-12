'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var rename = require('gulp-rename');
var cssmin = require('gulp-cssmin');
var autoprefixer = require('gulp-autoprefixer');

module.exports = function (done) {
  gulp.src('src/*.js')
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist'))
    .on('end', function () {
      gulp.src('src/*.css')
        .pipe(autoprefixer())
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist'))
        .on('end', done);
    });
};
