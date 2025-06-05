/* ==========================================================================
src/lib/stores/posthog.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
========================================================================== */

/**
 * @file posthog.js
 * @description Privacy-aware PostHog tracking store with reactive state and safe API surface.
 * @module src/lib/stores
 */

import {
  remindUserToReconsent,
  trackingPreferences,
} from "$lib/stores/trackingPreferences.js";
import { get, writable } from "svelte/store";

/**
 * Tracks whether tracking is allowed based on cookies, DNT/GPC, and user preference.
 * @type {import("svelte/store").Writable<boolean>}
 */
export const trackingEnabled = writable(false);

/**
 * Determines if the user should be reminded to re-consent (after 6 months).
 * @type {import("svelte/store").Writable<boolean>}
 */
export const showReminder = writable(false);

/** @type {boolean} Internal one-time init guard */
let initialized = false;

/** @type {import("posthog-js").PostHog | null} Loaded PostHog instance */
let ph = null;

/**
 * Initializes the PostHog analytics client if tracking is permitted.
 * Uses dynamic import to avoid SSR failures.
 * @returns {Promise<void>}
 */
export async function initPostHog() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;

  const { enabled } = get(trackingPreferences);
  trackingEnabled.set(enabled);
  showReminder.set(get(remindUserToReconsent)); // ✅ use derived store instead

  if (!enabled) {
    console.log("[PostHog] Tracking is disabled — skipping init.");
    return;
  }

  const posthogModule = await import("posthog-js");
  ph = posthogModule.default;

  // cspell:disable-next-line
  ph.init("phc_Qshfo6AXzh4pS7aPigfqyeo4qj1qlyh7gDuHDeVMSR0", {
    api_host: "https://us.i.posthog.com",
    autocapture: true,
    capture_pageview: false,
    person_profiles: "identified_only",
    loaded: (phInstance) => {
      if (!enabled) {
        console.log(
          "[PostHog] ⛔ User opted out — calling opt_out_capturing()",
        );
        phInstance.opt_out_capturing();
      } else {
        console.log("[PostHog] ✅ Tracking enabled");
      }
    },
  });

  ph.capture("$pageview");
}

/**
 * Conditionally captures an event if tracking is enabled.
 * @param {string} event - The event name to track
 * @param {Record<string, any>} [properties={}] - Optional event properties
 */
export function capture(event, properties = {}) {
  if (ph !== null && get(trackingEnabled)) {
    ph.capture(event, properties);
  }
}

/**
 * Conditionally identifies a user if tracking is enabled.
 * @param {string} id - Unique user identifier
 * @param {Record<string, any>} [properties={}] - Optional user traits
 */
export function identify(id, properties = {}) {
  if (ph !== null && get(trackingEnabled)) {
    ph.identify(id, properties);
  }
}

/**
 * For test cleanup only — resets internal state.
 * No-op in production.
 * @returns {void}
 */
export function _resetPostHog() {
  if (import.meta.env.MODE === "production") {
    console.warn("[PostHog] _resetPostHog() called in production — no-op");
    return;
  }

  initialized = false;
  ph = null;
}
