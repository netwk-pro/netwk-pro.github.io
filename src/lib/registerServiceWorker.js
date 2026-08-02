/* ==========================================================================
src/lib/registerServiceWorker.js

Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

import { goto } from '$app/navigation';
import { unregisterServiceWorker } from '$lib/unregisterServiceWorker';

const ACTIVATION_TIMEOUT_MS = 5000;

/** @type {ServiceWorkerRegistration | null} */
let serviceWorkerRegistration = null;

/** @type {ServiceWorker | null} */
let currentController = null;

/** @type {string | null} */
let pendingNavigationUrl = null;

/** @type {number | undefined} */
let activationTimeoutId;

/** @type {MessagePort | null} */
let activationResponsePort = null;

/** @type {string | null} */
let bypassNavigationUrl = null;

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

  activationResponsePort?.close();
  activationResponsePort = null;
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

  clearActivationRequest();

  if (pendingNavigationUrl) {
    continuePendingNavigation();
    return;
  }

  reloading = true;
  window.location.reload();
}

/**
 * Resume the canceled navigation through SvelteKit when another top-level tab
 * prevents safe activation.
 */
function resumePendingSvelteKitNavigation() {
  if (!pendingNavigationUrl || reloading) return;

  activationInProgress = false;
  const destination = pendingNavigationUrl;
  pendingNavigationUrl = null;
  bypassNavigationUrl = destination;

  void goto(destination).catch((error) => {
    bypassNavigationUrl = null;
    console.warn(
      '[SW-CLIENT] Could not resume client navigation; using full navigation',
      error,
    );
    window.location.assign(destination);
  });
}

/**
 * Process the waiting worker's sole-client activation decision.
 *
 * @param {MessageEvent} event
 */
function handleActivationDecision(event) {
  if (event.data?.type !== 'SOLE_CLIENT_ACTIVATION_RESULT') return;

  activationResponsePort?.close();
  activationResponsePort = null;

  if (event.data.willActivate) return;

  clearActivationRequest();
  resumePendingSvelteKitNavigation();
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
    const registration = await navigator.serviceWorker.register(
      '/service-worker.js',
      {
        type: import.meta.env.DEV ? 'module' : 'classic',
      },
    );

    serviceWorkerRegistration = registration;
    observeInstallingWorker(registration);

    console.log(
      '[SW-CLIENT] Service worker registered with scope:',
      registration.scope,
    );

    if (registration.waiting) {
      console.log('[SW-CLIENT] An update is waiting for the next navigation');
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
 * @param {import('@sveltejs/kit').BeforeNavigate} navigation
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

  if (bypassNavigationUrl === navigation.to.url.href) {
    bypassNavigationUrl = null;
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
 * Ask a waiting worker to activate before an internal navigation, but only if
 * this is the sole top-level tab. Returns true when the caller should cancel
 * the current navigation while the worker decides. A denied request resumes
 * through SvelteKit; controllerchange completes an accepted request.
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
    const messageChannel = new MessageChannel();
    activationResponsePort = messageChannel.port1;
    activationResponsePort.onmessage = handleActivationDecision;
    waitingWorker.postMessage(
      { type: 'ACTIVATE_IF_SOLE_CLIENT' },
      [messageChannel.port2],
    );
  } catch (error) {
    clearActivationRequest();
    activationInProgress = false;
    pendingNavigationUrl = null;
    console.warn('[SW-CLIENT] Could not request update activation:', error);
    return false;
  }

  activationTimeoutId = window.setTimeout(() => {
    activationTimeoutId = undefined;
    activationResponsePort?.close();
    activationResponsePort = null;
    continuePendingNavigation();
  }, ACTIVATION_TIMEOUT_MS);

  return true;
}

/**
 * Register the service worker and install-prompt lifecycle listeners.
 * Updated workers wait until an eligible internal navigation requests
 * activation; otherwise normal browser lifecycle behavior applies.
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
