// AUK Navigator — Service Worker
//
// WHAT THIS ACTUALLY DOES (be accurate about this if asked in your defense):
// It caches the app's own files (HTML, CSS, JS, icons) so the page shell
// loads instantly and still opens even on a very weak connection. It does
// NOT make full route-finding work with zero internet — drawing a route
// still calls OSRM, and the map tiles still need a connection to load new
// areas. This is "app-shell caching", a real and common first step toward
// a full offline PWA, not a claim that the whole app works with no
// internet at all.

const CACHE_NAME = 'auk-navigator-shell-v1';
const APP_SHELL_FILES = [
  './',
  './index.html',
  './css/styles.css',
  './js/script.js',
  './js/campus-locations.geojson.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL_FILES))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Only handle our own same-origin app-shell files. Leave map tiles,
  // routing (OSRM), fonts, and the Leaflet CDN scripts to the network as
  // normal — caching those is a bigger job than one night before a defense,
  // and silently caching stale map tiles would be worse than no caching.
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
