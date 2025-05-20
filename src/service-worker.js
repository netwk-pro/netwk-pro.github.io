/* ==========================================================================
src/service-worker.js

SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/** @type {ServiceWorkerGlobalScope} */
const sw = self;

const disallowedHosts = ["licdn.com", "googletagmanager.com"];

import { build, files, version } from "$service-worker";

/** @type {string} */
const CACHE = `cache-${version}`;

/** @type {string[]} */
const excludedAssets = [];

/** @type {string[]} */
const ASSETS = Array.from(
  new Set(
    [...build, ...files, "/offline.html"].filter((path) => {
      try {
        const url = new URL(path, location.origin);
        const hostname = url.hostname;

        const shouldExclude =
          path.startsWith("http") ||
          disallowedHosts.some(
            (host) => hostname === host || hostname.endsWith(`.${host}`),
          ) ||
          [
            "/img/banner-1280x640.png",
            "/img/banner-og-1200x630.png",
            "/img/logo-transparent.png",
            "/img/logo.png",
            "/img/svelte.png",
            "/robots.txt",
            "/screenshots/desktop-foss.png",
            "/sitemap.xml",
            "/CNAME",
          ].includes(path);

        if (shouldExclude) excludedAssets.push(path);
        return !shouldExclude;
      } catch (err) {
        console.warn("[SW] URL parse failed, skipping path:", path, err);
        excludedAssets.push(path);
        return true;
      }
    }),
  ),
);

const uniqueExcludedAssets = [...new Set(excludedAssets)].sort();

console.log("[SW] Assets to precache:", ASSETS);
console.log("[SW] Excluded assets:", uniqueExcludedAssets);

/**
 * @param {ExtendableEvent} event
 */
sw.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE);
      try {
        await cache.addAll(ASSETS);
        sw.skipWaiting();
      } catch (err) {
        console.warn("[SW] Failed to precache some assets:", err);
      }
    })(),
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
      if (new URL(event.request.url).origin === location.origin) {
        const cached = await caches.match(event.request);
        if (cached) return cached;
      }

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
