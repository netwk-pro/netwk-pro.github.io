/* ==========================================================================
src/lib/utils/trackingCookies.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * @file trackingCookies.js
 * @description Handles setting, clearing, and toggling tracking preference cookies.
 * @module src/lib/utils/
 * @author SunDevil311
 * @updated 2025-06-04
 */

// 6 months (in seconds). Will be centralized later.
const DEFAULT_COOKIE_MAX_AGE = 60 * 60 * 24 * 180;

/**
 * Builds a standard cookie string for use in all tracking cookies.
 * @param {number} maxAge
 * @returns {string}
 */
function buildCookieSettings(maxAge) {
  return `path=/; max-age=${maxAge}; expires=${new Date(Date.now() + maxAge * 1000).toUTCString()}; SameSite=Lax; Secure`;
}

/**
 * Sets tracking preference cookies based on type.
 * @param {"enable" | "disable"} type
 * @param {number} [maxAge=DEFAULT_COOKIE_MAX_AGE]
 */
export function setTrackingPreference(type, maxAge = DEFAULT_COOKIE_MAX_AGE) {
  if (typeof document === "undefined") return; // SSR guard

  const cookieSettings = buildCookieSettings(maxAge);
  const now = Date.now();

  if (type === "enable") {
    document.cookie = `enable_tracking=true; ${cookieSettings}`;
    document.cookie = `tracking_consent_timestamp=${now}; ${cookieSettings}`;
    clearCookie("disable_tracking");
  } else if (type === "disable") {
    document.cookie = `disable_tracking=true; ${cookieSettings}`;
    document.cookie = `tracking_consent_timestamp=${now}; ${cookieSettings}`;
    clearCookie("enable_tracking");
  }
}

/**
 * Clears all tracking-related cookies.
 */
export function clearTrackingPreferences() {
  if (typeof document === "undefined") return; // SSR guard

  clearCookie("enable_tracking");
  clearCookie("disable_tracking");
  clearCookie("tracking_consent_timestamp");
}

/**
 * Clears an individual cookie.
 * @param {string} name
 */
function clearCookie(name) {
  if (typeof document === "undefined") return; // SSR guard

  document.cookie = `${name}=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax; Secure`;
}
