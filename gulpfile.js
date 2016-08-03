var del = require('del');
var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var sequence = require('gulp-sequence');
var webpackStream = require('webpack-stream');

tasks = {
  cleanAll: function(){
    return del([
      'contacts/build',
      '!build/.git'
    ]);
  },
  copyControllers: function(){
    gulp.src('./controllers/**/*')
      .pipe(gulp.dest('../build/controllers'))
  },
  copyDb: function(){
    gulp.src('./db/**/*')
      .pipe(gulp.dest('../build/db'))
  },
  copyModels: function(){
    gulp.src('./models/**/*')
      .pipe(gulp.dest('../build/models'))
  },
  copyPublic: function(){
    gulp.src('./public/**/*')
      .pipe(gulp.dest('../build/public'))
  },
  jshint: function(){
    return gulp.src('./public/js/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
  }
}

gulp.task('copyControllers', tasks.copyControllers);
gulp.task('copyDb', tasks.copyDb);
gulp.task('copyModels', tasks.copyModels);
gulp.task('copyPublic', tasks.copyPublic);

gulp.task('copyAll', function(cb){sequence('copyControllers', 'copyDb', 'copyModels', 'copyPublic', cb); });
