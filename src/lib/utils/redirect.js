/* ==========================================================================
src/lib/utils/redirect.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * @file utm.js
 * @description Determines if the current browser is Firefox and skips redirect
 * visual if true.
 *
 * @module src/lib/utils/
 * @author Scott Lopez
 * @updated 2025-07-01
 */

/**
 * Checks whether the current browser is Firefox.
 * @returns {boolean} True if the browser is Firefox.
 */
function isFirefox() {
  return (
    typeof navigator !== 'undefined' &&
    navigator.userAgent.toLowerCase().includes('firefox')
  );
}

/**
 * Redirects to a URL, immediately in Firefox (to avoid popup heuristics),
 * and with a visual delay in all other browsers.
 *
 * @param {string} to - Destination URL
 * @param {number} delay - Delay in seconds (ignored for Firefox)
 */
export function redirectWithBrowserAwareness(to, delay = 2) {
  if (!to) {
    console.warn('⛔ No redirect target provided');
    return;
  }

  if (isFirefox()) {
    console.log('🦊 Firefox detected — redirecting immediately');
    window.location.replace(to);
  } else {
    console.log(`✅ Delayed redirect to: ${to} after ${delay}s`);
    setTimeout(() => {
      window.location.replace(to);
    }, delay * 1000);
  }
}
