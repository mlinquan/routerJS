var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

gulp.task('default', function() {
    gulp.src('src/routerJS.js')
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write('./map', {includeContent: false, sourceRoot: '/src'}))
    .pipe(gulp.dest('./'));
});