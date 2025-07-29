// service-worker.js – updated

const CACHE_NAME = 'irb-speed-cache-v2';  // << bump version

const ASSETS = [
  '/', 'index.html', '_framework/blazor.webassembly.js',
  'css/bootstrap/bootstrap.min.css', 'css/app.css',
  'IRBSpeedApp.styles.css', 'manifest.json',
  'service-worker.js'
];

self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(oldKey => caches.delete(oldKey))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(resp => resp || fetch(evt.request))
  );
});
