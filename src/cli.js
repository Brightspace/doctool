#!/usr/bin/env node
'use strict';
const fs = require('fs');
const minimist = require('minimist');
const run = require('./index');
const Table = require('cli-table');

const defaultOpts = [{
    name: "interactive",
    description: "runs a web server and automatically re-renders and reloads browsers"
}, {
    name: "browser",
    description: "open a browser",
    value: true
}, {
    name: "wport",
    value: 8080,
    description: "web server port"
}, {
    name: "rport",
    value: 8081,
    description: "web-socket page refresh port",
}, {
    name: "verbose",
    description: "verbose output"
}, {
    name: "notify",
    description: "send notifications of changes to the OS"
}, {
    name: "help",
    description: "this screen"
}];

function getDefaultArgs(defaultOpts) {
    let args = {};
    for(let i = 0; i < defaultOpts.length; i++) {
        args[defaultOpts[i].name] = defaultOpts[i].value;
    }
    return args;
}

function plainTable(head) {
    const table = new Table({
        chars: {
            'top': '' , 'top-mid': '' , 'top-left': '' , 'top-right': '',
            'bottom': '' , 'bottom-mid': '' , 'bottom-left': '' , 'bottom-right': '',
            'left': '' , 'left-mid': '' , 'mid': '' , 'mid-mid': '',
            'right': '' , 'right-mid': '' , 'middle': ' ',
        },
        style: { 'padding-left': 0, 'padding-right': 0 },
        head: head,
        colWidths: [ 15, 10, 70 ]
    });

    return table;
}

function help(progName) {
    const help = `Usage: ${progName} [inputDir] [outputDir] OPTIONS\n\n`;

    const args = plainTable(['Arguments', 'Default', 'Description']);
    args.push(['inputDir', '-', 'input files directory'])
    args.push(['outputDir', '.dist', 'output directory']);

    const opts = plainTable(['Options', 'Default', 'Description']);
    for(let i = 0; i < defaultOpts.length; i++) {
        const opt = defaultOpts[i];
        opts.push([(opt.flag ? '-' : '--') + opt.name, opt.value || '-', opt.description]);
    }

    console.log(help + args + '\n\n' + opts);
}

function main() {
    if(require.main !== module) {
        const msg = 'This is a cli tool, do not require() it';
        console.error(msg);
        throw { message: msg };
    }

    const argv = process.argv.slice(2);
    const progName = process.argv[1];

    const opts = minimist(argv, {
        boolean: [ 'interactive', 'verbose', 'notify', 'help', 'browser' ],
        default: getDefaultArgs(defaultOpts)
    });

    if(opts._.length === 0) {
        return help(progName);
    }

    if(opts._.length === 1) {
        opts._.push('.dist');
    }

    if(opts._.length > 2 || opts.help || opts.h) {
        return help(progName);
    }

    opts.in = opts._[0];
    opts.out = opts._[1];
    delete opts['_'];

    // Crash if the input directory doesn't exist
    fs.accessSync(opts.in, fs.F_OK)

    run(opts);
}

main();
