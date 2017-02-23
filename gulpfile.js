const gulp = require('gulp');
const webpack = require('gulp-webpack');
const webpackConfig = require('./webpack.config.js');
const nodemon = require('gulp-nodemon');
const babel = require('gulp-babel');
const Cache = require('gulp-file-cache');
const babelConfig = require('./babel.config.js');
const watch = require('gulp-watch')
var cache = new Cache();



gulp.task('compile', function () {
  console.log('compiling');
  var stream = gulp.src('./src/**/*.js')
    .pipe(cache.filter()) // remember files
    .pipe(babel(babelConfig)) // compile new ones
    .pipe(cache.cache()) // cache them
    .pipe(gulp.dest('./build')) // write them
  return stream // important for gulp-nodemon to wait for completion
});

gulp.task('build-client', function() {
  return gulp.src('./build/client/**/*.js')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('dist'));
});


const tasks = ['compile', 'build-client'];
gulp.task('deamon', function () {
  return stream = nodemon({
       script: 'build/server/index.js' // run ES5 code
     , watch: 'src' // watch ES2015 code
   })
    .on('start', tasks)
    .on('restart', tasks);
});
