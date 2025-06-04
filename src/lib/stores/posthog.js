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

import { afterNavigate } from "$app/navigation";
import {
  shouldRemindUserToReconsent,
  shouldTrackUser,
} from "$lib/utils/privacy.js";
import posthog from "posthog-js";
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

// Internal flag
let initialized = false;

/**
 * Initializes PostHog analytics client if tracking is permitted.
 *
 * @returns {void}
 */
export function initPostHog() {
  if (initialized) return;
  initialized = true;

  const allowTracking = shouldTrackUser();
  trackingEnabled.set(allowTracking);
  showReminder.set(shouldRemindUserToReconsent());

  if (!allowTracking) {
    console.log("[PostHog] Tracking is disabled — skipping init.");
    return;
  }

  // cspell:disable-next-line
  posthog.init("phc_Qshfo6AXzh4pS7aPigfqyeo4qj1qlyh7gDuHDeVMSR0", {
    api_host: "https://us.i.posthog.com",
    autocapture: true,
    capture_pageview: false,
    person_profiles: "identified_only",
    loaded: (ph) => {
      if (!allowTracking) {
        console.log(
          "[PostHog] ⛔ User opted out — calling opt_out_capturing()",
        );
        ph.opt_out_capturing();
      } else {
        console.log("[PostHog] ✅ Tracking enabled");
      }
    },
  });

  posthog.capture("$pageview");

  afterNavigate(() => {
    if (get(trackingEnabled)) {
      posthog.capture("$pageview");
    }
  });
}

/**
 * Conditionally captures an event if tracking is enabled.
 * @param {string} event - The event name
 * @param {Record<string, any>} [properties={}]
 */
export function capture(event, properties = {}) {
  if (get(trackingEnabled)) {
    posthog.capture(event, properties);
  }
}

/**
 * Conditionally identifies a user if tracking is enabled.
 * @param {string} id
 * @param {Record<string, any>} [properties={}]
 */
export function identify(id, properties = {}) {
  if (get(trackingEnabled)) {
    posthog.identify(id, properties);
  }
}

/**
 * For test cleanup only — resets internal state.
 * No-op in production.
 */
export function _resetPostHog() {
  if (import.meta.env.MODE === "production") {
    console.warn("[PostHog] _resetPostHog() called in production — no-op");
    return;
  }

  initialized = false;
}
