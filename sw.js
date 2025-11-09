const CACHE_NAME = 'music-pro-cache-v1';
self.addEventListener('install', e=>self.skipWaiting());
self.addEventListener('activate', e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e=>{
    const url=e.request.url;
    if(url.endsWith('.mp3')||url.endsWith('.wav')||url.endsWith('.ogg')){
        e.respondWith(
            caches.open(CACHE_NAME).then(cache=>cache.match(e.request).then(r=>r||fetch(e.request).then(netR=>{cache.put(e.request,netR.clone());return netR;})))
        );
    }
});
