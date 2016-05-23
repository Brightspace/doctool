#!/usr/bin/env node
'use strict';
const minimist = require('minimist');
const run = require('./index');
const Table = require('cli-table');

const defaultOpts = [{
    name: "interactive",
    description: "runs a web server and automatically re-renders and reloads browsers"
}, {
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
    description: "output directory (relative to DIR if applicable)"
}, {
    name: "verbose",
    description: "verbose output"
}, {
    name: "notify",
    description: "send notifications of changes to the OS"
}];

function getDefaultArgs(defaultOpts) {
    let args = {};
    for(let i = 0; i < defaultOpts.length; i++) {
        args[defaultOpts[i].name] = defaultOpts[i].value;
    }
    return args;
}

function help() {
    const help = 'Usage: ./src/index.js DIR\nOptions:\n';
    const table = new Table({
        chars: {
            'top': '' , 'top-mid': '' , 'top-left': '' , 'top-right': '',
            'bottom': '' , 'bottom-mid': '' , 'bottom-left': '' , 'bottom-right': '',
            'left': '' , 'left-mid': '' , 'mid': '' , 'mid-mid': '',
            'right': '' , 'right-mid': '' , 'middle': ' ',
        },
        style: { 'padding-left': 0, 'padding-right': 0 },
        head: ['arg', 'default', 'description'],
        colWidths: [ 15, 10, 50 ]
    });

    for(let i = 0; i < defaultOpts.length; i++) {
        const opt = defaultOpts[i];
        table.push([(opt.flag ? '-' : '--') + opt.name, opt.value || '-', opt.description]);
    }

    console.log(help + table);
}

function main() {
    if(require.main !== module) {
        const msg = 'This is a cli tool, do not require() it';
        console.error(msg);
        throw { message: msg };
    }

    const argv = process.argv.slice(2);

    const opts = minimist(argv, {
        default: getDefaultArgs(defaultOpts)
    });

    if(opts._.length != 1) {
        return help();
    }

    opts.in = opts._[0];
    delete opts['_'];

    run(opts);
}

main();
