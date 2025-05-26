/* ==========================================================================
src/lib/utils/sanitize.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

// DOMPurify with JSDOM for SSR-compatible HTML sanitization
import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";

/**
 * Create a DOMPurify instance tied to a new JSDOM window.
 * You can reuse this instance for performance.
 */
const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

/**
 * @param {string} dirty - The untrusted HTML string
 * @param {object} [config] - Optional DOMPurify config overrides
 * @returns {string} - Sanitized HTML safe for injection via {@html}
 */
export function sanitizeHTML(dirty, config = {}) {
  return DOMPurify.sanitize(dirty, config);
}
