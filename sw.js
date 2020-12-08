importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js');
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-precaching.dev.js');

const context = self;

context.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('app').then((cache) => {
      console.log(cache);
    }),
  );
});

context.addEventListener('activate', (event) => {
  console.log('sw active');
});

context.addEventListener('fetch', async (event) => {
  console.log(event.request.url);
});

context.addEventListener('message', ({ data }) => {
  const { type, payload } = data;

  if (type === 'cache') {
    const manifest = payload.map((url) => (
      {
        url,
        revision: null,
      }
    ));

    console.log('attempting to precache and route manifest', JSON.stringify(manifest));
    workbox.precaching.precacheAndRoute(manifest);
  }
});

context.skipWaiting();