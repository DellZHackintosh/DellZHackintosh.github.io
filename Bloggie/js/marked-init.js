'use strict';

marked.use(markedGfmHeadingId.gfmHeadingId(), markedMangle.mangle(), {
    renderer: {
        image(href, title, text) {
            return title ? `<a data-src="${href}" data-fancybox="Article-Picture" data-caption="${title}"><img src="${href}" title="${title}" alt="${text}"/></a>` : `<a href="${href}" data-fancybox="Article-Picture"><img src="${href}" alt="${text}"/></a>`;
        }
    },
    pedantic: false,
    gfm: true,
    breaks: true,
    sanitize: false,
    smartLists: false,
    smartypants: false,
    xhtml: false
},markedHighlight.markedHighlight({
    highlight(code, lang) {
        return lang ? hljs.highlight(code, lang).value : hljs.highlightAuto(code).value;
    }
}));