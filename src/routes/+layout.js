/* ==========================================================================
src/routes/+layout.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * @typedef {object} MetaData
 * @property {string} title - The title of the page
 * @property {string} description - The description of the page
 */

import { meta as routeMeta } from "$lib/meta.js"; // Import meta from $lib/meta.js and alias it

/**
 * Fallback metadata to satisfy typing in +layout.svelte and +page.svelte.
 * Actual meta content is provided per-route via +page.server.js.
 */
const fallbackMeta = {
  title: "Security, Networking, Privacy — Network Pro™",
  description:
    "Locking Down Networks, Unlocking Confidence™ | Security, Networking, Privacy — Network Pro™",
};

export const prerender = "auto";
export const trailingSlash = "never";

/**
 * @param {{ url: URL }} param0
 * @returns {{ pathname: string, meta: MetaData }}
 */
export function load({ url }) {
  const normalizedPathname = url.pathname.replace(/\/+$/, "") || "/";

  // Check if meta data for the route exists in `meta.js`, otherwise use the fallback
  const currentMeta = routeMeta[normalizedPathname] || fallbackMeta;

  return {
    pathname: normalizedPathname,
    meta: currentMeta, // Return the meta data (either from the route or the fallback)
  };
}
