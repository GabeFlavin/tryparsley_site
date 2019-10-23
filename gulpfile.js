var package = require('./package.json'),
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    jshint = require('gulp-jshint'),
    stripDebug = require('strip-debug'),
    runSequence = require('run-sequence'),
    uglify = require('gulp-uglify');

var browserSync = require('browser-sync').create();

var csso = require('gulp-csso');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var $vendor_js = [
  'app/js/lib/jquery-1.9.0.min.js',
  'app/js/lib/jquery.easing.1.3.js',
  'app/js/lib/gsap/jquery.gsap.min.js',
  'app/js/lib/gsap/TweenMax.min.js',
  'app/js/lib/gsap/plugins/ScrollToPlugin.js',   
  'app/js/lib/skrollr.min.js'
];

var $script_js = [
    'app/js/lightbox.js',
    'app/js/paralax.js',
    'app/js/inputs.js',
    'app/js/main.js'
];

var $css_dir = 'dist/css';
var $js_dir = 'dist/js';

gulp.task('styles', function () {
  return gulp
    .src('app/scss/app.scss')
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['> 1%', 'last 10 versions'],
      cascade: false
    }))
    .pipe(csso())
    .pipe(rename('all_v1.css'))
    .pipe(gulp.dest($css_dir));
});

gulp.task('scripts', function () {
  return gulp.src($script_js)
    .pipe(jshint())
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(gulp.dest($js_dir));
});

gulp.task('scripts-production', function () {
  return gulp.src($script_js)
    .pipe(jshint())
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('remove-logging', function () {
  return gulp.src('app/**/*.js')
    .pipe(stripDebug())
    .pipe(gulp.dest('app'));
});

gulp.task('watch', function() {
gulp.watch('app/scss/**/*.scss', ['styles']);
  gulp.watch('app/js/**/*.js', ['scripts']);
});

gulp.task('default', ['styles', 'scripts']);

gulp.task('production', function() {
  runSequence(
    ['styles',  'scripts-production']
  );
});

gulp.task('vendor', function() {
  return gulp.src($vendor_js)
      .pipe(concat('vendor.js'))
      .pipe(gulp.dest($js_dir))
      .pipe(rename('vendor.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest($js_dir));
});