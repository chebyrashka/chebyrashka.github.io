var gulp        = require('gulp');
    uglify      = require('gulp-uglify');
    less        = require('gulp-less');
    sourcemaps  = require('gulp-sourcemaps');
    concat      = require('gulp-concat');
    watch       = require('gulp-watch');
    rename      = require("gulp-rename");
    minifyCss   = require('gulp-minify-css');

gulp.task('less',function(){
    return gulp.src(['_less/mixins.less','_less/main.less'])
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(concat('styles.css'))
        .pipe(minifyCss())
        .pipe(rename('styles.min.css'))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('css'));
})



gulp.task('concatscripts', function () {
   return gulp.src([
        'js/jquery.placeholder.js',
        'js/jquery.columnizer.js',
        'js/functions.js'
        ])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('js'))
});

gulp.task('minscripts', ['concatscripts'], function () {
   return gulp.src('js/app.js')
        .pipe(uglify())
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest('js'))
});


gulp.task('watch', function () {
   gulp.watch('_less/*', ['less']);
});


gulp.task('build', ['minscripts','less']);

gulp.task('default', ['build']);