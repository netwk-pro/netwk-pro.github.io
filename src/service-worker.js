/* ==========================================================================
src/service-worker.js

SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * @typedef {any} Files - SvelteKit build files
 * @typedef {string} Version - SvelteKit version string
 */

/**
 * Use a simpler approach to type the service worker context
 * @type {any}
 */
const sw = self;

import { build, files, version } from "$service-worker";

const CACHE = `cache-${version}`;

const ASSETS = [
  ...build, // the app itself
  ...files, // everything in `static`
];

/**
 * Install event handler
 * @param {Event} event - The install event
 */
sw.addEventListener(
  "install",
  (/** @type {{ waitUntil: (arg0: Promise<void>) => void; }} */ event) => {
    /**
     * @type {Promise<void>}
     */
    const addFilesToCache = caches
      .open(CACHE)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => {
        sw.skipWaiting();
      });

    event.waitUntil(addFilesToCache);
  },
);

/**
 * Activate event handler
 * @param {Event} event - The activate event
 */
sw.addEventListener(
  "activate",
  (/** @type {{ waitUntil: (arg0: Promise<void>) => void; }} */ event) => {
    /**
     * @type {Promise<void>}
     */
    const deleteOldCaches = caches.keys().then(async (keys) => {
      for (const key of keys) {
        if (key !== CACHE) await caches.delete(key);
      }
      sw.clients.claim();
    });

    event.waitUntil(deleteOldCaches);
  },
);

/**
 * Fetch event handler
 * @param {Event} event - The fetch event with request property
 */
sw.addEventListener(
  "fetch",
  (
    /** @type {{ request: Request; respondWith: (arg0: Promise<Response>) => void; }} */ event,
  ) => {
    // Only cache GET requests
    if (event.request.method !== "GET") return;

    const fetchResponse = caches.match(event.request).then(async (response) => {
      if (response) return response;
      try {
        return await fetch(event.request);
      } catch (err) {
        if (event.request.mode === "navigate") {
          // Always await and check for undefined
          const offlineResponse = await caches.match("/offline.html");
          if (offlineResponse) return offlineResponse;
          // Always return a Response object
          return new Response(
            "<!doctype html><title>Offline</title><h1>You are offline.</h1>",
            { headers: { "Content-Type": "text/html; charset=utf-8" } },
          );
        }
        throw err;
      }
    });

    event.respondWith(fetchResponse);
  },
);
