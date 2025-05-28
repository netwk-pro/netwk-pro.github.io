/* ==========================================================================
src/lib/utils/privacy.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * Determines whether the user allows tracking based on DNT or GPC signals.
 * @returns {boolean}
 */
export function shouldTrackUser() {
  /** @type {string | undefined} */
  const windowDNT = /** @type {any} */ (window).doNotTrack;
  /** @type {boolean | undefined} */
  const navigatorGPC = /** @type {any} */ (navigator).globalPrivacyControl;

  const dnt = navigator.doNotTrack === "1" || windowDNT === "1";
  const gpc = navigatorGPC === true;

  return !dnt && !gpc;
}
