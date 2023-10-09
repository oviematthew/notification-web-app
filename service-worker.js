const cacheName = 'my-music-app-cache-v1';

self.addEventListener('install', function (event) {
  console.log('Service Worker Installed', event);

  event.waitUntil(
    caches.open(cacheName)
      .then(function (cache) {
        return cache.addAll([
          '/',
          '/index.html',
          '/js/script.js',
          '/css/style.css',
          '/assets/icons/trash-can-solid.svg',
        ]);
      })
  );
});

self.addEventListener('activate', function (event) {
  console.log('Service Worker Activated', event);

  event.waitUntil(
    caches.keys().then( (cacheNames) => {
      return Promise.all(
        cacheNames.map(function (name) {
          if (name !== cacheName) {
            return caches.delete(name);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        return response || fetch(event.request);
      })
  );
});
