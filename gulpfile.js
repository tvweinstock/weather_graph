var gulp = require('gulp'),
    connect = require('gulp-connect'),
    traceur = require('gulp-traceur'),
    sass = require('gulp-ruby-sass');


gulp.task('connect', function(){
    connect.server({
        livereload: true, 
        port: 8005
    });
});

gulp.task('reload', function(){
    gulp.src('dist/**/*.*')
    .pipe(connect.reload());    
});

gulp.task('html', function () {
  gulp.src('*.html')
    .pipe(connect.reload());
});


gulp.task('sass', function() {
    return sass('sass/main.scss')
        .pipe(gulp.dest('dist/css/'));
});

gulp.task('traceur', function(){
    return gulp.src('scripts/app.js')
        .pipe(traceur())
        .pipe(gulp.dest('dist/scripts/'));
});

gulp.task('watch', function(){  
    gulp.watch(['./sass/*.scss'], ['sass']);
    gulp.watch(['./scripts/*.js'], ['traceur']);
    gulp.watch(['dist/**/*.*'], ['reload']);
    gulp.watch(['*.html'], ['html']);
});

gulp.task('default', ['connect', 'watch', 'sass', 'traceur']);