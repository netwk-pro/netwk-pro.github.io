/* ==========================================================================
src/lib/utils/initAnalytics.js

Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * @file initAnalytics.js
 * @description Helper utility for initializing analytics.
 *
 * @module src/lib/utils
 * @author Scott Lopez
 * @updated 2026-08-09
 */

import { browser } from '$app/env';
import { registerServiceWorker } from '#lib/registerServiceWorker.js';
import { capture, initPostHog } from '#lib/stores/posthog.js';

/**
 * Records a pageview for a completed SvelteKit navigation.
 *
 * Register this with `afterNavigate()` during component initialization (see
 * src/routes/+layout.svelte). It must not be registered from inside an
 * `onMount` callback: in a legacy-mode component, the nested `onMount` that
 * `afterNavigate` uses internally is appended to the mount-callback list
 * while that list is already running, so it never runs and no pageview is
 * ever recorded.
 *
 * Exactly one pageview is recorded for:
 * - the initial page load (`type: 'enter'`), using the browser's own
 *   referrer; and
 * - each genuine page transition, i.e. the pathname or query string changed,
 *   with the previous page's URL as the referrer.
 *
 * Same-page links, hash-only navigation, and refreshes of the current URL are
 * ignored so they never produce duplicate pageviews. Consent, privacy, and
 * environment restrictions are enforced by `capture()`.
 *
 * @param {import('$app/navigation').AfterNavigate} navigation - The completed
 *   navigation.
 * @returns {void}
 */
export function trackPageview(navigation) {
  if (!browser) return;

  const { type, from, to } = navigation;
  if (!to) return;

  if (type === 'enter' || !from) {
    capture('$pageview');
    return;
  }

  const isSamePage =
    from.url.pathname === to.url.pathname && from.url.search === to.url.search;
  if (isSamePage) return;

  capture('$pageview', { referrer: from.url.href });
}

/**
 * Initializes analytics compatibility hooks and asset preload.
 * Should be called once per app mount (e.g., from +layout.svelte).
 *
 * Pageviews are recorded separately by {@link trackPageview}, which the
 * layout registers with `afterNavigate()` during component initialization.
 *
 * @returns {() => void} Cleanup function to unregister global event listeners
 */
export function initAnalytics() {
  if (!browser) return () => {};

  console.log('[APP] initAnalytics() running');

  registerServiceWorker();
  initPostHog();

  // Preserve the existing analytics event hook for future providers.
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

  // Clean up listeners when component is destroyed
  return () => {
    window.removeEventListener('pagehide', sendPageLeave);
    window.removeEventListener('beforeunload', sendPageLeave);
  };
}
