const CACHE_NAME = 'irb-speed-cache-v1';
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      cache.addAll([
        '/',
        'index.html',
        '_framework/blazor.webassembly.js',
        'css/bootstrap/bootstrap.min.css',
        'manifest.json',
        'service-worker.js'
      ])
    )
  );
  self.skipWaiting();
});

self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(resp => resp || fetch(evt.request))
  );
});