/* ==========================================================================
src/service-worker.js

Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/// <reference lib="webworker" />
/// <reference types="vite/client" />

import { build, version } from '$service-worker';

/**
 * @type {ServiceWorkerGlobalScope}
 */
const sw = /** @type {ServiceWorkerGlobalScope} */ (
  /** @type {unknown} */ (self)
);

const isDev = import.meta.env.DEV;
const CACHE_PREFIX = 'cache-networkpro-';
const ASSET_CACHE = `${CACHE_PREFIX}assets-${version}`;
const PAGE_CACHE = `${CACHE_PREFIX}pages-${version}`;

/** @type {Set<string>} */
const OFFLINE_NAVIGATION_PATHS = new Set(['/', '/about', '/pgp']);

// Only static files with a specific offline or PWA purpose are precached. Build
// assets remain safe to include as a group because SvelteKit generates and
// versions that finite list for this deployment.
/** @type {string[]} */
const REQUIRED_STATIC_ASSETS = [
  '/disableSw.js',
  '/offline.html',
  '/offline.min.css',
];

/** @type {string[]} */
const OPTIONAL_STATIC_ASSETS = [
  '/favicon.ico',
  '/icon-192x192.png',
  '/icon-512x512-maskable.png',
  '/icon-512x512.png',
  '/icon-about.png',
  '/icon-contact.png',
  '/icon-splash.png',
  '/manifest.json',
  '/webfonts/fa-brands-400.woff2',
  '/webfonts/fa-solid-900.woff2',
];

/** @type {string[]} */
const REQUIRED_ASSETS = [...new Set([...build, ...REQUIRED_STATIC_ASSETS])];

/** @type {string[]} */
const OPTIONAL_ASSETS = [...new Set(OPTIONAL_STATIC_ASSETS)];

/** @type {Set<string>} */
const PRECACHED_PATHS = new Set([...REQUIRED_ASSETS, ...OPTIONAL_ASSETS]);

if (isDev) {
  console.log('[SW] Required precache assets:', REQUIRED_ASSETS);
  console.log('[SW] Optional precache assets:', OPTIONAL_ASSETS);
}

/**
 * Cache optional assets independently so one unavailable file does not prevent
 * an otherwise valid worker from installing.
 *
 * @param {Cache} cache
 * @param {string[]} assets
 * @returns {Promise<void>}
 */
async function cacheOptionalAssets(cache, assets) {
  const results = await Promise.allSettled(
    assets.map((asset) => cache.add(asset)),
  );

  results.forEach((result, index) => {
    if (result.status === 'rejected') {
      console.warn(
        `[SW] Optional asset was not precached: ${assets[index]}`,
        result.reason,
      );
    }
  });
}

/**
 * Install a complete required precache before allowing this worker to advance.
 *
 * @returns {Promise<void>}
 */
async function installWorker() {
  const cache = await caches.open(ASSET_CACHE);

  try {
    // Cache.addAll is atomic: any missing required asset rejects installation.
    await cache.addAll(REQUIRED_ASSETS);
    await cacheOptionalAssets(cache, OPTIONAL_ASSETS);
  } catch (error) {
    await caches.delete(ASSET_CACHE);
    throw error;
  }

  if (isDev) console.log('[SW] Precache completed');
}

/**
 * Remove only old caches owned by this worker.
 *
 * @returns {Promise<void>}
 */
async function deleteOldCaches() {
  const currentCaches = new Set([ASSET_CACHE, PAGE_CACHE]);
  const cacheNames = await caches.keys();

  await Promise.all(
    cacheNames
      .filter(
        (cacheName) =>
          cacheName.startsWith(CACHE_PREFIX) && !currentCaches.has(cacheName),
      )
      .map((cacheName) => {
        if (isDev) console.log('[SW] Deleting old cache:', cacheName);
        return caches.delete(cacheName);
      }),
  );
}

/**
 * Enable navigation preload when the browser supports it.
 *
 * @returns {Promise<void>}
 */
async function enableNavigationPreload() {
  if (!sw.registration.navigationPreload) return;

  try {
    await sw.registration.navigationPreload.enable();
    if (isDev) console.log('[SW] Navigation preload enabled');
  } catch (error) {
    console.warn('[SW] Navigation preload could not be enabled:', error);
  }
}

/**
 * Normalize a navigation path for route-level offline caching.
 *
 * @param {URL} url
 * @returns {string}
 */
function getNavigationPath(url) {
  if (url.pathname === '/') return '/';
  return url.pathname.replace(/\/$/, '');
}

/**
 * Determine if a route document should be cached for offline navigation.
 *
 * @param {URL} url
 * @returns {boolean}
 */
function shouldCacheNavigation(url) {
  return OFFLINE_NAVIGATION_PATHS.has(getNavigationPath(url));
}

/**
 * Build a stable, query-free cache key for a route document.
 *
 * @param {URL} url
 * @returns {Request}
 */
function getNavigationCacheKey(url) {
  return new Request(`${url.origin}${getNavigationPath(url)}`);
}

/**
 * Determine whether a navigation response is safe to retain.
 *
 * @param {URL} requestUrl
 * @param {Response} response
 * @returns {boolean}
 */
function isCacheableNavigationResponse(requestUrl, response) {
  if (
    !shouldCacheNavigation(requestUrl) ||
    response.status !== 200 ||
    response.type === 'opaque' ||
    response.redirected
  ) {
    return false;
  }

  const contentType = response.headers.get('content-type')?.toLowerCase();
  if (!contentType?.includes('text/html')) return false;

  const cacheControl = response.headers.get('cache-control')?.toLowerCase();
  if (cacheControl?.includes('no-store') || cacheControl?.includes('private')) {
    return false;
  }

  try {
    const responseUrl = new URL(response.url);
    return (
      responseUrl.origin === requestUrl.origin &&
      getNavigationPath(responseUrl) === getNavigationPath(requestUrl)
    );
  } catch (_error) {
    return false;
  }
}

/**
 * Cache an approved route document.
 *
 * @param {URL} url
 * @param {Response} response
 * @returns {Promise<void>}
 */
async function cacheNavigationResponse(url, response) {
  if (!isCacheableNavigationResponse(url, response)) return;

  const cache = await caches.open(PAGE_CACHE);
  await cache.put(getNavigationCacheKey(url), response);

  if (isDev) console.log('[SW] Cached navigation:', url.pathname);
}

/**
 * Cache a navigation response without allowing a cache write failure to affect
 * the response already being returned to the browser.
 *
 * @param {FetchEvent} event
 * @param {URL} url
 * @param {Response} response
 */
function cacheNavigationInBackground(event, url, response) {
  event.waitUntil(
    cacheNavigationResponse(url, response.clone()).catch((error) => {
      console.warn('[SW] Navigation response was not cached:', error);
    }),
  );
}

/**
 * Return an approved cached route or the generic offline document.
 *
 * @param {URL} url
 * @returns {Promise<Response>}
 */
async function getOfflineNavigationResponse(url) {
  if (shouldCacheNavigation(url)) {
    const pageCache = await caches.open(PAGE_CACHE);
    const cachedNavigation = await pageCache.match(getNavigationCacheKey(url));
    if (cachedNavigation) return cachedNavigation;
  }

  const assetCache = await caches.open(ASSET_CACHE);
  const offline = await assetCache.match('/offline.html');
  if (offline) return offline;

  return new Response('<h1>Offline</h1>', {
    status: 503,
    headers: {
      'Cache-Control': 'no-store',
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}

/**
 * Use network-first handling for document navigations.
 *
 * @param {FetchEvent} event
 * @param {URL} url
 * @returns {Promise<Response>}
 */
async function handleNavigation(event, url) {
  try {
    const preloadResponse = await event.preloadResponse;
    if (preloadResponse) {
      cacheNavigationInBackground(event, url, preloadResponse);
      return preloadResponse;
    }

    const response = await fetch(event.request);
    cacheNavigationInBackground(event, url, response);
    return response;
  } catch (error) {
    if (isDev) {
      console.warn(
        '[SW] Navigation failed; using an offline response:',
        event.request.url,
        error,
      );
    }

    return getOfflineNavigationResponse(url);
  }
}

/**
 * Use cache-first handling only for explicitly precached asset paths.
 *
 * @param {Request} request
 * @param {URL} url
 * @returns {Promise<Response>}
 */
async function handlePrecachedAsset(request, url) {
  const cache = await caches.open(ASSET_CACHE);
  const cached = await cache.match(url.pathname);
  if (cached) return cached;

  return fetch(request);
}

/**
 * Determine whether a same-origin request must remain network-only.
 *
 * @param {URL} url
 * @returns {boolean}
 */
function isNetworkOnlyPath(url) {
  return (
    url.pathname === '/api' ||
    url.pathname.startsWith('/api/') ||
    url.pathname.startsWith('/relay-')
  );
}

/**
 * Activate an installed update only when the requesting page is the sole
 * top-level window for this origin.
 *
 * @param {ExtendableMessageEvent} event
 * @returns {Promise<void>}
 */
async function activateIfSoleWindowClient(event) {
  const windowClients = /** @type {readonly WindowClient[]} */ (
    await sw.clients.matchAll({
      includeUncontrolled: true,
      type: 'window',
    })
  );
  const topLevelClients = windowClients.filter(
    (client) => client.frameType === 'top-level',
  );
  const willActivate = topLevelClients.length <= 1;

  event.ports[0]?.postMessage({
    type: 'SOLE_CLIENT_ACTIVATION_RESULT',
    willActivate,
  });

  if (willActivate) await sw.skipWaiting();
}

sw.addEventListener('install', (event) => {
  event.waitUntil(installWorker());
});

sw.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      await Promise.all([deleteOldCaches(), enableNavigationPreload()]);
      await sw.clients.claim();
    })(),
  );
});

// Updated workers remain waiting until a controlled client begins an eligible
// internal navigation. That client requests activation, then completes the
// navigation after controllerchange.
sw.addEventListener('message', (event) => {
  if (event.data?.type !== 'ACTIVATE_IF_SOLE_CLIENT') return;
  event.waitUntil(activateIfSoleWindowClient(event));
});

sw.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const requestUrl = new URL(event.request.url);

  // Cross-origin requests include analytics and other third-party traffic.
  // They must never enter this worker's caches.
  if (requestUrl.origin !== location.origin) return;
  if (isNetworkOnlyPath(requestUrl)) return;

  if (event.request.mode === 'navigate') {
    event.respondWith(handleNavigation(event, requestUrl));
    return;
  }

  if (PRECACHED_PATHS.has(requestUrl.pathname)) {
    event.respondWith(handlePrecachedAsset(event.request, requestUrl));
  }
});
