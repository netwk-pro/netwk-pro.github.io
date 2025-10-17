/* ==========================================================================
src/lib/utils/getUTMParams.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * @file getUTMParams.js
 * @description Utility to extract UTM parameters from a URL.
 * Useful for analytics platforms like PostHog or GA4.
 *
 * @module src/lib/utils/
 * @author Scott Lopez
 * @updated 2025-06-30
 */

/**
 * Extracts standard UTM parameters from a given URL string.
 *
 * @param {string} url - A full URL string (including query parameters)
 * @returns {{
 *   utm_source?: string,
 *   utm_medium?: string,
 *   utm_campaign?: string
 * }} An object containing the available UTM parameters, if present
 */
export function getUTMParams(url) {
  try {
    const { searchParams } = new URL(url);

    return {
      utm_source: searchParams.get('utm_source') || undefined,
      utm_medium: searchParams.get('utm_medium') || undefined,
      utm_campaign: searchParams.get('utm_campaign') || undefined,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.warn('[getUTMParams] Invalid URL:', url, '-', message);
    return {};
  }
}
