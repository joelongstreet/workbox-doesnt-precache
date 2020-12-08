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

  // This doesn't work
  if (type === 'cache') {
    workbox.precaching.precacheAndRoute(payload);
    console.log('attempting to precache and route manifest', JSON.stringify(payload));
  }
});

// This works
// workbox.precaching.precacheAndRoute([{
//   url: 'https://media0.giphy.com/media/Ju7l5y9osyymQ/giphy.gif',
//   revision: null
// }]);

context.skipWaiting();