const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
/*
 -- TOP LEVEL FUNCTIONS --
  gulp.task - Define tasks
  gulp.src - point to files to use
  gulp.dest - point to folder to output
  gulp.watch - watch files and folder for changes
*/


// Logs Message
gulp.task('message', function(){
    return console.log('Gulp is running...');
});

// Copy All html files
gulp.task('copyHtml', function(){
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
});

// Optimize Images
gulp.task('imageMin', function(){
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
});

// Minify js
gulp.task('minify', function(){
    gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

// Compile Sass
gulp.task('sass', function(){
        gulp.src('src/sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'));
});

// Scripts
gulp.task('scripts', function(){
    gulp.src('src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('default', gulp.series(gulp.parallel('message', 'copyHtml', 'imageMin', 'scripts', 'sass')), function(){
    console.log('Gulp is running');
});

gulp.task('watch', function(){
    gulp.watch('src/js/*.js', gulp.parallel('scripts'), function(){ console.log('watch js')});
    gulp.watch('src/images/*', gulp.parallel('imageMin'), function(){ console.log('watch images')});
    gulp.watch('src/sass/*.scss', gulp.parallel('sass'), function(){ console.log('watch sass')});
    gulp.watch('src/*.html', gulp.parallel('copyHtml'), function(){ console.log('watch htmls')});
});