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

        const IGNORE_PATHS = new Set([
          "/img/banner-1280x640.png",
          "/img/banner-og-1200x630.png",
          "/img/logo-transparent.png",
          "/img/logo.png",
          "/img/svelte.png",
          "/webfonts/fa-brands-400.ttf",
          "/webfonts/fa-solid-900.ttf",
          "/robots.txt",
          "/screenshots/desktop-foss.png",
          "/sitemap.xml",
          "/CNAME",
        ]);

        const shouldExclude =
          path.startsWith("http") ||
          disallowedHosts.some(
            (host) => hostname === host || hostname.endsWith(`.${host}`),
          ) ||
          IGNORE_PATHS.has(path);

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

// 🔹 Install event
sw.addEventListener("install", (event) => {
  console.log("[SW] Install event");
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE);
      try {
        await cache.addAll(ASSETS);
        console.log("[SW] Precaching complete");
        sw.skipWaiting();
        console.log("[SW] skipWaiting() called");
      } catch (err) {
        console.warn("[SW] Failed to precache some assets:", err);
      }
    })(),
  );
});

// 🔹 Activate event
sw.addEventListener("activate", (event) => {
  console.log("[SW] Activate event");
  event.waitUntil(
    (async () => {
      const tasks = [];

      if (sw.registration.navigationPreload) {
        tasks.push(sw.registration.navigationPreload.enable());
        console.log("[SW] Navigation preload enabled");
      }

      tasks.push(
        caches.keys().then((keys) =>
          Promise.all(
            keys.map((key) => {
              if (key !== CACHE) {
                console.log("[SW] Deleting old cache:", key);
                return caches.delete(key);
              }
            }),
          ),
        ),
      );

      await Promise.all(tasks);
      await sw.clients.claim();
      console.log("[SW] clients.claim() called");
    })(),
  );
});

// 🔹 Fetch event
sw.addEventListener("fetch", (event) => {
  console.log("[SW] Fetch intercepted:", event.request.url);
  event.respondWith(
    (async () => {
      if (new URL(event.request.url).origin === location.origin) {
        const cached = await caches.match(event.request);
        if (cached) {
          console.log("[SW] Serving from cache:", event.request.url);
          return cached;
        }
      }

      try {
        if (event.request.mode === "navigate") {
          const preloadResponse = await event.preloadResponse;
          if (preloadResponse) {
            console.log("[SW] Using preload response for:", event.request.url);
            return preloadResponse;
          }
        }

        console.log("[SW] Fetching from network:", event.request.url);
        return await fetch(event.request);
      } catch (err) {
        console.warn(
          "[SW] Fetch failed; offline fallback used:",
          event.request.url,
          err,
        );

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
