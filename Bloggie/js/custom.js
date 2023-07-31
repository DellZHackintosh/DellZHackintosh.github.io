'use strict';
bloggie.custom.command.loadcontentbeforearticle = (ctt) => {
    if (typeof(ctt.Comment) != 'undefined') {
        var h = document.createElement('header');
        var t = document.createElement('h1');
        var c = document.createTextNode(ctt.Title);
        var d = document.createElement('p');
        d.appendChild(document.createTextNode(ctt.desp));
        d.id = 'header-desp';
        var ti = document.createElement('p');
        ti.appendChild(document.createTextNode(ctt.edit || ctt.create));
        ti.id = 'header-ti';
        var tag = bloggie.custom.command.tagGroupMaker(ctt.tags, true);
        tag.id = 'header-tag'
        t.appendChild(c);
        h.appendChild(t);
        h.style.backgroundColor = ctt.color || '#036ac4';
        h.setAttribute('data-icon', ctt.icon || '');
        h.appendChild(d);
        h.appendChild(ti);
        h.appendChild(tag);
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
        f.appendChild(h);
        var y = new Date().getFullYear();
        f.innerHTML += `<div class="WinUI-noticeBar"><p>© 2023-${y} DaleZ<br />本站文章除其作者特殊声明外，一律采用<a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0许可协议</a>进行授权，进行转载或二次创作时<b>务必以相同协议</b>进行共享，<b>严禁</b>用于商业用途。</p></div>`;
        f.appendChild(cmt);
    } else {
        var h = document.createElement('hr');
        f.appendChild(h);
        var y = new Date().getFullYear();
        f.innerHTML += `<div class="WinUI-noticeBar"><p>© 2023-${y} DaleZ<br />本站文章除其作者特殊声明外，一律采用<a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0许可协议</a>进行授权，进行转载或二次创作时<b>务必以相同协议</b>进行共享，<b>严禁</b>用于商业用途。</p></div>`;
    }
    if (ctt.Title == '目录') {
        var tagArea = bloggie.custom.command.tagGroupMaker(Object.keys(bloggie.custom.tags), true);
        tagArea.removeAttribute('class');
        tagArea.id = 'tagArea';
        var ti = document.createElement('h2');
        ti.appendChild(document.createTextNode('所有标签'));
        tagArea.insertBefore(ti, tagArea.firstElementChild);
        f.insertBefore(tagArea, f.firstElementChild);
    }
    var getanchor = /#(.*)$/;
    document.querySelectorAll('a[href*="#"]').forEach(anchor => {
        anchor.addEventListener('click', e=>{
            if (getanchor.test(anchor.href)) {
                var currenturl = window.location.href.match(/^(.*?)(?=#|$)/)[1];
                var targeturl = anchor.href.match(/^(.*?)(?=#|$)/)[1];
                var target = document.getElementById(decodeURIComponent(anchor.href.match(getanchor)[1]));
                if (target && currenturl == targeturl) target.scrollIntoView({behavior: 'smooth'});
                window.history.pushState({}, '', anchor.href);
                e.preventDefault();
            }
        });
    });
    if (getanchor.test(window.location.href)) {
        var target = document.getElementById(decodeURIComponent(window.location.href.match(getanchor)[1]));
        if (target) target.scrollIntoView({behavior: 'smooth'});
    }
    return (ctt.Title != '设置') ? f : undefined;
};

bloggie.custom.command.Article = (ctt) => {
    var aie = document.createElement('article');
    aie.innerHTML = marked.parse(ctt);
    msemoji.parse(aie,{
        base: 'https://gh.sourcegcdn.com/DellZHackintosh/msemoji/1.1.2/src/',
        ext: '.svg',
        folder: 'Flat',
        attributes: () => ({
            loading: 'lazy',
            crossorigin: 'anonymous'
        })
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

bloggie.custom.command.onerror = async () => {
    bloggie.custom.LoadArticleState = 'failed';
    var main = document.getElementById('bloggie-main');
    var div = document.createElement('div');
    div.id = 'DaleZ-Custom-Working-Animation';
    var anim = lottie.loadAnimation({
        container: div,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: './Bloggie/skin/Res/Anim/Error.json'
    });
    var div2 = document.createElement('div');
    div2.id = 'DaleZ-Custom-Settings';
    var h1 = document.createElement('h1');
    h1.innerText = '出错了…';
    var p = document.createElement('p');
    p.innerText = '很抱歉遇到错误。请尝试刷新。若复现，请检查网络连接。';
    div2.appendChild(div);
    div2.appendChild(h1);
    div2.appendChild(p);
    main.innerHTML = '';
    anim.addEventListener('DOMLoaded', ()=>anim.playSegments([0,90], true));
    main.appendChild(div2);
}
bloggie.custom.command.NavController = (()=> {
    var Nav = document.getElementById('bloggie-nav');
    function NavController() {
        Nav.classList.toggle('navshow');
    }
    return NavController;
})();
document.getElementById('bloggie').addEventListener('click', event => {
    if (event.target.id != 'bloggie-nav' && event.target.id != 'Nav-Controller') document.getElementById('bloggie-nav').classList.toggle('navshow', false);
});

bloggie.custom.command.listmaker = function (ctt, name) {
    var btn = DaleZ_listbutton(ctt.Title, ctt.desp, [bloggie.custom.command.infoMaker(ctt), bloggie.custom.command.tagGroupMaker(ctt.tags, true)], ctt.icon);
    btn.onclick = (event) => {
        if (event.target.className != 'Tag') bloggie.LoadArticle(name);
    }
    return btn;
}

bloggie.custom.listfilter = 'Top';
bloggie.custom.listfilter_rest = true;

bloggie.custom.tags = {
    'Test1':{
        'Icon':'1',
        'Color':'#114514',
        'desp':'TEST1'
    },
    'Test2':{
        'Icon':'2',
        'Color':'#191981',
        'desp':'TEST2'
    },
    'Test3':{
        'Icon':'3',
        'Color':'#233',
        'desp':'TEST3'
    }
}

bloggie.custom.command.tagGroupMaker = (tagArray, event) => {
    let Final = document.createElement('div');
    Final.className = 'tagGroup';
    tagArray.forEach((TagName) => {
        var title = TagName;
        var color = bloggie.custom.tags[TagName]['Color'];
        var icon = bloggie.custom.tags[TagName]['Icon'];
        var desp = bloggie.custom.tags[TagName]['desp'];
        var finaltag = DaleZ_Tag(title, color, icon, desp);
        if (event) finaltag.addEventListener('click', () => {
            bloggie.loadlist((info) => {
                if (info.tags.includes(TagName)) return true;
            }, false);
        });
        Final.appendChild(finaltag);
    });
    return Final;
}

bloggie.custom.command.infoMaker = (info) => {
    let final = document.createElement('div');
    final.className = 'infoGroup';
    if (info.create) {
        var c = document.createElement('p');
        c.appendChild(document.createTextNode(info.create));
        final.appendChild(c);
    }
    if (info.edit) {
        var e = document.createElement('p');
        e.appendChild(document.createTextNode(info.edit));
        final.appendChild(e);
    }
    if (info.Comment === true) {
        final.appendChild(DaleZ_Tag('可评论', '#217346', ''));
    } else if (info.Comment === false) {
        final.appendChild(DaleZ_Tag('不可评论', '#cf0019', ''));
    }
    if (info.Top === true) {
        final.appendChild(DaleZ_Tag('置顶内容', '#0078d4', ''));
    }
    return final;
}