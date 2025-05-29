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
 * @updated 2025-05-28
 */

/**
 * @returns {boolean}
 */
export function shouldTrackUser() {
  const windowDNT = /** @type {any} */ (window).doNotTrack;
  const navigatorGPC = /** @type {any} */ (navigator).globalPrivacyControl;

  const dnt = navigator.doNotTrack === "1" || windowDNT === "1";
  const gpc = navigatorGPC === true;

  const manualOptOut = document.cookie.includes("disable_tracking=true");
  const manualOptIn = document.cookie.includes("enable_tracking=true");

  console.log("[Privacy] Opt-in cookie present:", manualOptIn);
  console.log("[Privacy] Opt-out cookie present:", manualOptOut);

  // Opt-in overrides everything; opt-out disables regardless of DNT/GPC
  if (manualOptIn) return true;
  if (manualOptOut) return false;

  return !dnt && !gpc;
}
