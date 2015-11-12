'use strict';

module.exports = function (config) {
  config.set({
    basePath: '.',
    frameworks: ['jasmine'],
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-coverage'
    ],
    preprocessors: {
      'src/*.js': 'coverage'
    },
    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/jquery/dist/jquery.min.js',
      'bower_components/gsap/src/minified/TweenMax.min.js',
      'src/*.js',
      'test/*.spec.js'
    ],
    exclude: [],
    reporters: ['progress', 'coverage'],
    coverageReporter: { type : 'lcov' },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true
  });
};
