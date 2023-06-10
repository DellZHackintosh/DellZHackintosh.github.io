'use strict';
var bar = document.createElement('div');
bar.id = 'DaleZ-custom-titlebar';
var p = document.createElement('p');
p.appendChild(document.createTextNode('DaleZ 的 Blog'));
bar.appendChild(p);
document.getElementById('bloggie').insertBefore(bar, document.getElementById('bloggie').firstChild);