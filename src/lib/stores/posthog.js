/* ==========================================================================
src/lib/stores/posthog.js

Copyright c 2025-2026 Network Pro Strategies (Network ProT)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * @file posthog.js
 * @description Privacy-aware analytics compatibility store backed by Matomo.
 * @author Scott Lopez
 * @module src/lib/stores
 * @updated 2026-05-06
 */

import {
  remindUserToReconsent,
  trackingPreferences,
} from '$lib/stores/trackingPreferences.js';
import { detectEnvironment } from '$lib/utils/env.js';
import { get, writable } from 'svelte/store';

const MATOMO_BASE_URL = 'https://analytics.netwk.pro/';
const MATOMO_SCRIPT_URL = `${MATOMO_BASE_URL}matomo.js`;
const MATOMO_TRACKER_URL = `${MATOMO_BASE_URL}matomo.php`;
const MATOMO_SITE_ID = '1';
const MATOMO_DOMAINS = ['*.netwk.pro'];

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

/** @type {boolean} Internal provider-ready flag */
let matomoReady = false;

/** @type {boolean} Internal provider configuration flag */
let matomoConfigured = false;

/** @type {Promise<void> | null} Internal script load promise */
let matomoLoadPromise = null;

/**
 * @typedef {Window & { _paq?: unknown[] }} MatomoWindow
 */

/**
 * Returns the Matomo queue, creating it when needed.
 * @returns {unknown[]}
 */
function getMatomoQueue() {
  const matomoWindow = /** @type {MatomoWindow} */ (window);
  matomoWindow._paq = matomoWindow._paq || [];
  return matomoWindow._paq;
}

/**
 * Determines whether analytics may load in this runtime.
 * @returns {boolean}
 */
function shouldLoadAnalytics() {
  if (typeof window === 'undefined') return false;
  if (import.meta.env.PUBLIC_CODEX === 'true') return false;

  const env = detectEnvironment();
  if (env.isAudit || env.isDebug || env.isCI || env.isTest) return false;
  if (!env.isProd || env.isLocalhost) return false;

  return get(trackingPreferences).enabled;
}

/**
 * Injects the Matomo browser script once.
 * @returns {Promise<void>}
 */
function loadMatomoScript() {
  if (matomoReady) return Promise.resolve();
  if (matomoLoadPromise) return matomoLoadPromise;

  matomoLoadPromise = new Promise((resolve, reject) => {
    const existingScript = document.querySelector(
      `script[src="${MATOMO_SCRIPT_URL}"]`,
    );

    if (existingScript) {
      matomoReady = true;
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.src = MATOMO_SCRIPT_URL;
    script.onload = () => {
      matomoReady = true;
      resolve();
    };
    script.onerror = () => {
      matomoLoadPromise = null;
      reject(new Error('[Analytics] Failed to load Matomo script'));
    };

    document.head.append(script);
  });

  return matomoLoadPromise;
}

/**
 * Initializes Matomo queue settings from the provided site snippet.
 * @returns {Promise<void>}
 */
async function initMatomo() {
  if (!shouldLoadAnalytics()) return;

  const queue = getMatomoQueue();
  if (!matomoConfigured) {
    queue.push(['setDomains', MATOMO_DOMAINS]);
    queue.push(['enableLinkTracking']);
    queue.push(['setTrackerUrl', MATOMO_TRACKER_URL]);
    queue.push(['setSiteId', MATOMO_SITE_ID]);
    matomoConfigured = true;
  }

  try {
    await loadMatomoScript();
  } catch (err) {
    if (import.meta.env.DEV) console.warn(err);
  }
}

/**
 * Initializes analytics preference state and loads Matomo when allowed.
 *
 * @returns {Promise<void>}
 */
export async function initPostHog() {
  if (initialized || typeof window === 'undefined') return;

  initialized = true;

  const { enabled } = get(trackingPreferences);
  trackingEnabled.set(enabled);
  showReminder.set(get(remindUserToReconsent));

  await initMatomo();
}

/**
 * Tracks a pageview or event through Matomo when analytics are allowed.
 * @param {string} event - The event name to track
 * @param {Record<string, any>} [properties={}] - Optional event properties
 * @returns {void}
 */
export function capture(event, properties = {}) {
  if (!shouldLoadAnalytics()) return;

  void initMatomo();

  const queue = getMatomoQueue();

  if (event === '$pageview') {
    queue.push(['setCustomUrl', window.location.href]);
    queue.push(['setDocumentTitle', document.title]);
    queue.push(['trackPageView']);
    return;
  }

  const category =
    typeof properties.category === 'string' ? properties.category : event;
  const action =
    typeof properties.action === 'string' ? properties.action : 'capture';
  const name =
    typeof properties.name === 'string'
      ? properties.name
      : typeof properties.label === 'string'
        ? properties.label
        : typeof properties.target_url === 'string'
          ? properties.target_url
          : undefined;
  const value =
    typeof properties.value === 'number' && Number.isFinite(properties.value)
      ? properties.value
      : undefined;

  queue.push(
    ['trackEvent', category, action, name, value].filter(
      (entry) => entry !== undefined,
    ),
  );
}

/**
 * Compatibility no-op for analytics user identification.
 * Matomo user identification is intentionally disabled in this phase.
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
  matomoReady = false;
  matomoConfigured = false;
  matomoLoadPromise = null;

  // Reset stores for clean test isolation
  trackingEnabled.set(false);
  showReminder.set(false);

  if (typeof window !== 'undefined') {
    const matomoWindow = /** @type {MatomoWindow} */ (window);
    matomoWindow._paq = [];
  }
}
