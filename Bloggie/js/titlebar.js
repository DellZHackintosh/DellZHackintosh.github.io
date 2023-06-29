(()=> {
  'use strict';
  var bar = document.createElement('div');
  bar.id = 'DaleZ-custom-titlebar';
  var button = document.createElement('button');
  button.id = 'Nav-Controller';
  button.innerHTML = '';
  button.onclick = bloggie.custom.command.NavController;
  var p = document.createElement('p');
  p.id = 'DaleZ-custom-title';
  p.appendChild(document.createTextNode('DaleZ 的 Blog'));
  bar.appendChild(button);
  bar.appendChild(p);
  document.getElementById('bloggie').insertBefore(bar, document.getElementById('bloggie').firstChild);
})();