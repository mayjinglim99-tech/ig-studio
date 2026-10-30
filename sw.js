// Minimal service worker so the studio can be installed as an app. Always uses the network (content changes often).
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', () => {});
