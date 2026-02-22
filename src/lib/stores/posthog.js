/* ==========================================================================
src/lib/stores/posthog.js

Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * @file posthog.js
 * @description Privacy-aware PostHog tracking store with reactive state and safe API surface.
 * @author Scott Lopez
 * @module src/lib/stores
 * @updated 2026-02-21
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
 * Cache environment detection so capture/identify/init share the same policy
 * without duplicating logic or repeatedly re-evaluating.
 * @type {ReturnType<typeof detectEnvironment> | null}
 */
let _env = null;

/** @type {RegExp} Audit hostname matcher (defense-in-depth) */
const AUDIT_HOST_RE = /(^|\.)audit\.netwk\.pro$/i;

/**
 * Returns (and caches) the environment detection result so all callers
 * share the same policy without recomputing.
 *
 * @returns {ReturnType<typeof detectEnvironment>}
 */
function getEnv() {
  if (_env) return _env;
  _env = detectEnvironment();
  return _env;
}

/**
 * Determines whether this build/runtime is a Codex environment.
 *
 * @returns {boolean}
 */
function isCodexEnvironment() {
  return (
    import.meta.env.PUBLIC_CODEX === 'true' || import.meta.env.CODEX === 'true'
  );
}

/**
 * Central analytics gate:
 * - Skip entirely in Codex
 * - Skip in audit context (mode or audit hostname)
 * - Skip in debug context (dev/test)
 * - Skip during SSR
 *
 * @returns {boolean} True if analytics should be skipped in the current runtime.
 */
function shouldSkipAnalytics() {
  // Explicit SSR guard: never attempt analytics server-side
  if (typeof window === 'undefined') return true;

  const { isAudit, isDebug } = getEnv();
  const host = window.location?.hostname || '';
  const isAuditHost = AUDIT_HOST_RE.test(host);
  const effectiveAudit = isAudit || isAuditHost;

  return isCodexEnvironment() || effectiveAudit || isDebug;
}

/**
 * Initializes the PostHog analytics client if tracking is permitted.
 * Uses dynamic import to avoid SSR failures.
 *
 * @returns {Promise<void>}
 */
export async function initPostHog() {
  if (initialized || typeof window === 'undefined') return;

  const { isAudit, isDebug, isDev, isTest, mode, effective } = getEnv();

  // 🤖 Skip analytics entirely in Codex environments
  if (isCodexEnvironment()) {
    console.info('[PostHog] Skipping analytics (Codex environment).');
    return;
  }

  const host = window.location.hostname;
  const isAuditHost = AUDIT_HOST_RE.test(host);
  const effectiveAudit = isAudit || isAuditHost;

  // 🧭 Log environment context before any conditional logic
  if (isDebug) {
    console.info('[PostHog ENV]', {
      buildMode: mode,
      effectiveMode: effective,
      host,
      isAudit,
      isAuditHost,
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

    // ✅ Load public key from env
    const key = import.meta.env.PUBLIC_POSTHOG_PROJECT_KEY;

    if (!key) {
      console.warn('[PostHog] ⚠️ PUBLIC_POSTHOG_PROJECT_KEY is not set.');
      return;
    }

    // ✅ Initialize PostHog
    ph.init(key, {
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
  if (shouldSkipAnalytics() || ph === null || !get(trackingEnabled)) return;

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
  if (shouldSkipAnalytics() || ph === null || !get(trackingEnabled)) return;

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
  _env = null;

  // Reset stores for clean test isolation
  trackingEnabled.set(false);
  showReminder.set(false);
}
