/* ==========================================================================
src/hooks.client.ts

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * Client-side error handler for SvelteKit. Captures uncaught errors
 * during client-side navigation or hydration.
 *
 * @param error - The uncaught error object
 */
export function handleError(error: Error) {
  console.error("[CLIENT] Unhandled error:", error);

  // Future: send to error reporting service
  // e.g., Sentry.captureException(error);
}
