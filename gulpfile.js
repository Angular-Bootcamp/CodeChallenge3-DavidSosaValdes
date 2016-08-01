var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');

// Less Task
gulp.task('less', function () {
  return gulp.src('app/less/main.less')
    .pipe(less({
      compress: true,
    }))
    .pipe(concat('appPokedex.min.css'))
    .pipe(gulp.dest('app/css'));
});

// Bower Tasks
gulp.task('bower-post-install', function(){
  	// Less
  	gulp.src('bower_components/bootstrap/less/**').pipe(gulp.dest('app/less/bootstrap'));
    gulp.src('bower_components/font-awesome/less/**').pipe(gulp.dest('app/less/font-awesome'));
  	// Fonts
  	gulp.src([
  		'bower_components/bootstrap/fonts/**',
  		'bower_components/font-awesome/fonts/**'
  	])
    .pipe(gulp.dest('app/fonts'));
    // Javascripts
    gulp.src([
    	'bower_components/bootstrap/dist/js/bootstrap.min.js',
    	'bower_components/angular/angular.min.js',
    	'bower_components/angular-mocks/angular-mocks.js',
    	'bower_components/jquery/dist/jquery.min.js',
      'bower_components/angular-route/angular-route.min.js',
      //'bower_components/angular-animate/angular-animate.min.js'
    ])
    .pipe(gulp.dest('app/js'));
});


gulp.task('default', ['bower-post-install'], function() {
  // place code for your default task here
  gulp.start('less');
});