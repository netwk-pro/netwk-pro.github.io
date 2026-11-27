/* ==========================================================================
src/hooks.client.ts

Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

import type { HandleClientError } from '@sveltejs/kit/hooks';

// Client-only lifecycle hooks

// Optional: Used if you later need client boot logic
export const init = undefined;

/**
 * Whether an error is a browser network failure from `fetch()`, such as when
 * the device is offline. Browsers reject `fetch()` with a `TypeError` whose
 * message varies ("Failed to fetch", "NetworkError ...", "Load failed").
 *
 * @param error - The caught error
 * @returns True if the error represents a network failure
 */
function isNetworkFailure(error: unknown): boolean {
  if (!(error instanceof TypeError)) return false;
  if (navigator.onLine === false) return true;
  return /failed to fetch|networkerror|load failed/i.test(error.message);
}

/**
 * Client-side error handler for SvelteKit. Captures uncaught errors
 * during client-side navigation or hydration.
 *
 * SvelteKit 3 passes every client error (except redirects) to this hook,
 * including expected `app` errors and routine `framework` errors such as
 * 404s. Only unexpected (`unknown`) errors are logged. Returning nothing
 * keeps SvelteKit's default status and safe message.
 *
 * @param input - The caught error, its kind, and the navigation event
 */
export const handleError: HandleClientError = (input) => {
  if (input.kind !== 'unknown') return;

  // Client-side navigation loads route data with fetch(). If the network is
  // unavailable, fall back to a full-page navigation so the service worker
  // can serve a cached page or the offline document, as it did before
  // internal links were client-routed. The destination check prevents a
  // reload loop for errors on the current page.
  const destination = input.event.url;
  if (
    isNetworkFailure(input.error) &&
    destination.href !== window.location.href
  ) {
    window.location.assign(destination.href);
    return;
  }

  console.error('[CLIENT] Unhandled error:', input.error);

  // Future: send to error reporting service
  // e.g., Sentry.captureException(input.error);
};
