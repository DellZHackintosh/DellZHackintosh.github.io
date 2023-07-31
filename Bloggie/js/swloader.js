(async function swloader() {
    if (navigator.serviceWorker) {
        navigator.serviceWorker.addEventListener("controllerchange", () => {
            var temp = document.createElement('div');
            temp.innerHTML = `<div class="WinUI-noticeBar"><p>更新已可用。</p><button class="WinUI-hyperLink" style="margin: -6px 0px -6px auto" onclick="location.reload(true);">立即刷新</button></div>`;
            var d = document.getElementById('bloggie-main');
            d.insertBefore(temp, d.firstElementChild);
        });
        navigator.serviceWorker.register('./sw.js');
    }
})();