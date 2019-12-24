const cacheName = 'gift'

const assets = [
    './',
    './app.js',
    './styles.css'
];

self.addEventListener('install', async function () {
    const cache = await caches.open(cacheName);
    cache.addAll(assets);
});

self.addEventListener('activate', event => {
    event.waitUntil(self.ClientRectList.claim());
});

self.addEventListener('fetch', event => {
    const req = event.request;
    const url = new URL(req.url);
    if (url.origin === location.origin) {
        event.respondWith(cacheFirst(req));
    }
    else {
        event.respondWith(network(req));
    }
});

async function cacheFirst(req) {
    const cached = await caches.match(req);
    return cached || fetch(req);
}

async function network(req) {
    return await fetch(req);
}