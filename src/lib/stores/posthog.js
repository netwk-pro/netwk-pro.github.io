/* ==========================================================================
src/lib/stores/posthog.js

Copyright c 2025-2026 Network Pro Strategies (Network ProT)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * @file posthog.js
 * @description Privacy-aware analytics compatibility store with reactive state and safe no-op API surface.
 * @author Scott Lopez
 * @module src/lib/stores
 * @updated 2026-05-03
 */

import {
  remindUserToReconsent,
  trackingPreferences,
} from '$lib/stores/trackingPreferences.js';
import { get, writable } from 'svelte/store';

/**
 * Tracks whether tracking would be allowed based on cookies, DNT/GPC, and user preference.
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

/**
 * Initializes analytics preference state.
 * Third-party analytics are intentionally disabled until a future provider is added.
 *
 * @returns {Promise<void>}
 */
export async function initPostHog() {
  if (initialized || typeof window === 'undefined') return;

  initialized = true;

  const { enabled } = get(trackingPreferences);
  trackingEnabled.set(enabled);
  showReminder.set(get(remindUserToReconsent));
}

/**
 * Compatibility no-op for analytics event capture.
 * @param {string} event - The event name to track
 * @param {Record<string, any>} [properties={}] - Optional event properties
 * @returns {void}
 */
export function capture(event, properties = {}) {
  void event;
  void properties;
}

/**
 * Compatibility no-op for analytics user identification.
 * @param {string} id - Unique user identifier
 * @param {Record<string, any>} [properties={}] - Optional user traits
 * @returns {void}
 */
export function identify(id, properties = {}) {
  void id;
  void properties;
}

/**
 * For test cleanup only - resets internal state.
 * No-op in production.
 * @returns {void}
 */
export function _resetPostHog() {
  if (import.meta.env.MODE === 'production') {
    console.warn('[Analytics] _resetPostHog() called in production - no-op');
    return;
  }

  initialized = false;

  // Reset stores for clean test isolation
  trackingEnabled.set(false);
  showReminder.set(false);
}
