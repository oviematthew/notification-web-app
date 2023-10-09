
// On install of service worker
self.addEventListener('install', function (event) {
    console.log('Servce Worker Installed', event);

    self.skipWaiting();
    });


self.addEventListener('activate', function (event) {
        console.log('Servce Worker Activated', event);
        });

self.addEventListener('fetch', function (event) {
        return event;
        });