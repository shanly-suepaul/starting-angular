var gulp = require('gulp');
var rimraf = require('rimraf');
var fs = require('fs');
var url = require('url');

var es = require('event-stream');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var processhtml = require('gulp-processhtml');
var serve = require('gulp-serve');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');
var connectLivereload = require('connect-livereload');
var proxy = require('proxy-middleware');

function getCompiledStylesheetAsset(ignoreErrors) {
    return gulp.src('src/**/*.less')
        .pipe(less())
        .pipe(concat('app.css'));
}

gulp.task('serve', function () {
    var previewTmpDir = '.tmp/dev-preview';

    livereload.listen({
        host: 'localhost'
    });

    es.merge(
        // hint JS changes
        watch('src/**/*.js', { base: '' })
            .pipe(jshint())
            .pipe(jshint.reporter('default')), // @todo growl or make a sound

        // simple notification for static and built assets
        watch([
            'src/**/*.{html,json}',
            'assets/**/*.{png,jpg,jpeg,gif,webp,svg}'
        ]),

        // rebuild entire compiled stylesheet
        watch('src/**/*.less').pipe(es.map(function (e, cb) {
            getCompiledStylesheetAsset(true) // ignore errors
                .pipe(rename({ dirname: 'assets' }))
                .pipe(gulp.dest(previewTmpDir))
                .on('data', cb.bind(null, null));
        }))
    ).pipe(livereload());

    rimraf(previewTmpDir, function () {
        var tempFiles = es.concat(
            getCompiledStylesheetAsset()
        ).pipe(rename(function (path) {
            path.dirname = 'assets/' + path.dirname;
        })).pipe(gulp.dest(previewTmpDir));

        tempFiles.on('end', function () {
            // listen on multiple ports
            [ 9000, 9001 ].forEach(function (port) {
                serve({
                    port: port,

                    middlewares: [
                        connectLivereload()
                    ],

                    root: [
                        __dirname + '/' + previewTmpDir,
                        __dirname
                    ]
                })();
            });
        });
    });
});
