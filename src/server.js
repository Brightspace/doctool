'use strict';
const fs = require('fs');
const server = require('gulp-server-livereload');

module.exports = opts => {
    const gulp = require('gulp');

    gulp.task('server', () => {
        // do this sync so that the dir is garunteed to be there for the
        // gulp.src that follows
        try {
            fs.mkdirSync(opts.out);
        } catch(e) {}

        gulp.src(opts.out + '/')
            .pipe(server({
                host: '0.0.0.0',
                port: opts.wport,
                livereload: {
                    enable: true,
                    port: opts.rport
                },
                directoryListing: {
                    enable: true,
                    path: opts.out
                },
                open: true,
                log: opts.verbose ? 'debug' : null
            }));
    });

    return gulp;
};
