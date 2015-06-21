var gulp = require('gulp');
var livereload = require('gulp-livereload');
var jslint = require('gulp-jslint');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');
var gutil = require('gulp-util');
var combine = require('stream-combiner2');

function errorHandle(err) {
	var colors = gutil.colors;
	console.log('\n');
	gutil.log(colors.red('Error'));
	gutil.log('fileName : ' + colors.red(err.fileName));
	gutil.log('lineNumber : ' + colors.red(err.lineNumber));
	gutil.log('message : ' + colors.red(err.message));
	gutil.log('plugin : ' + colors.red(err.plugin));
	console.log('\n');
}

gulp.task('uglifyAngular', function () {
	var conbined = combine.obj([
		gulp.src('front-end/api/**.js'),
		uglify(),
		gulp.dest('front-end/dist/api/')
	]);

	conbined.on('error',errorHandle);
});

gulp.task('uglifyJS', function () {
	var conbined = combine.obj([
		gulp.src('front-end/assets/js/**.js'),
		uglify(),
		gulp.dest('front-end/dist/assets/js')
	]);
	conbined.on('error',errorHandle);
});

gulp.task('lessCSS', function () {
	var conbined = combine.obj([
		gulp.src('front-end/assets/styles/**.less'),
		less(),
		minify(),
		gulp.dest('front-end/dist/assets/styles')
	]);
	conbined.on('error',errorHandle);
});

gulp.task('watch',function () {
	livereload.listen();

	gulp.watch('front-end/**').on('change',function (file) {
		livereload.changed(file);
	});

	gulp.watch('index.html').on('change', function (file) {
		livereload.changed(file);
	});
});

gulp.task('default', ['uglifyJS','lessCSS','uglifyAngular','watch'],function () {
	gulp.watch('front-end/assets/js/**',['uglifyJS']);
	gulp.watch('front-end/assets/styles/**.less',['lessCSS']);
	gulp.watch('front-end/api/**',['uglifyAngular']);
});