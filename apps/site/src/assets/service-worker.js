// This is the "Offline page" service worker

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const CACHE = 'index';
const offlineFallbackPage = '../index.html';

self.addEventListener('message', (event) => {
	if (event.data && event.data.type === 'SKIP_WAITING') {
		self.skipWaiting();
	}
});

self.addEventListener('install', async (event) => {
	event.waitUntil(
		caches.open(CACHE).then(async (cache) => {
			try {
				const response = await fetch(offlineFallbackPage);
				if (response.ok) {
					await cache.add(offlineFallbackPage);
				} else {
					console.error(`Failed to fetch ${offlineFallbackPage}:`, response.status);
				}
			} catch (error) {
				console.error(`Failed to cache ${offlineFallbackPage}:`, error);
			}
		}),
	);
});

if (workbox.navigationPreload.isSupported()) {
	workbox.navigationPreload.enable();
}

self.addEventListener('fetch', (event) => {
	if (event.request.mode === 'navigate') {
		event.respondWith(
			(async () => {
				try {
					const preloadResp = await event.preloadResponse;

					if (preloadResp) {
						return preloadResp;
					}

					const networkResp = await fetch(event.request);
					return networkResp;
				} catch (error) {
					const cache = await caches.open(CACHE);
					const cachedResp = await cache.match(offlineFallbackPage);
					return cachedResp;
				}
			})(),
		);
	}
});
