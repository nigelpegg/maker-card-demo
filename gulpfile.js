var gulp = require('gulp');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var notifier = require('node-notifier');

var path = {
    HTML: 'src/index.html',
    MINIFIED_OUT: 'build.min.js',
    OUT: 'build.js',
    DEST: 'dist',
    DEST_BUILD: 'dist/build',
    DEST_SRC: 'dist/src',
    ENTRY_POINT: './src/js/main.js',
    STYLES: './src/stylesheets/**/*.scss'

};

var failed = false;
var failTimeout;

function checkSuccess()
{
    failTimeout = setTimeout(function()
    {
        // the fact we made it to the timeout means no error was thrown this build
        if (failed) {
            failed = false;
            notifier.notify({
                'title': 'Build Fixed',
                'message': "Good job!",
                wait: false
            });
        }
    }, 500);
}

function notifyError(p_err)
{
    console.log(p_err.message);
    notifier.notify({
        'title': 'Build Error',
        'message': p_err.message,
        wait: false
    });
    clearTimeout(failTimeout);
    failed = true;
}

gulp.task('copy', function(){
    gulp.src(path.HTML)
        .pipe(gulp.dest(path.DEST));
});


gulp.task('watch', function() {
    gulp.watch(path.HTML, ['copy']);

    var watcher  = watchify(
        browserify({
            entries: [path.ENTRY_POINT],
            transform: [babelify],
            debug: true,
            cache: {}, packageCache: {}, fullPaths: true
        })
    );

    return watcher.on('update', function () {
        watcher
            .bundle()
            .on('error', notifyError)
            .pipe(source(path.OUT))
            .pipe(gulp.dest(path.DEST_SRC));
        console.log('Updated');
        checkSuccess();
    })
        .bundle()
        .on('error', notifyError)
        .pipe(source(path.OUT))
        .pipe(gulp.dest(path.DEST_SRC));
});

gulp.task('build', function(){
    browserify({
        entries: [path.ENTRY_POINT],
        transform: [reactify]
    })
        .bundle()
        .on('error', notifyError)
        .pipe(source(path.MINIFIED_OUT))
        .pipe(streamify(uglify(path.MINIFIED_OUT)))
        .pipe(gulp.dest(path.DEST_BUILD));
});


gulp.task('replaceHTML', function(){
    gulp.src(path.HTML)
        .pipe(htmlreplace({
            'js': 'build/' + path.MINIFIED_OUT
        }))
        .pipe(gulp.dest(path.DEST));
});

gulp.task('compile-scss', function() {
    gulp.src(path.STYLES)
        .pipe(sass({ indentedSyntax: false, errLogToConsole: true }))
        .on('error', notifyError)
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(path.DEST_SRC));
    checkSuccess();
});

gulp.task('watch-scss', function() {
    gulp.watch(path.STYLES, ['compile-scss']);
});

gulp.task('production', ['replaceHTML', 'build']);

gulp.task('default', ['watch', 'watch-scss']);
