const VERSION = "c0b147ccf26d6d86";
const PRECACHE = ["./assets/audio/beneath-the-crust.mp3","./assets/audio/conjugated-chains.mp3","./assets/audio/electron-highway.mp3","./assets/audio/eureka-loop.mp3","./assets/audio/keplers-horizon.mp3","./assets/audio/laws-in-motion.mp3","./assets/audio/mapping-the-zenith.mp3","./assets/audio/planet-x.mp3","./assets/audio/under-the-stellar-current.mp3","./assets/index-DzHfZhsA.css","./assets/index-mTzbwbbB.js","./icons/icon-192.png","./icons/icon-512.png","./icons/icon-maskable.png","./index.html","./manifest.webmanifest"];
const cachePrefix = 'physics-quest:' + self.registration.scope + ':';
const cacheName = cachePrefix + VERSION;
const shell = new URL('./index.html', self.registration.scope).href;
const cachedURLs = new Set(PRECACHE.map(path => new URL(path, self.registration.scope).href));

self.addEventListener('install', event => {
  const requests = PRECACHE.map(path => new Request(new URL(path, self.registration.scope), { cache: 'reload' }));
  event.waitUntil(caches.open(cacheName).then(cache => cache.addAll(requests)));
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter(name => name.startsWith(cachePrefix) && name !== cacheName).map(name => caches.delete(name)));
    await self.clients.claim();
  })());
});

async function readRange(response, range) {
  const match = /^bytes=(\d*)-(\d*)$/.exec(range);
  if (!match || (!match[1] && !match[2])) return new Response(null, { status: 416 });
  const audio = await response.blob();
  const start = match[1] ? Number(match[1]) : Math.max(0, audio.size - Number(match[2]));
  const end = match[1] && match[2] ? Math.min(Number(match[2]), audio.size - 1) : audio.size - 1;
  const headers = new Headers({ 'Accept-Ranges': 'bytes' });
  if (start > end || start >= audio.size) {
    headers.set('Content-Range', `bytes */${audio.size}`);
    return new Response(null, { status: 416, headers });
  }
  headers.set('Content-Type', audio.type || 'audio/mpeg');
  headers.set('Content-Range', `bytes ${start}-${end}/${audio.size}`);
  headers.set('Content-Length', String(end - start + 1));
  return new Response(audio.slice(start, end + 1), { status: 206, headers });
}

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  const home = request.mode === 'navigate' && (url.pathname === new URL(self.registration.scope).pathname || url.pathname === new URL(shell).pathname);
  if (!home && !cachedURLs.has(url.href)) return;
  event.respondWith((async () => {
    const cache = await caches.open(cacheName);
    const response = await cache.match(home ? shell : url.href);
    if (!response) return fetch(request);
    const range = request.headers.get('range');
    return range ? readRange(response, range) : response;
  })());
});
