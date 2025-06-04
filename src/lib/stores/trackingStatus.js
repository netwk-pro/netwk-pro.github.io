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

export const trackingStatus = writable("unknown");
