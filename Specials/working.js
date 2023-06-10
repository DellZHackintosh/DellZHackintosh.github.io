  function urlarg(arg, value, del) {
     var urlParams = new URLSearchParams(window.location.search);
     if (value) {
        urlParams.set(arg, value);
        window.history.pushState({}, '', `${location.pathname}?${urlParams.toString()}`);
        return;
     } else if (del) { 
        urlParams.delete(arg);
        window.history.pushState({}, '', `${location.pathname}?${urlParams.toString()}`);
     } else {
        return urlParams.get(arg);
     }
  }

if (urlarg('try1st') != '1') window.location.assign("./Specials/working.html");