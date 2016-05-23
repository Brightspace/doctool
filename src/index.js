'use strict'

const path = require('path');

module.exports = opts => {
    // Normalize paths
    opts.in = path.resolve(opts.in);
    opts.out = opts.in + '/' + opts.out;

    const build = (require('./build'))(opts);
    const server = (require('./server'))(opts);

    if(opts.interactive) {
        build.start('watch');
        server.start('server');
    } else {
        throw 'not implemented: use --interactive for now';
    }
}
