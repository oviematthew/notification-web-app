const cacheName = 'my-music-app-cache-v1';

self.addEventListener('install', function (event) {
  console.log('Service Worker Installed', event);

  //Skip waiting phase
  self.skipWaiting()

  //After successful installation, add the cache which will update the current one
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
    console.log('[Service Worker] Activate:', event);

    // Claims control over all uncontrolled tabs/windows
    event.waitUntil(clients.claim());

    // Delete all old unecessary caches
    event.waitUntil(caches.keys()
    .then( (cacheNames) => {
    console.log('Cache Name: ', cacheNames)
    return Promise.all(cacheNames
    .filter(item => item !== cacheName)
    .map(item => caches.delete(item))
    );
    }));
    });


// Fetch Function (using Cache with network fallback)
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        return response || fetch(event.request);
      })
  );
});
