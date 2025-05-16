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
 * @type {Record<string, MetaData>}
 * Defines metadata for specific routes. The key is the pathname (string),
 * and the value is an object containing the title and description for the route.
 */
const meta = {
  "/": {
    title:
      "Locking Down Networks, Unlocking Confidence™ | Security, Networking, Privacy — Network Pro™",
    description:
      "Locking Down Networks, Unlocking Confidence™ | Security, Networking, Privacy — Network Pro™",
  },
  "/about": {
    title: "About Us — Network Pro™",
    description: "About Us | Security, Networking, Privacy — Network Pro™",
  },
  "/privacy-policy": {
    title: "Privacy Policy — Network Pro™",
    description:
      "Privacy Policy | Security, Networking, Privacy — Network Pro™",
  },
  "/terms-of-use": {
    title: "Website Terms of Use — Network Pro™",
    description:
      "Website Terms of Use | Security, Networking, Privacy — Network Pro™",
  },
  "/license": {
    title: "Legal, Copyright, and Licensing — Network Pro™",
    description:
      "Legal, Copyright, and Licensing | Security, Networking, Privacy — Network Pro™",
  },
  "/terms-conditions": {
    title: "Consulting Terms and Conditions — Network Pro™",
    description:
      "Terms and Conditions | Security, Networking, Privacy — Network Pro™",
  },
  "/foss-spotlight": {
    title: "FOSS Spotlight — Network Pro™",
    description:
      "FOSS Spotlight | Security, Networking, Privacy — Network Pro™",
  },
};

// Fallback metadata for all routes
const defaultMeta = {
  title: "Loading... | Network Pro™",
  description:
    "Please wait while the content loads... | Security, Networking, Privacy — Network Pro™",
};

export const prerender = "auto";
export const trailingSlash = "never";

/**
 * @param {{ url: URL }} param0
 * @returns {{ pathname: string, meta: MetaData }}
 * The load function returns the current pathname and the appropriate metadata
 * for the route, ensuring that default metadata is used if no specific route is defined.
 */
export function load({ url }) {
  // Normalize the pathname to remove trailing slashes
  const normalizedPathname = url.pathname.replace(/\/+$/, "") || "/";

  // Determine metadata based on static routes, fallback to defaultMeta
  const currentMeta = meta[normalizedPathname] || defaultMeta;

  // Return the metadata and pathname to the layout
  return {
    pathname: normalizedPathname,
    meta: currentMeta,
  };
}
