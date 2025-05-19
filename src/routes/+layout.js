/* ==========================================================================
src/routes/+layout.js

SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * @typedef {object} MetaData
 * @property {string} title - The title of the page
 * @property {string} description - The description of the page
 */

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

  return {
    pathname: normalizedPathname,
    meta: fallbackMeta, // Required to ensure meta always exists for typing
  };
}
