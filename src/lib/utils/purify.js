/* ==========================================================================
src/lib/utils/purify.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * @file purify.js
 * @description Universal DOMPurify instance for SSR + client with safe build support.
 * Secures untrusted HTML before injecting it into the DOM.
 * @module src/lib/utils/
 * @author Scott Lopez
 * @updated 2025-06-01
 */

import createDOMPurify from 'dompurify';

/**
 * @typedef {ReturnType<import('dompurify').default>} DOMPurifyInstance
 */

/** @type {import('dompurify').DOMPurify | null} */
let DOMPurifyInstance = null;

/** @type {import('jsdom').JSDOM['window'] | null} */
let jsdomWindow = null;

/**
 * SSR-safe + Vite-compatible init of DOMPurify.
 *
 * Caches DOMPurify across multiple calls to improve performance in tests or SSR environments.
 *
 * @returns {Promise<DOMPurifyInstance>}
 */
export async function getDOMPurify() {
  if (DOMPurifyInstance) return DOMPurifyInstance;

  if (typeof window !== 'undefined') {
    // ✅ Client-side: use native window
    DOMPurifyInstance = createDOMPurify(window);
  } else {
    // ✅ SSR: dynamically import jsdom to avoid bundling
    const { JSDOM } = await import('jsdom');
    jsdomWindow = jsdomWindow || new JSDOM('').window;
    DOMPurifyInstance = createDOMPurify(jsdomWindow);
  }

  return DOMPurifyInstance;
}

/**
 * Sanitizes HTML content to prevent XSS.
 *
 * @param {string} dirtyHtml
 * @returns {Promise<string>} - A Promise resolving to sanitized HTML
 */
export async function sanitizeHtml(dirtyHtml) {
  const DOMPurify = await getDOMPurify();
  return DOMPurify.sanitize(dirtyHtml, {
    USE_PROFILES: { html: true },
    ALLOW_DATA_ATTR: false,
    ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto):)/i,
  });
}

/**
 * Optional helper to reset cache (for test isolation).
 */
export function resetDOMPurifyCache() {
  DOMPurifyInstance = null;
  jsdomWindow = null;
}
