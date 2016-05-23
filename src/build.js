'use strict';
const kramdown = require('gulp-kramdown');
const identity = require('gulp-identity');
const vui = require('./vui');

module.exports = opts => {
    const gulp = require('gulp');
    const notify = opts.notify ? require('gulp-notify') : identity;
    const watch = opts.interactive ? require('gulp-watch') : identity;

    const paths = {
        in: {
            all: opts.in + '/**/*',
            md: opts.in + '/**/*.md',
        },
        out: {
            all: opts.out + '/**/*',
        }
    };

    const dest = (action, prefix) => {
        prefix = prefix || '';
        let ret = gulp.dest(opts.out + prefix, { cwd: opts.in })
        if(opts.notify) {
            ret.pipe(notify(action + ': <%= file.relative %>'));
        }
        return ret;
    };

    const base = {
        base: opts.in + '/'
    };

    gulp.task('markdown', () => {
        const md = [
            paths.in.md,
            '!' + paths.out.all,
        ];

        gulp.src(md)
            .pipe(watch(md, base))
            .pipe(kramdown({ renderer: vui.renderer(opts) }))
            .pipe(vui.layout(opts))
            .pipe(dest('Compiled'));
    });

    gulp.task('lib', () => {
        gulp.src('bower_components/**/*')
            .pipe(dest('Library copied', '/lib/'));
    });

    gulp.task('copy', () => {
        const nonMd = [
            paths.in.all,
            '!' + paths.out.all,
            '!/**/*.md',
            '!/**/*.swp',
        ];

        gulp.src(nonMd)
            .pipe(watch(nonMd, base))
            .pipe(dest('Copied'));
    });

    gulp.task('web', () => {
        const files = './src/web/**/*';

        gulp.src(files)
            .pipe(watch(files, { base: './src/web/' }))
            .pipe(dest('Web files'));
    });

    gulp.task('build', () => {
        gulp.start('lib');
        gulp.start('web');
        gulp.start('copy');
        gulp.start('markdown');

        if(opts.interactive) {
            gulp.watch(__dirname + '/templates/layout.mustache', ['markdown']);
        }
    });

    return gulp;
};
