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
} from '$lib/stores/trackingPreferences.js';
import { detectEnvironment } from '$lib/utils/env.js';
import { get, writable } from 'svelte/store';

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
 *
 * @returns {Promise<void>}
 */
export async function initPostHog() {
  if (initialized || typeof window === 'undefined') return;

  const { isAudit, isDev, isTest, mode, effective } = detectEnvironment();

  // 🌐 Hybrid hostname + environment guard
  const host = window.location.hostname;
  const isAuditHost = /(^|\.)audit\.netwk\.pro$/i.test(host);
  const effectiveAudit = isAudit || isAuditHost;
  const isDebug = isDev || isTest;

  // 🧭 Log environment context before any conditional logic
  if (isDebug) {
    console.info('[PostHog ENV]', {
      buildMode: mode,
      effectiveMode: effective,
      host,
      effectiveAudit,
      isDev,
      isTest,
    });
  }

  // 🚫 Skip analytics in audit context
  if (effectiveAudit) {
    console.info(
      `[PostHog] Skipping analytics (${effective} mode, host: ${host}).`,
    );
    return;
  }

  // 🧱 Skip entirely in dev/test contexts
  if (isDebug) {
    console.info('[PostHog] Skipping init in dev/test mode.');
    return;
  }

  // 🚀 Production analytics logic (with user consent)
  initialized = true;

  const { enabled } = get(trackingPreferences);
  trackingEnabled.set(enabled);
  showReminder.set(get(remindUserToReconsent));

  if (!enabled) {
    console.log('[PostHog] Tracking disabled — user opted out.');
    return;
  }

  try {
    const posthogModule = await import('posthog-js');
    ph = posthogModule.default;

    // ✅ Initialize PostHog
    // cspell:disable-next-line
    ph.init('phc_Qshfo6AXzh4pS7aPigfqyeo4qj1qlyh7gDuHDeVMSR0', {
      api_host: '/relay-MSR0/',
      ui_host: 'https://us.posthog.com',
      autocapture: true,
      capture_pageview: false,
      person_profiles: 'identified_only',
      loaded: (phInstance) => {
        if (!enabled) {
          console.log(
            '[PostHog] ⛔ User opted out — calling opt_out_capturing()',
          );
          phInstance.opt_out_capturing();
        } else {
          console.log('[PostHog] ✅ Tracking enabled');
        }
      },
    });

    ph.capture('$pageview');
  } catch (err) {
    console.warn('[PostHog] Failed to initialize:', err);
  }
}

/**
 * Conditionally captures an event if tracking is enabled.
 * @param {string} event - The event name to track
 * @param {Record<string, any>} [properties={}] - Optional event properties
 */
export function capture(event, properties = {}) {
  const isDev = import.meta.env.MODE === 'development';
  if (isDev || ph === null || !get(trackingEnabled)) return;

  try {
    ph.capture(event, properties);
  } catch (err) {
    console.warn(`[PostHog] capture(${event}) failed:`, err);
  }
}

/**
 * Conditionally identifies a user if tracking is enabled.
 * @param {string} id - Unique user identifier
 * @param {Record<string, any>} [properties={}] - Optional user traits
 */
export function identify(id, properties = {}) {
  const isDev = import.meta.env.MODE === 'development';
  if (isDev || ph === null || !get(trackingEnabled)) return;

  try {
    ph.identify(id, properties);
  } catch (err) {
    console.warn(`[PostHog] identify(${id}) failed:`, err);
  }
}

/**
 * For test cleanup only — resets internal state.
 * No-op in production.
 * @returns {void}
 */
export function _resetPostHog() {
  if (import.meta.env.MODE === 'production') {
    console.warn('[PostHog] _resetPostHog() called in production — no-op');
    return;
  }

  initialized = false;
  ph = null;
}
