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
 * @module src/lib/utils
 * @author SunDevil311
 * @updated 2025-06-01
 */

import createDOMPurify from "dompurify";

/**
 * @typedef {ReturnType<import('dompurify').default>} DOMPurifyInstance
 */

let DOMPurify;

/**
 * SSR-safe + Vite-compatible init of DOMPurify.
 *
 * @returns {Promise<DOMPurifyInstance>}
 */
export async function getDOMPurify() {
  if (typeof window !== "undefined") {
    // ✅ Client-side: use native window
    return createDOMPurify(window);
  } else {
    // ✅ SSR: dynamically import jsdom to avoid bundling
    const { JSDOM } = await import("jsdom");
    const window = new JSDOM("").window;
    return createDOMPurify(window);
  }
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
    ALLOWED_URI_REGEXP:
      /^(?:(?:https?|mailto):|[^a-z]|[a-z+.-]+(?:[^a-z+.-:]|$))/i,
  });
}

export default DOMPurify;
