const cacheName = 'my-notification-app-cache-v1';

// Install service worker function
self.addEventListener('install', (event) =>{
  console.log('Service Worker Installed', event);

  //Skip waiting phase
  // self.skipWaiting()

  //After successful installation, add the cache which will update the current one
  event.waitUntil(
    caches.open(cacheName)
      .then(function (cache) {
        return cache.addAll([
          '/',
          '/index.html',
          '/js/script.js',
          '/css/style.css',
        ]);
      })
  );
});


// Activate service worker function
self.addEventListener('activate', (event) => {
    console.log('Service Worker Activated:', event);

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

//listen for notification click
self.addEventListener('notificationclick', function (event) {
  const action = event.action;
  const title = event.notification.title;

  if (action === 'agree') {
      console.log("agree")
      clients.matchAll().then(clients => {
          clients.forEach(client => {
              client.postMessage({ message: 'So we both agree on that!' });
          });
      });
  } else if (action === 'disagree') {
      clients.matchAll().then(clients => {
          clients.forEach(client => {
              client.postMessage({ message: 'Let\'s agree to disagree.' });
          });
      });
  }

  event.notification.close();
});






