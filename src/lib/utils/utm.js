/* ==========================================================================
src/lib/utils/utm.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * Append UTM parameter from window.location to a given URL.
 * Returns `null` if not in a browser context.
 * @param {string} url - The base URL to append to
 * @returns {string | null}
 */
export function appendUTM(url) {
  if (typeof window === "undefined") return null;

  const utm = new URLSearchParams(window.location.search).get("utm_source");
  return utm ? `${url}?utm_source=${encodeURIComponent(utm)}` : url;
}
