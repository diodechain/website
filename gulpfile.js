var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var cp          = require('child_process');
var argv	= require('yargs').argv;
var jekyll      = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
var drafts	= (argv.drafts === undefined) ? false : true;
var messages    = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    var args = ['build', '--config', '_config.yml,_local.yml'];
    if (drafts) args = ['build', '--drafts'];
    return cp.spawn( jekyll , args, {stdio: 'inherit'})
        .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['sass', 'jekyll-build'], function() {
    browserSync({
        server: {
            port: 3000,
            baseDir: '_site'
        }
    });
});

/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('sass', function () {
    return gulp.src('_scss/*.scss')
        .pipe(sass({
          outputStyle: 'expanded',
          // sourceComments: 'map',
          includePaths: ['scss'],
          onError: browserSync.notify('Error in sass')
        }))
        .on('error', sass.logError)
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('_site/css'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('css'));
});

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch(['_scss/*.scss', '_scss/*/*.scss'], ['sass']);
    gulp.watch(['_config.yml', '*.html', '_includes/svgs/*', 'newsletter/*.html', 'download/*.html', 'status/*', 'prenet/*', 'prenet/*/*', 'testnet/*', 'testnet/*/*', '_includes/*.html', '_includes/*/*.html', '_layouts/*.html', '_layouts/*/*.html', '_docs/*', '_posts/*', '_drafts/*', 'js/*.js', 'images/*', 'blog/*'], ['jekyll-rebuild']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);
