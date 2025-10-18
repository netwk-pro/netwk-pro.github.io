/* ==========================================================================
src/lib/utils/initAnalytics.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * @file initAnalytics.js
 * @description Helper utility for initializing analytics.
 *
 * @module src/lib/utils
 * @author Scott Lopez
 * @updated 2025-10-17
 */

import { browser } from '$app/environment';
import { afterNavigate } from '$app/navigation';
import { appleTouchIcon, faviconSvg, logoPng, logoWbp } from '$lib';
import { registerServiceWorker } from '$lib/registerServiceWorker.js';
import { capture, initPostHog } from '$lib/stores/posthog';

/**
 * Initializes analytics and telemetry (e.g., PostHog tracking, asset preload).
 * Should be called once per app mount (e.g., from +layout.svelte).
 *
 * @returns {() => void} Cleanup function to unregister global event listeners
 */
export function initAnalytics() {
  if (!browser) return () => {};

  console.log('[APP] initAnalytics() running');

  registerServiceWorker();
  initPostHog();

  afterNavigate(() => {
    capture('$pageview');
  });

  // Track $pageleave
  let hasFiredLeave = false;
  const sendPageLeave = () => {
    if (hasFiredLeave) return;
    hasFiredLeave = true;
    capture('$pageleave');
  };

  window.addEventListener('pagehide', sendPageLeave);
  window.addEventListener('beforeunload', sendPageLeave);

  // Debug toggle logic
  const isDev = import.meta.env.MODE === 'development';
  const urlParams = new URLSearchParams(window.location.search);
  const debug = urlParams.get('debug') === 'true';

  if (isDev || debug) {
    console.log('ENV MODE =', import.meta.env.MODE);
    console.log('isDev =', isDev);
    console.log('debug param =', debug);
  }

  // Preload logo assets
  [logoPng, logoWbp, faviconSvg, appleTouchIcon].forEach((src) => {
    const img = new Image();
    img.src = src;
  });

  // Clean up listeners when component is destroyed
  return () => {
    window.removeEventListener('pagehide', sendPageLeave);
    window.removeEventListener('beforeunload', sendPageLeave);
  };
}
