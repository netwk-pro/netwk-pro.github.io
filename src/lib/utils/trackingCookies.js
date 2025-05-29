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
 * @updated 2025-05-28
 */

/**
 * Set a tracking preference cookie.
 * @param {"enable" | "disable"} type
 */
export function setTrackingPreference(type) {
  const maxAge = 60 * 60 * 24 * 365 * 10; // 10 years
  const cookieSettings = `path=/; max-age=${maxAge}; SameSite=Lax`;

  if (type === "enable") {
    document.cookie = `enable_tracking=true; ${cookieSettings}`;
    document.cookie = `disable_tracking=; path=/; max-age=0; SameSite=Lax`;
  } else if (type === "disable") {
    document.cookie = `disable_tracking=true; ${cookieSettings}`;
    document.cookie = `enable_tracking=; path=/; max-age=0; SameSite=Lax`;
  }
}

/**
 * Clear both tracking cookies.
 */
export function clearTrackingPreferences() {
  document.cookie = `enable_tracking=; path=/; max-age=0; SameSite=Lax`;
  document.cookie = `disable_tracking=; path=/; max-age=0; SameSite=Lax`;
}
