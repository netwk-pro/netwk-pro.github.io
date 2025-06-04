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

import { getTrackingPreferences } from "$lib/utils/trackingStatus.js";
import { writable } from "svelte/store";

/**
 * Writable store representing current tracking preference summary status.
 * Uses SSR-safe initialization by deferring access to browser-only logic.
 * @type {import("svelte/store").Writable<string>}
 */
export const trackingStatus = writable(
  typeof window !== "undefined"
    ? getTrackingPreferences().status
    : "⏳ Checking tracking preferences...",
);
