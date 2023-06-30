"use strict";

const CACHE_NAME = `blog-Cache`;
const indexreg = /^https?:\/\/[^\/]+\/(index\.html)?(\?.+)?$/;
const base = /^https?:\/\/[^\/]+\/base\.json$/;
const networkbydefault = /^(https?):\/\/[^\s/$.?#].[^\s]*\.(js|md)$/;
const img = /^(https?):\/\/[^\s/$.?#].[^\s]*\.(gif|jpg|jpeg|tiff|png|svg|webp)$/;
const getarg = /ServiceWorker=([^&]*)/;


self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    cache.addAll([
      '/index.html',
      '/Bloggie/Core/Core.js',
      '/Bloggie/skin/Res/Anim/Working.json',
      '/Bloggie/skin/Res/Anim/Error.json'
    ]);
    await cache.delete('/Bloggie/skin/CSS/blog.css');
    await clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    if (event.request.url.match(getarg)) {
      switch (event.request.url.match(getarg)[1]) {
        case 'networkfirst':
          try {
            const fetchResponse = await fetch(event.request);
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
          } catch (e) {
            const cachedResponse = await cache.match(event.request);
            if (cachedResponse) {
              return cachedResponse;
            } else {
              return;
            }
          }
          break;

        case 'cachefirst':
          const cachedResponse = await cache.match(event.request);
          if (cachedResponse) {
            return cachedResponse;
          } else {
            try {
              const fetchResponse = await fetch(event.request);
              cache.put(event.request, fetchResponse.clone());
              return fetchResponse;
            } catch (e) {
              return;
            }
          }
          break;

        case 'nocache':
          try {
            const fetchResponse = await fetch(event.request);
            return fetchResponse;
          } catch (e) {
            return;
          }
          break;

        case 'legacy':
          return;
          break;
      }
    } else if (networkbydefault.test(event.request.url)) {
      try {
        const fetchResponse = await fetch(event.request);
        cache.put(event.request, fetchResponse.clone());
        return fetchResponse;
      } catch (e) {
        const cachedResponse = await cache.match(event.request);
        if (cachedResponse) {
          return cachedResponse;
        } else {
          return;
        }
      }
    } else if (indexreg.test(event.request.url)) {
      try {
        const fetchResponse = await fetch('/index.html');
        cache.put('/index.html', fetchResponse.clone());
        return fetchResponse;
      } catch (e) {
        const cachedResponse = await cache.match('/index.html');
        if (cachedResponse) {
          return cachedResponse;
        } else {
          return;
        }
      }
    } else if (img.test(event.request.url)) {
      const cachedResponse = await cache.match(event.request);
      if (cachedResponse) {
        return cachedResponse;
      } else {
        try {
          const fetchResponse = await fetch(event.request);
          cache.put(event.request, fetchResponse.clone());
          return fetchResponse;
        } catch (e) {
          return;
        }
      }
    } else {
      const cachedResponse = await cache.match(event.request);
      if (cachedResponse) {
        return cachedResponse;
      } else {
        try {
          const fetchResponse = await fetch(event.request, {
            mode: 'cors',
            credentials: 'omit'
          });
          cache.put(event.request, fetchResponse.clone());
          return fetchResponse;
        } catch (e) {
          return;
        }
      }
    }
  })());
});