#!/usr/bin/env node
'use strict'

const minimist = require('minimist');
const path = require('path');

const defaultOpts = [{
    name: "wport",
    value: 8080,
    description: "web server port"
}, {
    name: "rport",
    value: 8081,
    description: "web-socket page refresh port",
}, {
    name: "out",
    value: ".dist",
    description: "output directory (relative to DIR if applicable"
}];

function getDefaultArgs(defaultOpts) {
    let args = {};
    for(let i = 0; i < defaultOpts.length; i++) {
        args[defaultOpts[i].name] = defaultOpts[i].value;
    }
    return args;
}

function help() {
    let help = 'Usage: ./src/index.js DIR\nOptions:\n';

    for(let i = 0; i < defaultOpts.length; i++) {
        help += '\t--' + defaultOpts[i].name + ' [default: ' + defaultOpts[i].value + ']\t\t' + defaultOpts[i].description + '\n';
    }

    console.log(help);
}

function create(argv) {
    const opts = minimist(argv, { default: getDefaultArgs(defaultOpts) });

    if(opts._.length != 1) {
        return help();
    }

    // Normalize paths
    opts.in = opts._[0];
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
