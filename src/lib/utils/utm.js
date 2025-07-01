/* ==========================================================================
src/lib/utils/utm.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * @file utm.js
 * @description Appends standardized UTM parameters to a given URL.
 * @module src/lib/utils/
 * @author SunDevil311
 * @updated 2025-06-30
 */

import { browser } from '$app/environment';
import { getStores } from '$app/stores';
import { get } from 'svelte/store';

/**
 * @param {string} url - The target URL to append UTM parameters to
 * @returns {string} URL with appended UTM parameters
 */
export function appendUTM(url) {
  if (!browser) return url;

  const { page } = getStores();
  const pathname = get(page).url.pathname;

  let campaign = 'internal'; // default fallback

  if (pathname.startsWith('/contact')) campaign = 'contact';
  else if (pathname.startsWith('/links')) campaign = 'links';
  else if (pathname.startsWith('/posts')) campaign = 'posts';
  else if (pathname.startsWith('/privacy-rights')) campaign = 'prights';
  // add more if needed

  const utmParams = new URLSearchParams({
    utm_source: 'netwk.pro',
    utm_medium: 'redirect',
    utm_campaign: campaign,
  });

  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}${utmParams.toString()}`;
}

// cspell:ignore prights
