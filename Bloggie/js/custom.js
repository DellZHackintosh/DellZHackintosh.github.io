'use strict';
bloggie.custom.command.loadcontentbeforearticle = (ctt) => {
    if (typeof(ctt.Comment) != 'undefined') {
        var r = document.createElement('hr');
        var h = document.createElement('header');
        var t = document.createElement('h1');
        var c = document.createTextNode(ctt.Title);
        t.appendChild(c);
        h.appendChild(t);
        h.appendChild(r);
        return h;
    }
};

bloggie.custom.command.loadcontentafterarticle = (ctt) => {
    var cmt = document.createElement('script');
    cmt.setAttribute("src", "https://giscus.app/client.js");
    cmt.setAttribute("data-repo", "DellZHackintosh/DellZHackintosh.github.io");
    cmt.setAttribute("data-repo-id", "R_kgDOG_Qpfg");
    cmt.setAttribute("data-category", "评论 | Comment");
    cmt.setAttribute("data-category-id", "DIC_kwDOG_Qpfs4CWegB");
    cmt.setAttribute("data-mapping", "title");
    cmt.setAttribute("data-strict", "1");
    cmt.setAttribute("data-reactions-enabled", "1");
    cmt.setAttribute("data-emit-metadata", "0");
    cmt.setAttribute("data-input-position", "top");
    cmt.setAttribute("data-theme", "preferred_color_scheme");
    cmt.setAttribute("data-lang", "zh-CN");
    cmt.setAttribute("data-loading", "lazy");
    cmt.setAttribute("crossorigin", "anonymous");
    cmt.setAttribute("async", "async");
    var f = document.createElement('footer');
    if (ctt.Comment) {
        var h = document.createElement('hr');
        var y = new Date().getFullYear();
        var p = document.createElement('p');
        p.appendChild(document.createTextNode(`© 2023-`+y+` DaleZ`));
        f.appendChild(h);
        f.appendChild(p);
        f.innerHTML += `<p>本站文章除其作者特殊声明外，一律采用<a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0许可协议</a>进行授权，进行转载或二次创作时<b>务必以相同协议</b>进行共享，<b>严禁</b>用于商业用途。</p>`;
        f.appendChild(cmt);
    } else {
        var h = document.createElement('hr');
        var y = new Date().getFullYear();
        var p = document.createElement('p');
        p.appendChild(document.createTextNode(`© 2023-`+y+` DaleZ`));
        f.appendChild(h);
        f.appendChild(p);
        f.innerHTML += `<p>本站文章除其作者特殊声明外，一律采用<a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0许可协议</a>进行授权，进行转载或二次创作时<b>务必以相同协议</b>进行共享，<b>严禁</b>用于商业用途。</p>`;
    }
    return (ctt.Title != '设置') ? f : undefined;
};

bloggie.custom.command.Article = (ctt) => {
    var aie = document.createElement('article');
    aie.innerHTML = marked.parse(ctt);
    msemoji.parse(aie,{
        base: 'https://gh.sourcegcdn.com/DellZHackintosh/msemoji/1.1.2/src/',
        ext: '.svg',
        folder: 'Flat'
    });
    var main = document.getElementById('bloggie-main');
    while (main.hasChildNodes()) {
        main.removeChild(main.firstChild);
    };
    main.appendChild(aie);
    Fancybox.bind(`[data-fancybox="Article-Picture"]`, {
        Thumbs: {
            type: "classic"
        }
    });
};

bloggie.custom.command.Navani = (function () {
    'use strict';
    var Navani = {
        initaniended: initaniended,
        Anilight: Anilight,
        setCurrentemt: setCurrentemt
    };

    var Currentemt;

    function setCurrentemt(emt) {
        Currentemt = emt;
    }

    function initaniended() {
        this.id = '';
        this.classList.add('Turn-on-light');
        this.removeEventListener('animationend', bloggie.custom.command.Navani.initaniended);
    };

    function aniEnded() {
        this.classList.replace('from-top', 'Turn-off-light');
        this.classList.replace('from-bottom', 'Turn-off-light');
        this.classList.replace('to-top', 'Turn-on-light');
        this.classList.replace('to-bottom', 'Turn-on-light');
        this.removeEventListener('animationend', aniEnded);
    }

    function Anilight(emt) {
        switch(Currentemt.compareDocumentPosition((this || emt))) {
            case 2:
                //激活的按钮在当前按钮的上面
                (this || emt).addEventListener('animationend', aniEnded);
                Currentemt.addEventListener('animationend', aniEnded);
                (this || emt).classList.remove('Turn-off-light');
                (this || emt).classList.add('to-top');
                Currentemt.classList.remove('Turn-on-light');
                Currentemt.classList.add('from-bottom');
                Currentemt = (this || emt);
                break;
            case 4:
                //激活的按钮在当前按钮的下面
                (this || emt).addEventListener('animationend', aniEnded);
                Currentemt.addEventListener('animationend', aniEnded);
                (this || emt).classList.remove('Turn-off-light');
                (this || emt).classList.add('to-bottom');
                Currentemt.classList.remove('Turn-on-light');
                Currentemt.classList.add('from-top');
                Currentemt = (this || emt);
        }
    };

    return Navani;
}());

bloggie.custom.command.NavMaker = (ctt, name) => {
    var button = document.createElement('button');
    button.addEventListener('click', function (){eval(ctt.action)});
    button.classList.add('DaleZ-custom-Nav');
    var img = document.createElement('img');
    img.src = ctt.icon;
    button.appendChild(img);
    var p = document.createElement('p');
    p.innerHTML = name;
    if ((bloggie.Utilities.urlarg('id') == 'list' && name == '目录') || (bloggie.Utilities.urlarg('id') == 'Settings' && name == '设置') || (name == '主页' && (bloggie.Utilities.urlarg('id') != 'list' && bloggie.Utilities.urlarg('id') != 'Settings'))) {
        button.id = 'Nav-first-item';
        button.addEventListener('animationend', bloggie.custom.command.Navani.initaniended);
        bloggie.custom.command.Navani.setCurrentemt(button);
    };
    button.addEventListener('click', bloggie.custom.command.Navani.Anilight);
    button.appendChild(p);
    return button;
};

bloggie.custom.command.loadSettings = async () => {
    var main = document.getElementById('bloggie-main');
    var div = document.createElement('div');
    div.id = 'DaleZ-Custom-Working-Animation';
    var anim = lottie.loadAnimation({
        container: div,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: './Bloggie/skin/Res/Anim/Working.json'
    });
    var div2 = document.createElement('div');
    div2.id = 'DaleZ-Custom-Settings';
    var h1 = document.createElement('h1');
    h1.innerText = '正在施工…';
    var p = document.createElement('p');
    p.innerText = '感谢您抽空测试此页面。此页面当前仍在开发中，因此请经常回来跟踪我们的最新进度。';
    div2.appendChild(div);
    div2.appendChild(h1);
    div2.appendChild(p);
    main.innerHTML = '';
    anim.addEventListener('DOMLoaded', ()=>anim.playSegments([0,90], true));
    main.appendChild(div2);
}