'use strict';

const layout = require('gulp-layout');
const kramed = require('kramed');

function renderHeading(text, level) {
    const h = 'h' + level;

    return `<${h} class="vui-heading-${level}">${text}</${h}>`
};

function renderLink(href, title, text) {
    // TODO what is title?
    return `<a href=${href} is="vui-link">${text}</a>`;
}

module.exports = {
    layout: opts => layout({
        engine: 'mustache',
        layout: __dirname + '/templates/layout.mustache',
    }),
    renderer: opts => {
        const renderer = new kramed.Renderer();
        renderer.heading = renderHeading;
        renderer.link = renderLink;
        return renderer;
    }
};
