/* ==========================================================================
src/service-worker.js

SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/** @type {ServiceWorkerGlobalScope} */
const sw = self;

import { build, files, version } from "$service-worker";

/** @type {string} */
const CACHE = `cache-${version}`;

/** @type {string[]} */
const ASSETS = Array.from(new Set([...build, ...files, "/offline.html"]));

console.log("[SW] Assets to cache:", ASSETS); // Helps debug duplicates

/**
 * @param {ExtendableEvent} event
 */
sw.addEventListener("install", (event) => {
  /** @type {ExtendableEvent} */ (event).waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => sw.skipWaiting()),
  );
});

/**
 * @param {ExtendableEvent} event
 */
sw.addEventListener("activate", (event) => {
  /** @type {ExtendableEvent} */ (event).waitUntil(
    (async () => {
      const tasks = [];

      if (sw.registration.navigationPreload) {
        tasks.push(sw.registration.navigationPreload.enable());
      }

      tasks.push(
        caches.keys().then((keys) =>
          Promise.all(
            keys.map((key) => {
              if (key !== CACHE) return caches.delete(key);
            }),
          ),
        ),
      );

      await Promise.all(tasks);
      await sw.clients.claim();
    })(),
  );
});

/**
 * @param {FetchEvent} event
 */
sw.addEventListener("fetch", (event) => {
  /** @type {FetchEvent} */ (event).respondWith(
    (async () => {
      const cached = await caches.match(event.request);
      if (cached) return cached;

      try {
        if (event.request.mode === "navigate") {
          const preloadResponse = await event.preloadResponse;
          if (preloadResponse) return preloadResponse;
        }

        return await fetch(event.request);
      } catch {
        if (event.request.mode === "navigate") {
          const offline = await caches.match("/offline.html");
          if (offline) return offline;
          return new Response("<h1>Offline</h1>", {
            headers: { "Content-Type": "text/html" },
          });
        }

        return Response.error();
      }
    })(),
  );
});
