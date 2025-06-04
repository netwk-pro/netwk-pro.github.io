/* ==========================================================================
src/lib/utils/privacy.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * @file privacy.js
 * @description Determines whether the user allows tracking based on DNT, GPC, or manual opt-out.
 * @module src/lib/utils/
 * @author SunDevil311
 * @updated 2025-06-03
 */

/**
 * Check if user has manually set tracking preference.
 * @returns {boolean}
 */
export function hasUserManuallySetTrackingPreference() {
  const cookies = document.cookie;
  return (
    cookies.includes("enable_tracking=true") ||
    cookies.includes("disable_tracking=true")
  );
}

/**
 * Determine if the user allows tracking based on cookies, DNT, and GPC.
 * @returns {boolean}
 */
export function shouldTrackUser() {
  const cookies = document.cookie;
  const windowDNT = /** @type {any} */ (window).doNotTrack;
  const navigatorGPC = /** @type {any} */ (navigator).globalPrivacyControl;

  const dnt = navigator.doNotTrack === "1" || windowDNT === "1";
  const gpc = navigatorGPC === true;

  const manualOptOut = cookies.includes("disable_tracking=true");
  const manualOptIn = cookies.includes("enable_tracking=true");

  console.log("[Privacy] Opt-in cookie present:", manualOptIn);
  console.log("[Privacy] Opt-out cookie present:", manualOptOut);

  if (manualOptIn) return true;
  if (manualOptOut) return false;

  return !dnt && !gpc;
}

/**
 * Determines if user should be reminded to reconsent (after 6 months).
 * @returns {boolean}
 */
export function shouldRemindUserToReconsent() {
  if (!hasUserManuallySetTrackingPreference()) return false;

  const match = document.cookie.match(/tracking_consent_timestamp=(\d+)/);
  if (!match) return true;

  const timestamp = Number(match[1]);
  if (isNaN(timestamp)) return true;

  const age = Date.now() - timestamp;

  return age > 1000 * 60 * 60 * 24 * 180; // 6 months
}
