'use strict';
window.bloggie_init = {
   "name": "DaleZ 的 Blog",
   "lang": "zh-CN",
   "dir": "ltr",
   "jslist": {
      "loading": {
         "1": {
            "path": "./Bloggie/js/init-helper.js",
            "options": null
         },
         "2": {
            "path": "./Bloggie/js/PWAify.js",
            "options": null
         },
         "3": {
            "path": "./Bloggie/js/CSS.js",
            "options": null
         },
         "4": {
            "path": "./Bloggie/js/customloading.js",
            "options": null
         }
      },
      "loaded": {
         "1": {
            "path": "https://cdnjs.cloudflare.com/ajax/libs/marked/5.0.2/marked.min.js?ServiceWorker=cachefirst",
            "options": {
               "crossorigin": "anonymous"
            },
            "JoinWaitlist": true
         },
         "2": {
            "path": "./Bloggie/js/HighLight/highlight.min.js?ServiceWorker=cachefirst",
            "options": null,
            "JoinWaitlist": true
         },
         "3": {
            "path": "https://cdn.jsdelivr.net/npm/marked-gfm-heading-id@3.0.3/lib/index.umd.min.js?ServiceWorker=cachefirst",
            "options": {
               "crossorigin": "anonymous"
            },
            "JoinWaitlist": true
         },
         "4": {
            "path": "https://cdn.jsdelivr.net/npm/marked-mangle@1.0.1/lib/index.umd.min.js?ServiceWorker=cachefirst",
            "options": {
               "crossorigin": "anonymous"
            },
            "JoinWaitlist": true
         },
         "5": {
            "path": "https://cdn.jsdelivr.net/npm/marked-highlight@2.0.0/lib/index.umd.min.js?ServiceWorker=cachefirst",
            "options": {
               "crossorigin": "anonymous"
            },
            "JoinWaitlist": true
         },
         "6": {
            "path": "./Bloggie/js/marked-init.js?ServiceWorker=cachefirst",
            "options": null,
            "JoinWaitlist": true
         },
         "7": {
            "path": "./Bloggie/js/custom.js",
            "options": null,
            "JoinWaitlist": true
         },
         "8": {
            "path": "./Bloggie/js/titlebar.js",
            "options": null,
            "JoinWaitlist": true
         },
         "9": {
            "path": "https://cdn.jsdelivr.net/npm/msemoji@1.1.2/dist/msemoji.min.js?ServiceWorker=cachefirst",
            "options": {
               "crossorigin": "anonymous"
            },
            "JoinWaitlist": true
         },
         "10": {
            "path": "https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.umd.js?ServiceWorker=cachefirst",
            "options": {
               "crossorigin": "anonymous"
            },
            "JoinWaitlist": true
         },
         "11": {
            "path": "https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.12.0/lottie.min.js?ServiceWorker=cachefirst",
            "options": {
               "defer": true,
               "crossorigin": "anonymous"
            }
         },
         "12": {
            "path": "./Bloggie/js/component.js",
            "options": null,
            "JoinWaitlist": true
         },
         "13": {
            "path": "./Bloggie/js/swloader.js",
            "options": null,
         }
      }
   },
   "articlelist": {
      "1": {
         "Title": "Test",
         "File": "./Bloggie/article/Test.md",
         "Comment": true,
         "icon": "",
         "tags": ['Test1','Test2','Test3'],
         "create": "2023-6-14",
         "edit": "2023-6-28"
      },
      "2": {
         "Title": "[测试]Windows 12 是怎么出现的？你知道多少？",
         "File": "./Bloggie/article/uselesstext1.md",
         "Comment": false,
         "tags": ['Test1']
      },
      "3": {
         "Title": "[测试]论使用 Windows 的意义",
         "File": "./Bloggie/article/uselesstext2.md",
         "Comment": false,
         "tags": ['Test2']
      },
      "4": {
         "Title": "[测试]全面讲解微软战略",
         "File": "./Bloggie/article/uselesstext3.md",
         "Comment": false,
         "tags": ['Test3']
      },
      "5": {
         "Title": "微软风音乐不完全集合",
         "File": "./Bloggie/article/MSMusic.md",
         "Comment": true,
         "tags": ['Test1','Test2']
      },
      "6": {
         "Title": "本站介绍（尚在编写）",
         "File": "./Bloggie/article/Introduce.md",
         "Comment": true,
         "tags": ['Test2','Test3'],
         "Top": true
      },
      "7": {
         "Title": "Blog Beta 1 更新日志",
         "File": "./Bloggie/article/beta1update.md",
         "Comment": true,
         "tags": ['Test1','Test3'],
         "desp": "了解本 Blog 在 Beta 1 的更新内容。",
         "icon": "",
         "create": "2023-6-28",
         "edit": "2023-6-30"
      },
      "8": {
         "Title": "Blog Beta 2 更新日志",
         "File": "./Bloggie/article/beta2update.md",
         "Comment": true,
         "tags": ['Test1','Test3'],
         "desp": "了解本 Blog 在 Beta 2 的更新内容。",
         "icon": "",
         "create": "2023-7-31"
      }
   },
   "wait": {
      "type": "function",
      "content": "(function() {return bloggie.custom.command.customLoadingAnimation();})"
   },
   "nav": {
      "主页": {
         "action": "bloggie.LoadArticle()",
         "icon": "./Bloggie/skin/Res/Home.svg"
      },
      "目录": {
         "action": "bloggie.LoadArticle('list')",
         "icon": "./Bloggie/skin/Res/List.svg"
      },
      "设置": {
         "action": "bloggie.LoadArticle('Settings')",
         "icon": "./Bloggie/skin/Res/Setting.svg"
      }
   },
   "SpecialPage": {
      "list": {
         "action": "loadlist()",
         "Title": "目录"
      },
      "Settings": {
         "action": "bloggie.custom.command.loadSettings()",
         "Title": "设置"
      },
      "Main": {
         "file": "./Bloggie/article/Main.md",
         "Title": "DaleZ 的 Blog"
      }
   }
};