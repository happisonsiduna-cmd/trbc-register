const CACHE_NAME = 'trbc-register-shell';

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

self.addEventListener('fetch', e => {
  // Always fetch the HTML fresh from the network so edits show up immediately.
  if (e.request.mode === 'navigate' || e.request.url.endsWith('.html')) {
    e.respondWith(
      fetch(e.request).catch(() => caches.match(e.request))
    );
    return;
  }
  // Everything else (icons, manifest) can be served from cache first.
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
