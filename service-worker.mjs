/*!
  service-worker.js

  SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
  This file is part of Network Pro.
*/

const CACHE_NAME = "network-pro-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/legal.html",
  "/terms-of-use.html",
  "/html/spotlight.html",
  "/css/normalize.css",
  "/css/style.css",
  "/css/index.css",
  "/css/default.css",
  "/js/app.js",
  "/img/logo.png",
  "/img/logo-transparent.png",
  "/img/badge_obtainium.png",
  "/img/posts/linksheet.png",
  "/img/posts/urlcheck.png",
];

// Install event: Cache resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event: Serve cached resources
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Serve cached resource or fetch from network
      return response || fetch(event.request);
    })
  );
});

// Activate event: Clean up old caches
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
