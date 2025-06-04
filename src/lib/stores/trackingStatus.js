/* ==========================================================================
src/lib/stores/trackingStatus.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
========================================================================== */

/**
 * @file trackingStatus.js
 * @description Tracks state of PostHog tracking status for instant updates
 * in Privacy Policy and Privacy Dashboard.
 * @module src/lib/stores
 */

import { writable } from "svelte/store";

/**
 * Writable tracking status store.
 * Initialized with fallback value and updated in browser context.
 * @type {import("svelte/store").Writable<string>}
 */
export const trackingStatus = writable("⏳ Checking tracking preferences...");

// Dynamically import browser-only logic after mount
if (typeof window !== "undefined") {
  import("$lib/utils/trackingStatus.js").then(({ getTrackingPreferences }) => {
    const prefs = getTrackingPreferences();
    trackingStatus.set(prefs.status);
  });
}
