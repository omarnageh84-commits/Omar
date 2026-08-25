
const CACHE_NAME = 'omar-v28-avatar';
const urlsToCache = [
  'index.html',
  'manifest.json',
  'themes.js',
  'drive-sync.js',
  'home.html',
  'daily.html',
  'attendance.html',
  'tasks.html',
  'settings.html',
  'icons/icon_72.png',
  'icons/icon_96.png',
  'icons/icon_128.png',
  'icons/icon_144.png',
  'icons/icon_152.png',
  'icons/icon_192.png',
  'icons/icon_384.png',
  'icons/icon_512.png',
  'icons/icon_180.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) return response;
      return fetch(event.request).then(res => {
        if (!res || res.status!==200 || res.type!=='basic') return res;
        const resClone = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, resClone));
        return res;
      }).catch(()=>caches.match('index.html'));
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(names => Promise.all(
      names.filter(n=>n!==CACHE_NAME).map(n=>caches.delete(n))
    ))
  );
  self.clients.claim();
});
