/* ==========================================================================
src/service-worker.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/// <reference lib="webworker" />
/// <reference types="vite/client" />

/**
 * @type {ServiceWorkerGlobalScope}
 */
const sw = /** @type {ServiceWorkerGlobalScope} */ (
  /** @type {unknown} */ (self)
);

const isDev = location.hostname === 'localhost';

/** @type {string[]} */
const disallowedHosts = ['us.i.posthog.com', 'posthog.com'];

import { build, files, version } from '$service-worker';

/** @type {string} */
const CACHE = `cache-${version}`;

/** @type {string[]} */
const excludedAssets = [];

/** @type {Set<string>} */
const IGNORE_PATHS = new Set([
  '/.well-known/security.txt.sig',
  '/img/banner-1280x640.png',
  '/img/banner-og-1200x630.png',
  '/img/fb-banner.png',
  '/img/logo-transparent.png',
  '/img/logo.png',
  '/img/svelte.png',
  '/pgp/contact@s.neteng.pro.asc',
  '/pgp/github@sl.neteng.cc.asc',
  '/pgp/security@s.neteng.pro.asc',
  '/pgp/support@netwk.pro.asc',
  '/screenshots/desktop-foss.png',
  '/webfonts/fa-brands-400.ttf',
  '/webfonts/fa-solid-900.ttf',
  '/7cbb39ce-750b-43da-83b8-8980e5554d4d.txt',
  '/robots.txt',
  '/sitemap.xml',
  '/CNAME',
]);

/** @type {string[]} */
const ASSETS = [
  ...new Set(
    [...build, ...files, '/offline.html'].filter((path) => {
      try {
        const url = new URL(path, location.origin);
        const hostname = url.hostname;

        const shouldExclude =
          path.startsWith('http') ||
          path.startsWith('/bin/') ||
          disallowedHosts.some(
            (host) => hostname === host || hostname.endsWith(`.${host}`),
          ) ||
          IGNORE_PATHS.has(path);

        if (shouldExclude) excludedAssets.push(path);
        return !shouldExclude;
      } catch (err) {
        if (isDev)
          console.warn('[SW] URL parse failed, skipping path:', path, err);
        excludedAssets.push(path);
        return true;
      }
    }),
  ),
];

/** @type {string[]} */
const uniqueExcludedAssets = [...new Set(excludedAssets)].sort();

/** @type {string[]} */
const REQUIRED_ASSETS = [
  '/disableSw.js',
  '/favicon.ico',
  '/icon-192x192.png',
  '/icon-512x512-maskable.png',
  '/icon-512x512.png',
  '/icon-about.png',
  '/icon-contact.png',
  '/icon-services.png',
  '/icon-splash.png',
  '/manifest.json',
  '/offline.html',
  '/offline.min.css',
  '/screenshots/desktop-about.png',
  '/screenshots/desktop-home.png',
  '/screenshots/mobile-foss.png',
  '/screenshots/mobile-home.png',
  '/webfonts/fa-brands-400.woff2',
  '/webfonts/fa-solid-900.woff2',
  '/.well-known/dnt-policy.txt',
  '/.well-known/gpc.json',
];

if (isDev) {
  console.log('[SW] Assets to precache:', ASSETS);
  console.log('[SW] Excluded assets:', uniqueExcludedAssets);
}

/**
 * Safely cache a list of assets.
 *
 * @param {Cache} cache
 * @param {string[]} assets
 * @param {string[]} [required=[]]
 * @returns {Promise<string[]>}
 */
async function cacheAssetsSafely(cache, assets, required = []) {
  /** @type {string[]} */
  const cachedPaths = [];

  await Promise.all(
    assets.map(async (asset) => {
      try {
        await cache.add(asset);
        cachedPaths.push(asset);
      } catch (err) {
        const msg =
          err instanceof Error
            ? `[SW] Failed to cache ${asset}: ${err.message}`
            : `[SW] Failed to cache ${asset}: Unknown error`;

        if (isDev) {
          throw new Error(msg);
        } else {
          console.warn(msg);
        }
      }
    }),
  );

  const missing = required.filter((req) => !cachedPaths.includes(req));
  if (missing.length > 0) {
    const errorMsg = `[SW] ⚠️ Missing required assets: ${missing.join(', ')}`;
    if (isDev) throw new Error(errorMsg);
    console.error(errorMsg);
  }

  return cachedPaths;
}

// 🔹 Install event
/**
 * @param {ExtendableEvent} event
 */
sw.addEventListener('install', (event) => {
  if (isDev) console.log('[SW] Install event');

  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE);
      let cachedPaths = [];

      try {
        cachedPaths = await cacheAssetsSafely(cache, ASSETS, REQUIRED_ASSETS);
        if (isDev) console.log('[SW] Cached assets:', cachedPaths);
      } catch (err) {
        if (isDev) throw err;
        console.warn('[SW] Error while precaching (non-fatal in prod):', err);
      }

      await sw.skipWaiting();
      if (isDev) console.log('[SW] skipWaiting() called');
    })(),
  );
});

// 🔹 Activate event
/**
 * @param {ExtendableEvent} event
 */
sw.addEventListener('activate', (event) => {
  if (isDev) console.log('[SW] Activate event');

  event.waitUntil(
    (async () => {
      const tasks = [];

      if (sw.registration.navigationPreload) {
        tasks.push(sw.registration.navigationPreload.enable());
        if (isDev) console.log('[SW] Navigation preload enabled');
      }

      tasks.push(
        caches.keys().then((keys) =>
          Promise.all(
            keys
              .filter((key) => key !== CACHE)
              .map((key) => {
                if (isDev) console.log('[SW] Deleting old cache:', key);
                return caches.delete(key);
              }),
          ),
        ),
      );

      await Promise.all(tasks);
      await sw.clients.claim();
      if (isDev) {
        console.log('[SW] clients.claim() called');
        console.log('[SW] Scope:', sw.registration.scope);
      }
    })(),
  );
});

/**
 * Determine if a request should be ignored during development.
 *
 * @param {URL} url
 * @returns {boolean}
 */
function shouldSkipDevModule(url) {
  if (!isDev) return false;

  return (
    url.pathname.startsWith('/@fs') ||
    url.pathname.startsWith('/node_modules') ||
    url.pathname.includes('.vite') ||
    url.pathname.includes('.svelte-kit') ||
    !!url.pathname.match(/\.(js|ts|svelte)$/)
  );
}

// 🔹 Fetch event
/**
 * @param {FetchEvent} event
 */
sw.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);

  if (requestUrl.origin !== location.origin) return;
  if (shouldSkipDevModule(requestUrl)) return;

  if (isDev) console.log('[SW] Fetch intercepted:', event.request.url);

  event.respondWith(
    (async () => {
      const cached = await caches.match(event.request);
      if (cached) {
        if (isDev) console.log('[SW] Serving from cache:', event.request.url);
        return cached;
      }

      try {
        if (event.request.mode === 'navigate') {
          const preloadResponse = await event.preloadResponse;
          if (preloadResponse) {
            if (isDev)
              console.log('[SW] Using preload response:', event.request.url);
            return preloadResponse;
          }
        }

        if (isDev)
          console.log('[SW] Fetching from network:', event.request.url);

        return await fetch(event.request);
      } catch (_err) {
        if (isDev)
          console.warn(
            '[SW] Fetch failed; offline fallback:',
            event.request.url,
          );

        if (event.request.mode === 'navigate') {
          const offline = await caches.match('/offline.html');
          if (offline) return offline;

          return new Response('<h1>Offline</h1>', {
            headers: { 'Content-Type': 'text/html' },
          });
        }

        return Response.error();
      }
    })(),
  );
});
