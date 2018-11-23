const gulp = require('gulp');
const sass = require('gulp-sass');
const useref = require('gulp-useref');
const uglify = require('gulp-uglify-es').default;
const gulpIf = require('gulp-if');
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const del = require('del');
const runSequence = require('run-sequence');
const nodemon = require('nodemon');
const babel = require('gulp-babel');
const eslint = require('eslint');
const csslint = require('gulp-csslint');

// Missing tasks
/* Eslint and css lint*/

// Cleans dist folder
gulp.task('clean:dist', function() {
  return del.sync('dist');
});

/**
 * PROD TASKS
 */

// Compiles SCSS using **/* globbing pattern for matching every file
gulp.task('sass', function(){
  return gulp.src('./public/stylesheets/**/*.scss')
    .pipe(sass()) // Using gulp-sass
    .pipe(gulp.dest('./public/stylesheets/'))
});

// Compress images but using cache
gulp.task('images', function(){
  return gulp.src('./public/assets/**/*.+(png|jpg|gif|svg)')
    .pipe(cache(imagemin()))
    .pipe(gulp.dest('dist/assets'))
});

// Compile sources in one file and minify js and css
gulp.task('useref', function(){
  return gulp.src('views/*.html')
    .pipe(useref())
    .pipe(gulpIf('**/*.js',babel()))
    .pipe(gulpIf('**/*.js', uglify()))
    .pipe(gulpIf('**/*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

// Builds project files
gulp.task('build', function(done) {
  runSequence('clean:dist',['sass','useref','images'], done);
});

/**
 * DEV TASKS
 */


// Builds project files
gulp.task('build-dev', function(done) {
  runSequence('clean:dist',['sass','images'], done);
});

// Development server task
gulp.task('serve', function(done) {
  runSequence('build-dev',['nodemon', 'watch'], done);
});

// Watch task to compile changes in SASS files
gulp.task('watch', function(){
  return gulp.watch('./public/stylesheets/**/*.scss', ['sass']);
});

// Monitors changes in application and automatically restarts the server
gulp.task('nodemon', function () {
  return nodemon({
    script: './bin/www',
    ext: 'js,html'
  })
    .on('restart', function(){
    console.log('Server restarted');
  })
});

