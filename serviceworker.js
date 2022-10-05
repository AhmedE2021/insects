const cacheName = 'cache-insects';
// when the browser reads this for the first
// time, it caches all the files
// mentioned in the list 
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(['/insects/', '/insects/index.html', '/insects/butterflies.jpg', '/insects/butterfly.jpg', '/insects/dragonfly.jpg']);
    })
  );
});

// if the request a resource (file, html , image, javascript, json EventCounts.)
// then look for it online .if not availble online, get the files from the cache
self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(() =>
      caches.open(cacheName).then(cache => cache.match(event.request))
    )
  );
});