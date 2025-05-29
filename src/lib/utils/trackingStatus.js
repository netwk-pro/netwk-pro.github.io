/* ==========================================================================
src/lib/utils/trackingStatus.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * @file trackingStatus.js
 * @description Get tracking preferences based on cookies and browser privacy signals.
 * @module src/lib/utils/
 * @author SunDevil311
 * @updated 2025-05-28
 */

/**
 * @returns {{
 *   optedOut: boolean,
 *   optedIn: boolean,
 *   dnt: boolean,
 *   gpc: boolean,
 *   status: string
 * }}
 */
export function getTrackingPreferences() {
  const cookies = document.cookie;
  const optedOut = cookies.includes("disable_tracking=true");
  const optedIn = cookies.includes("enable_tracking=true");
  const dnt = navigator.doNotTrack === "1";

  // @ts-expect-error: 'globalPrivacyControl' is a non-standard property
  const gpc = navigator.globalPrivacyControl === true;

  let status = "⚙️ Using default settings (tracking enabled)";

  if (optedOut) {
    status = "🔒 Tracking disabled (manual opt-out)";
  } else if (optedIn) {
    status = "✅ Tracking enabled (manual opt-in)";
  } else if (dnt || gpc) {
    status = "🛑 Tracking disabled (via browser signal)";
  }

  return { optedOut, optedIn, dnt, gpc, status };
}
