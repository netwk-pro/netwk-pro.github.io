/* ==========================================================================
src/service-worker.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/** @type {ServiceWorkerGlobalScope} */
const sw = /** @type {ServiceWorkerGlobalScope} */ (
  /** @type {unknown} */ (self)
);

/// <reference types="vite/client" />

const isDev = location.hostname === "localhost";
const disallowedHosts = [
  "us.i.posthog.com", // Add PostHog to disallowed hosts
  "posthog.com", // Add PostHog to disallowed hosts
];

import { build, files, version } from "$service-worker";

/** @type {string} */
const CACHE = `cache-${version}`;

/** @type {string[]} */
const excludedAssets = [];

//TODO: Remove files in docs once migrated to documentation subsite

const IGNORE_PATHS = new Set([
  "/docs/extensions.md",
  "/docs/Home.md",
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

/** @type {string[]} */
const ASSETS = [
  ...new Set(
    [...build, ...files, "/offline.html"].filter((path) => {
      try {
        const url = new URL(path, location.origin);
        const hostname = url.hostname;

        const shouldExclude =
          path.startsWith("http") ||
          disallowedHosts.some(
            (host) => hostname === host || hostname.endsWith(`.${host}`),
          ) ||
          IGNORE_PATHS.has(path);

        if (shouldExclude) excludedAssets.push(path);
        return !shouldExclude;
      } catch (err) {
        if (isDev)
          console.warn("[SW] URL parse failed, skipping path:", path, err);
        excludedAssets.push(path);
        return true;
      }
    }),
  ),
];

const uniqueExcludedAssets = [...new Set(excludedAssets)].sort();

if (isDev) {
  console.log("[SW] Assets to precache:", ASSETS);
  console.log("[SW] Excluded assets:", uniqueExcludedAssets);
}

// 🔹 Install event
sw.addEventListener("install", (event) => {
  if (isDev) console.log("[SW] Install event");
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE);
      try {
        await cache.addAll(ASSETS);
        if (isDev) console.log("[SW] Precaching complete");
        sw.skipWaiting();
        if (isDev) console.log("[SW] skipWaiting() called");
      } catch (err) {
        if (isDev) console.warn("[SW] Failed to precache some assets:", err);
      }
    })(),
  );
});

// 🔹 Activate event
sw.addEventListener("activate", (event) => {
  if (isDev) console.log("[SW] Activate event");
  event.waitUntil(
    (async () => {
      const tasks = [];

      if (sw.registration.navigationPreload) {
        tasks.push(sw.registration.navigationPreload.enable());
        if (isDev) console.log("[SW] Navigation preload enabled");
      }

      tasks.push(
        caches.keys().then((keys) =>
          Promise.all(
            keys.map((key) => {
              if (key !== CACHE) {
                if (isDev) console.log("[SW] Deleting old cache:", key);
                return caches.delete(key);
              }
            }),
          ),
        ),
      );

      await Promise.all(tasks);
      await sw.clients.claim();
      if (isDev) {
        console.log("[SW] clients.claim() called");
        console.log("[SW] Scope:", sw.registration.scope);
      }
    })(),
  );
});

/**
 * Determine if a request should be skipped by the service worker.
 * Specifically filters out dev/build files, module imports, and source files.
 * Only active in development mode.
 *
 * @param {URL} url
 * @returns {boolean}
 */
function shouldSkipDevModule(url) {
  if (!isDev) return false;

  return (
    url.pathname.startsWith("/@fs") ||
    url.pathname.startsWith("/node_modules") ||
    url.pathname.includes(".vite") ||
    url.pathname.includes(".svelte-kit") ||
    !!url.pathname.match(/\.(js|ts|svelte)$/)
  );
}

// 🔹 Fetch event
sw.addEventListener("fetch", (event) => {
  const requestUrl = new URL(event.request.url);

  // ✅ Skip cross-origin requests
  if (requestUrl.origin !== location.origin) return;

  // ✅ Skip internal dev/module files (only in dev)
  if (shouldSkipDevModule(requestUrl)) return;

  if (isDev) console.log("[SW] Fetch intercepted:", event.request.url);

  event.respondWith(
    (async () => {
      const cached = await caches.match(event.request);
      if (cached) {
        if (isDev) console.log("[SW] Serving from cache:", event.request.url);
        return cached;
      }

      try {
        if (event.request.mode === "navigate") {
          const preloadResponse = await event.preloadResponse;
          if (preloadResponse) {
            if (isDev) {
              console.log(
                "[SW] Using preload response for:",
                event.request.url,
              );
            }
            return preloadResponse;
          }
        }

        if (isDev)
          console.log("[SW] Fetching from network:", event.request.url);

        return await fetch(event.request);
      } catch (err) {
        if (isDev) {
          console.warn(
            "[SW] Fetch failed; offline fallback used:",
            event.request.url,
            err,
          );
        }

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

// @cspell:ignore precaching
