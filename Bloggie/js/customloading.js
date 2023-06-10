'use strict';
bloggie.custom.command.customLoadingAnimation = () => {
   var node = document.createElement('div');
   node.id = 'DaleZ-custom-Loading';
   node.innerHTML = '<svg viewBox="5.963 5.963 21.940666 21.940666" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"><g id="layer1"><circle cx="16.933332" cy="16.933332" r="9.4701843" stroke="#0067c0" stroke-width="3" fill="none" stroke-dashoffset="" stroke-linecap="round" id="circlebar" stroke-dasharray="1 100"> <animateTransform attributeName="transform" attributeType="AUTO" type="rotate" values="0 16.933332 16.933332;450 16.933332 16.933332;1080 16.933332 16.933332" dur="2s" repeatCount="indefinite" /> <animate attributeName="stroke-dasharray" attributeType="AUTO" type="rotate" values="0.01 100;30 100;0.01 100" dur="2s" repeatCount="indefinite" /></circle></g></svg>';
   var h2 = document.createElement('h2');
   h2.innerText = '滚回功率，坐和放宽';
   node.appendChild(h2);
   return node;
};