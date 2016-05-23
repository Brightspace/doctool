#!/usr/bin/env node
'use strict'

const minimist = require('minimist');
const path = require('path');

const defaultArgs = {
    wport: 8080,
    rport: 8081,
    out: '.dist'
};

function help() {
    let help = 'Usage: ./src/index.js --in DIR [';

    for(let x in defaultArgs) {
        help += ' --' + x + ' ' + defaultArgs[x];
    }

    console.log(help + ' ]');
}

function create(argv) {
    const opts = minimist(argv, { default: defaultArgs });

    if(!opts.in) {
        return help();
    }

    // Normalize paths
    opts.in = path.resolve(opts.in);
    opts.out = opts.in + '/' + opts.out;
    delete opts['_'];

    const build = (require('./build'))(opts);

    build.start('watch');
    build.start('server');
}

if (require.main === module) {
    create(process.argv.slice(2));
} else {
    module.exports = create;
}
