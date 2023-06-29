var icon = document.createElement('link');
icon.href = './Bloggie/skin/Res/icon.svg';
icon.rel = 'icon';
icon.sizes = 'any';
icon.type = 'image/svg+xml';
document.head.appendChild(icon);
icon = document.createElement('link');
icon.href = './Bloggie/skin/Res/icon.ico';
icon.rel = 'icon';
icon.sizes = '256x256';
document.head.appendChild(icon);
var tc = document.createElement('meta');
tc.name = 'theme-color';
tc.media = '(prefers-color-scheme: light)';
tc.content = '#f3f3f3';
document.head.appendChild(tc);
tc = document.createElement('meta');
tc.name = 'theme-color';
tc.media = '(prefers-color-scheme: dark)';
tc.content = '202020';
document.head.appendChild(tc);

if(/Windows/i.test(navigator.userAgent)){
    var mf = document.createElement('link');
    mf.rel = 'manifest';
    mf.href = './Bloggie/skin/Res/PWA/Windows-manifest.json';
    document.head.appendChild(mf);
} else if(/(iPhone|iPad|iPod|iOS|Mac)/i.test(navigator.userAgent)){
    var mf = document.createElement('link');
    mf.rel = 'manifest';
    mf.href = './Bloggie/skin/Res/PWA/Apple-manifest.json';
    document.head.appendChild(mf);
    var meta = document.createElement('meta');
    meta.name = 'application-name';
    meta.content = 'DaleZ 的 Blog';
    document.head.appendChild(meta);
    meta = document.createElement('meta');
    meta.name = 'apple-mobile-web-app-capable';
    meta.content = 'yes';
    document.head.appendChild(meta);
    meta = document.createElement('meta');
    meta.name = 'apple-mobile-web-app-status-bar-style';
    meta.content = 'black';
    document.head.appendChild(meta);
    var link = document.createElement('link');
    link.rel = 'apple-touch-icon-precomposed';
    link.href = './Bloggie/skin/Res/PWA/iOS/icon.png';
    document.head.appendChild(link);
} else {
    var mf = document.createElement('link');
    mf.rel = 'manifest';
    mf.href = './Bloggie/skin/Res/PWA/Other-manifest.json';
    document.head.appendChild(mf);
}