/* ==========================================================================
src/routes/+page.server.js

SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

import { defaultMeta, meta } from "$lib/meta.js";

export const prerender = false;

/**
 * @typedef {object} MetaData
 * @property {string} title - The title of the page
 * @property {string} description - The description of the page
 */

/**
 * Load metadata for the root route.
 *
 * @returns {{ meta: MetaData }}
 */
export function load() {
  return {
    meta: meta["/"] || defaultMeta,
  };
}
