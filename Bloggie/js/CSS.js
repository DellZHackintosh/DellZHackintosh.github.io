'use strict';
var css = document.createElement('link');
css.href = './Bloggie/skin/CSS/markdown.css';
css.media = 'all';
css.rel = 'stylesheet';
document.head.appendChild(css);
css = document.createElement('link');
css.href = './Bloggie/skin/CSS/blog.css';
css.media = 'all';
css.rel = 'stylesheet';
document.head.appendChild(css);
css = document.createElement('link');
css.href = './Bloggie/js/Highlight/styles/github.min.css';
css.rel = 'stylesheet';
document.head.appendChild(css);
css = document.createElement('link');
css.href = './Bloggie/js/Highlight/styles/github-dark.min.css';
css.media = '(prefers-color-scheme: dark)';
css.rel = 'stylesheet';
document.head.appendChild(css);
var css = document.createElement('link');
css.href = 'https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.css';
css.media = 'all';
css.rel = 'stylesheet';
document.head.appendChild(css);