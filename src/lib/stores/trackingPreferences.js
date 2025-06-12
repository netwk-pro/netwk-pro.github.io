/* ==========================================================================
src/lib/stores/trackingPreferences.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * NOTE: Legacy logic from `trackingCookies.js` was merged here in June 2025.
 * That file has been removed to consolidate stateful tracking logic into a
 * reactive store with SSR compatibility.
 */

/**
 * @file trackingPreferences.js
 * @description Reactive store for tracking preferences derived from
 * cookies and browser signals (DNT / GPC). Safe for SSR.
 * @module src/lib/stores
 */

import { browser } from '$app/environment';
import { derived, writable } from 'svelte/store';

/**
 * @typedef {object} TrackingState
 * @property {boolean} optedIn - User explicitly opted in via cookie
 * @property {boolean} optedOut - User explicitly opted out via cookie
 * @property {boolean} dnt - Do Not Track browser signal
 * @property {boolean} gpc - Global Privacy Control browser signal
 * @property {boolean} enabled - Whether tracking is permitted
 * @property {string} status - Human-readable description of tracking state
 */

/**
 * @returns {string} Raw document.cookie or empty string (SSR-safe)
 */
function readCookies() {
  return browser ? document.cookie || '' : '';
}

/**
 * Check if a specific cookie exists
 * @param {string} name
 * @returns {boolean}
 */
function cookieExists(name) {
  return readCookies().includes(`${name}=true`);
}

/**
 * Set a cookie with boolean true, 1-year duration
 * @param {string} name
 * @returns {void}
 */
function setCookie(name) {
  if (browser) {
    document.cookie = `${name}=true; path=/; max-age=31536000; samesite=lax`;
  }
}

/**
 * Remove a cookie by setting zero max-age
 * @param {string} name
 * @returns {void}
 */
function removeCookie(name) {
  if (browser) {
    document.cookie = `${name}=; Max-Age=0; path=/; samesite=lax`;
  }
}

/**
 * Write tracking_consent_timestamp cookie
 * @returns {void}
 */
function setConsentTimestamp() {
  if (browser) {
    document.cookie = `tracking_consent_timestamp=${Date.now()}; path=/; max-age=31536000; samesite=lax`;
  }
}

/**
 * Remove tracking_consent_timestamp cookie
 * @returns {void}
 */
function removeConsentTimestamp() {
  if (browser) {
    document.cookie = `tracking_consent_timestamp=; Max-Age=0; path=/; samesite=lax`;
  }
}

/**
 * @returns {{ dnt: boolean, gpc: boolean }}
 */
function getPrivacySignals() {
  if (!browser) return { dnt: false, gpc: false };

  const dnt = navigator.doNotTrack === '1';
  // @ts-expect-error: Non-standard GPC property
  const gpc = navigator.globalPrivacyControl === true;

  return { dnt, gpc };
}

/**
 * @param {object} args
 * @param {boolean} args.optedOut
 * @param {boolean} args.optedIn
 * @param {boolean} args.dnt
 * @param {boolean} args.gpc
 * @returns {string}
 */
function deriveStatus({ optedOut, optedIn, dnt, gpc }) {
  if (optedOut) return '🔒 Tracking disabled (manual opt-out)';
  if (optedIn) return '✅ Tracking enabled (manual opt-in)';
  if (dnt || gpc) return '🛑 Tracking disabled (via browser signal)';
  return '⚙️ Using default settings (tracking enabled)';
}

/**
 * @returns {TrackingState}
 */
function computePreferences() {
  const optedOut = cookieExists('disable_tracking');
  const optedIn = cookieExists('enable_tracking');
  const { dnt, gpc } = getPrivacySignals();

  const enabled = optedIn || (!optedOut && !dnt && !gpc);
  const status = deriveStatus({ optedOut, optedIn, dnt, gpc });

  return { optedIn, optedOut, dnt, gpc, enabled, status };
}

// --- Writable store ---
/** @type {import('svelte/store').Writable<TrackingState>} */
export const trackingPreferences = writable(
  browser
    ? computePreferences()
    : {
        optedIn: false,
        optedOut: false,
        dnt: false,
        gpc: false,
        enabled: false,
        status: '⏳ Checking tracking preferences...',
      },
);

/**
 * Returns true if the user manually set a tracking preference cookie.
 * @returns {boolean}
 */
function hasUserManuallySetTrackingPreference() {
  const cookies = readCookies();
  return (
    cookies.includes('enable_tracking=true') ||
    cookies.includes('disable_tracking=true')
  );
}

/**
 * Determines if user should be reminded to reconsent (after 6 months).
 *
 * @param {TrackingState} $prefs - The current tracking preferences.
 * @returns {boolean}
 * @type {import("svelte/store").Readable<boolean>}
 */
export const remindUserToReconsent = derived(trackingPreferences, (_prefs) => {
  if (!browser) return false;
  if (!hasUserManuallySetTrackingPreference()) return false;

  const match = readCookies().match(/tracking_consent_timestamp=(\d+)/);
  if (!match) return true;

  const timestamp = Number(match[1]);
  if (isNaN(timestamp)) return true;

  const age = Date.now() - timestamp;
  return age > 1000 * 60 * 60 * 24 * 180; // 6 months
});

/**
 * Force-refresh current preferences
 * @returns {void}
 */
export function refreshTrackingPreferences() {
  if (browser) trackingPreferences.set(computePreferences());
}

/**
 * Enable tracking by setting opt-in cookie
 * @returns {void}
 */
export function setOptIn() {
  setCookie('enable_tracking');
  removeCookie('disable_tracking');
  setConsentTimestamp();
  refreshTrackingPreferences();
}

/**
 * Disable tracking by setting opt-out cookie
 * @returns {void}
 */
export function setOptOut() {
  setCookie('disable_tracking');
  removeCookie('enable_tracking');
  setConsentTimestamp();
  refreshTrackingPreferences();
}

/**
 * Clear all tracking preference cookies
 * @returns {void}
 */
export function clearPrefs() {
  removeCookie('enable_tracking');
  removeCookie('disable_tracking');
  removeConsentTimestamp();
  refreshTrackingPreferences();
}
