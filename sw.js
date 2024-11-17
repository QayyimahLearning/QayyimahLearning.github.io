const CACHE_NAME = 'qayyima-v1';
const REPO_NAME = '/student-journey-islam';
const urlsToCache = [
  '/',
  '/index.html',
  '/src/main.jsx',
  '/src/assets/images/android-chrome-192x192.png',
  '/src/assets/images/android-chrome-512x512.png',
  '/src/assets/images/favicon-32x32.png',
  '/src/assets/images/favicon-16x16.png',
];

// Install the service worker and cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate the service worker and clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Intercept fetch requests and serve from cache if available
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version if available, otherwise fetch from network
      return response || fetch(event.request);
    })
  );
}); 