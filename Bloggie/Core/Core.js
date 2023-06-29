var bloggie = (function () {
    'use strict';
    var bloggie = {
        Utilities: {
            urlarg: urlarg
        },
        custom: {
            command: {}
        },
        onerror: Err,
        get: get,
        LoadArticle: LoadArticle,
        loadlist: loadlist,
        loaded: loaded,
        startworking: startworking
    }

    var base, jslist, articlelist;

    function Err(text) {
        var ctt = "Bloggie 遇到错误，可能无法继续运行。请刷新以重新加载。\n若重新加载后仍然遇到错误，请联系网站管理员。";
        if (text) ctt += "\n以下错误信息可能有助于诊断问题：\n" + text;
        alert(ctt);
    }

    function get(path, fcn, async = false) {
        switch (async) {
            case false:
                var ctt = new XMLHttpRequest();
                ctt.onerror = fcn ? fcn : null;
                ctt.open('get', path, async);
                ctt.send();
                if (ctt.status === 200) {
                    return ctt.responseText;
                }
                return;
                break;
            case true:
                return new Promise(async function (resolve, reject) {
                    try {
                        var ctt = await fetch(path);
                        if (ctt.ok) {
                            resolve(await ctt.text());
                        }
                    } catch (e) {
                        fcn(e);
                    }
                });
        }
    }

    if (!localStorage.getItem("bloggie-base")) {
        base = JSON.parse(get('./Bloggie/Core/base.json'));
        localStorage.setItem("bloggie-base", JSON.stringify(base));
    } else {
        base = JSON.parse(localStorage.getItem("bloggie-base"));
    }

    window.onerror = function (message, source, lineno, colno, error) {
        Err('Message:' + message + '\nSource:' + source + '\nLineno:' + lineno + '\nColno:' + colno + '\nError:' + error);
    };

    function init() {
        jslist = base.jslist;
        articlelist = base.articlelist;
        var title = document.createElement('title');
        title.innerHTML = base.name || 'Bloggie';
        document.head.appendChild(title);
        var html = document.documentElement;
        html.lang = base.lang || 'en-US';
        html.dir = base.dir || 'ltr';
        swloader();
        if (jslist.loading) {
            var scripts = Object.keys(jslist.loading).length;
            for (var n = 1; n <= scripts; n++) {
                if (!jslist.loading[n].disabled) {
                    var srp = document.createElement('script');
                    srp.src = jslist.loading[n].path;
                    if (jslist.loading[n].options) {
                        var opt = jslist.loading[n].options;
                        var optinf = Object.keys(opt);
                        for (var o = 0; o < optinf.length; o++) {
                            srp.setAttribute(optinf[o], opt[optinf[o]]);
                        }
                    }
                }
                document.head.appendChild(srp);
            }
        }
    }
    init();

    function waitlistbefore(element) {
        element.defer = true;
        element.async = false;
        bloggie.custom.tasklist = isNaN(bloggie.custom.tasklist) ? 1 : bloggie.custom.tasklist + 1;
        element.onload = waitlistafter;
    }

    function waitlistafter() {
        bloggie.custom.tasklist -= 1;
        if (!bloggie.custom.tasklist) (bloggie.custom.command.startworking || bloggie.startworking)();
    }

    function loaded() {
        var body = document.body;
        var blog = document.getElementById('bloggie') || document.createElement('div');
        blog.id = 'bloggie';
        var nav = document.createElement('nav');
        nav.id = 'bloggie-nav';
        var main = document.createElement('main');
        main.id = 'bloggie-main';
        var srt = document.createElement('div');
        srt.id = 'bloggie-onload-script';
        srt.style.display = 'none';
        if (jslist.loaded) {
            var scripts = Object.keys(jslist.loaded).length;
            for (var n = 1; n <= scripts; n++) {
                if (!jslist.loaded[n].disabled) {
                    var srp = document.createElement('script');
                    srp.src = jslist.loaded[n].path;
                    if (jslist.loaded[n].options) {
                        var opt = jslist.loaded[n].options;
                        var optinf = Object.keys(opt);
                        for (var o = 0; o < optinf.length; o++) {
                            srp.setAttribute(optinf[o], opt[optinf[o]]);
                        }
                    }
                    if (jslist.loaded[n].JoinWaitlist) {
                        waitlistbefore(srp);
                    }
                }
                srt.appendChild(srp);
            }
        }
        if (base.wait.type == 'text') {
            var wait = document.createTextNode(base.wait.content);
        } else if (base.wait.type == 'function') {
            var wait = eval(base.wait.content)();
        } else {
            var wait = document.createTextNode('请稍候……');
        }
        main.appendChild(wait);
        blog.appendChild(nav);
        blog.appendChild(main);
        blog.appendChild(srt);
        body.appendChild(blog);
        if (!bloggie.custom.tasklist) (bloggie.custom.command.startworking || bloggie.startworking)();
    }

    function startworking() {
        window.onerror = (bloggie.custom.command.onerror || null);
        Nav();
        LoadArticle(urlarg('id'), true);
        window.onpopstate = function (event) {
            LoadArticle(urlarg('id'));
        }
        if (bloggie.custom.command.postfinished) bloggie.custom.command.postfinished();
    }

    function urlarg(arg, value, del) {
        var urlParams = new URLSearchParams(window.location.search);
        if (value) {
            urlParams.set(arg, value);
            window.history.pushState({}, '', `${location.pathname}?${urlParams.toString()}`);
            return;
        } else if (del) {
            urlParams.delete(arg);
            urlParams.toString() ? window.history.pushState({}, '', `${location.pathname}?${urlParams.toString()}`) : window.history.pushState({}, '', `${location.pathname}`);
        } else {
            return urlParams.get(arg);
        }
    }

    function LoadArticle(Name, first) {
        if (bloggie.custom.LoadArticleState == 'running') return;
        bloggie.custom.LoadArticleState = 'running';
        if (!first) {
            if (base.wait.type == 'text') {
                var wait = document.createTextNode(base.wait.content);
            } else if (base.wait.type == 'function') {
                var wait = eval(base.wait.content)();
            } else {
                var wait = document.createTextNode('请稍候……');
            };
            var main = document.getElementById('bloggie-main');
            main.innerHTML = '';
            main.appendChild(wait);
        };
        new Promise(async function () {
            if (Name) {
                if (urlarg('id') != Name) {
                    urlarg('id', Name);
                } else if (!window.location.search.match('id=' + Name)) {
                    window.location.assign(`${location.pathname}?id=` + Name);
                }
            } else urlarg('id', null, true);
            if (articlelist[Name]) {
                if (articlelist[Name].File) {
                    (bloggie.custom.command.Article || Article)(await get(articlelist[Name].File, window.onerror, true));
                } else if (articlelist[Name].action) {
                    eval(articlelist[Name].action);
                };
                if (articlelist[Name].Title) document.title = articlelist[Name].Title;
            } else if (base.SpecialPage[Name]) {
                if (base.SpecialPage[Name].action) {
                    eval(base.SpecialPage[Name].action);
                } else if (base.SpecialPage[Name].file) {
                    (bloggie.custom.command.Article || Article)(await get(base.SpecialPage[Name].file, window.onerror, true));
                };
                if (base.SpecialPage[Name].Title) document.title = base.SpecialPage[Name].Title;
            } else if (!Name) {
                (bloggie.custom.command.Article || Article)(await get((base.SpecialPage['Main'].file || base.SpecialPage['Main'].action), window.onerror, true));
                document.title = base.name;
            } else (Err || bloggie.custom.command.Err)('找不到指定的内容');
            if (bloggie.custom.command.loadcontentbeforearticle) {
                var beforecontent = bloggie.custom.command.loadcontentbeforearticle((articlelist[Name] || base.SpecialPage[Name] || base.SpecialPage['Main']));
                if (beforecontent) document.getElementById('bloggie-main').insertBefore(beforecontent, document.getElementById('bloggie-main').firstChild);
            };
            if (bloggie.custom.command.loadcontentafterarticle) {
                var aftercontent = bloggie.custom.command.loadcontentafterarticle((articlelist[Name] || base.SpecialPage[Name] || base.SpecialPage['Main']));
                if (aftercontent) document.getElementById('bloggie-main').appendChild(aftercontent);
            }
            bloggie.custom.LoadArticleState = 'finished';
        });
    };

    async function Nav() {
        var Objects = base.nav;
        for (var n = 1; n <= Object.keys(Objects).length; n++) {
            var button = (bloggie.custom.command.NavMaker || NavMaker)(Objects[Object.keys(Objects)[n - 1]], Object.keys(Objects)[n - 1]);
            document.getElementById('bloggie-nav').appendChild(button);
        };
    };

    function NavMaker(ctt, name) {
        var button = document.createElement('button');
        button.onclick = () => eval(ctt.action);
        button.innerText = name;
        return button;
    };

    function Article(ctt) {
        var aie = document.createElement('article');
        aie.innerHTML = marked.parse(ctt);
        document.getElementById('bloggie-main').appendChild(aie);
    };

    function loadlist() {
        document.getElementById('bloggie-main').innerHTML = '';
        var div = document.createElement('div');
        div.id = 'bloggie-list';
        var art = Object.keys(articlelist);
        var n = art.length;
        while (n--) {
            div.appendChild((bloggie.custom.command.listmaker || listmaker)(articlelist[n + 1], art[n]));
        }
        document.getElementById('bloggie-main').appendChild(div);
    }

    function listmaker(ctt, name) {
        var div = document.createElement('div');
        div.onclick = () => LoadArticle(name);
        div.innerHTML = ctt.Title;
        return div;
    }

    async function swloader() {
        if (navigator.serviceWorker && base.sw.Supported) {
            try {
                await navigator.serviceWorker.register(base.sw.path, base.sw.options);
                await navigator.serviceWorker.ready;
            }
            catch (e) {
                Err(e);
            }
        }
    }

    return bloggie;

}());