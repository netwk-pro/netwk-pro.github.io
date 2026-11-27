/* ==========================================================================
src/lib/registerServiceWorker.js

Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

import { unregisterServiceWorker } from '#lib/unregisterServiceWorker.js';

const ACTIVATION_TIMEOUT_MS = 2000;
const ACTIVATE_WAITING_WORKER_MESSAGE = { type: 'ACTIVATE_WAITING_WORKER' };
const CACHE_NAVIGATION_MESSAGE_TYPE = 'CACHE_NAVIGATION';

/** @type {ServiceWorkerRegistration | null} */
let serviceWorkerRegistration = null;

/** @type {ServiceWorker | null} */
let currentController = null;

/** @type {string | null} */
let pendingNavigationUrl = null;

/** @type {number | undefined} */
let activationTimeoutId;

let activationInProgress = false;
let controllerTrackingInitialized = false;
let registrationStarted = false;
let reloading = false;

/**
 * Clear resources associated with an activation request.
 */
function clearActivationRequest() {
  if (activationTimeoutId !== undefined) {
    window.clearTimeout(activationTimeoutId);
    activationTimeoutId = undefined;
  }
}

/**
 * Complete the navigation that triggered activation. This timeout fallback
 * prevents a failed lifecycle transition from trapping the user on a page.
 */
function continuePendingNavigation() {
  if (!pendingNavigationUrl || reloading) return;

  reloading = true;
  activationInProgress = false;
  const destination = pendingNavigationUrl;
  pendingNavigationUrl = null;

  window.location.assign(destination);
}

/**
 * Reload existing controlled tabs when a new worker takes control. The tab
 * that requested activation proceeds to its intended destination instead.
 */
function handleControllerChange() {
  const hadController = currentController !== null;
  currentController = navigator.serviceWorker.controller;

  // clients.claim() also fires controllerchange after the first installation.
  // That initial transition does not require a reload.
  if (!hadController || reloading) return;

  console.log('[SW-CLIENT] Updated service worker is active');
  clearActivationRequest();

  if (pendingNavigationUrl) {
    continuePendingNavigation();
    return;
  }

  reloading = true;
  window.location.reload();
}

/**
 * Observe an installing worker for diagnostics. Activation remains under the
 * browser's default control until an eligible internal navigation occurs.
 *
 * @param {ServiceWorkerRegistration} registration
 */
function observeInstallingWorker(registration) {
  registration.addEventListener('updatefound', () => {
    const installingWorker = registration.installing;
    if (!installingWorker) return;

    console.log('[SW-CLIENT] New service worker installing');
    installingWorker.addEventListener('statechange', () => {
      console.log(
        '[SW-CLIENT] New service worker state:',
        installingWorker.state,
      );

      if (
        installingWorker.state === 'installed' &&
        navigator.serviceWorker.controller
      ) {
        console.log('[SW-CLIENT] Updated service worker is waiting');
      }
    });
  });
}

/**
 * Register the worker after the document load event.
 *
 * @returns {Promise<void>}
 */
async function registerWorker() {
  try {
    // SvelteKit 3 bundles the service worker as an ES module in every mode,
    // so it must always be registered with type 'module'. Browsers without
    // module service worker support reject here; the catch below keeps the
    // site fully functional without offline caching.
    const registration = await navigator.serviceWorker.register(
      '/service-worker.js',
      {
        type: 'module',
      },
    );

    serviceWorkerRegistration = registration;
    observeInstallingWorker(registration);

    console.log(
      '[SW-CLIENT] Service worker registered with scope:',
      registration.scope,
    );

    if (registration.waiting) {
      console.log(
        '[SW-CLIENT] Activating an already-waiting service worker',
      );
      registration.waiting.postMessage(ACTIVATE_WAITING_WORKER_MESSAGE);
    }
  } catch (error) {
    console.error('[SW-CLIENT] Service worker registration failed:', error);
  }
}

/**
 * Determine whether a SvelteKit navigation is an appropriate activation point.
 * Only application-owned link and goto navigations are eligible. External
 * links, forms, history traversal, unloads, and hash-only changes are ignored.
 *
 * @param {import('$app/navigation').BeforeNavigate} navigation
 * @returns {boolean}
 */
export function shouldInterceptServiceWorkerNavigation(navigation) {
  if (
    !navigation.to ||
    navigation.willUnload ||
    navigation.to.route.id === null ||
    (navigation.type !== 'link' && navigation.type !== 'goto')
  ) {
    return false;
  }

  if (!navigation.from) return true;

  const currentUrl = navigation.from.url;
  const destinationUrl = navigation.to.url;
  const isHashOnlyNavigation =
    currentUrl.pathname === destinationUrl.pathname &&
    currentUrl.search === destinationUrl.search &&
    currentUrl.hash !== destinationUrl.hash;

  return !isHashOnlyNavigation;
}

/**
 * Ask a waiting worker to activate before an internal navigation. Returns true
 * when the caller should cancel the current navigation; controllerchange then
 * completes that navigation and reloads other controlled tabs.
 *
 * @param {URL} destination
 * @returns {boolean}
 */
export function activateWaitingServiceWorkerForNavigation(destination) {
  if (destination.origin !== window.location.origin) return false;
  if (activationInProgress) return true;

  const waitingWorker = serviceWorkerRegistration?.waiting;
  if (!waitingWorker) return false;

  activationInProgress = true;
  pendingNavigationUrl = destination.href;

  try {
    console.log('[SW-CLIENT] Activating waiting worker before navigation');
    waitingWorker.postMessage(ACTIVATE_WAITING_WORKER_MESSAGE);
  } catch (error) {
    clearActivationRequest();
    activationInProgress = false;
    pendingNavigationUrl = null;
    console.warn('[SW-CLIENT] Could not request update activation:', error);
    return false;
  }

  activationTimeoutId = window.setTimeout(() => {
    activationTimeoutId = undefined;
    continuePendingNavigation();
  }, ACTIVATION_TIMEOUT_MS);

  return true;
}

/**
 * Ask the controlling service worker to cache the document for a route that
 * was reached through client-side routing.
 *
 * Client-side navigations only fetch route data, so the worker's navigation
 * handler never sees them. This preserves offline support for the worker's
 * approved routes, which previously were cached when loaded as full pages.
 * The worker applies its own allowlist and cacheability checks. Initial page
 * loads (`enter`) are skipped because the worker already sees that request.
 *
 * @param {import('$app/navigation').AfterNavigate} navigation - The completed
 *   navigation.
 * @returns {void}
 */
export function cacheClientNavigation(navigation) {
  if (navigation.type === 'enter' || !navigation.to) return;

  const controller = navigator.serviceWorker?.controller;
  const url = navigation.to.url;
  if (!controller || url.origin !== window.location.origin) return;

  controller.postMessage({
    type: CACHE_NAVIGATION_MESSAGE_TYPE,
    url: url.href,
  });
}

/**
 * Register the service worker and install-prompt lifecycle listeners.
 * Workers already waiting after registration activate immediately. Later
 * updates activate when an eligible internal navigation requests activation.
 */
export function registerServiceWorker() {
  const disableSW = window.__DISABLE_SW__ || location.search.includes('nosw');

  if (disableSW) {
    console.warn('[SW-CLIENT] Registration disabled via diagnostic mode');
    unregisterServiceWorker();
    return;
  }

  if (!('serviceWorker' in navigator) || registrationStarted) return;

  const isFirefox = navigator.userAgent.includes('Firefox');
  if (isFirefox && import.meta.env.DEV) {
    console.info(
      '[SW-CLIENT] Development mode in Firefox; unregistering workers',
    );
    unregisterServiceWorker();
    return;
  }

  registrationStarted = true;

  if (!controllerTrackingInitialized) {
    currentController = navigator.serviceWorker.controller;
    navigator.serviceWorker.addEventListener(
      'controllerchange',
      handleControllerChange,
    );
    controllerTrackingInitialized = true;
  }

  if (document.readyState === 'complete') {
    void registerWorker();
  } else {
    window.addEventListener('load', () => void registerWorker(), {
      once: true,
    });
  }

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    window.dispatchEvent(
      new CustomEvent('pwa-install-available', {
        detail: /** @type {BeforeInstallPromptEvent} */ (event),
      }),
    );
  });
}

// cspell:ignore nosw beforeinstallprompt
