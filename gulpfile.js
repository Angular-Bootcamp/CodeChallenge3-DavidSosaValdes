var gulp = require('gulp');

// Bower Tasks
gulp.task('bower-post-install',function(){
  	// Less
  	gulp.src('bower_components/bootstrap/less/**').pipe(gulp.dest('app/less/bootstrap'));
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
    	'bower_components/jquery/dist/jquery.min.js'
    ])
    .pipe(gulp.dest('app/js'));
});


gulp.task('default', function() {
  // place code for your default task here
  gulp.start('bower-post-install');
});