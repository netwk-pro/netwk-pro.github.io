/* ==========================================================================
tests/unit/client/lib/stores/posthog.test.js

Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * @file posthog.test.js
 * @description Verifies Matomo pageview commands (including the SPA
 * referrer), environment gating, and mirroring of consent changes into
 * Matomo's opt-out API.
 * @module tests/unit/client/lib/stores
 * @author Scott Lopez
 * @updated 2026-11-26
 */

import { writable } from 'svelte/store';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

/** Controllable stand-in for the site's tracking preference store. */
const prefs = writable({ enabled: true });

/** Controllable stand-in for detectEnvironment(). */
const env = {
  isProd: true,
  isAudit: false,
  isDebug: false,
  isCI: false,
  isTest: false,
  isLocalhost: false,
};

vi.mock('#lib/stores/trackingPreferences.js', () => ({
  trackingPreferences: prefs,
  remindUserToReconsent: writable(false),
}));
vi.mock('#lib/utils/env.js', () => ({
  detectEnvironment: () => env,
}));

const { capture, initPostHog, _resetPostHog } =
  await import('#lib/stores/posthog.js');

/**
 * Return the queued Matomo command names (functions shown as 'fn').
 *
 * @returns {string[]} Queued command names in order.
 */
function commands() {
  return (window._paq || []).map((c) =>
    typeof c[0] === 'function' ? 'fn' : c[0],
  );
}

describe('posthog (Matomo compatibility)', () => {
  beforeEach(() => {
    Object.assign(env, {
      isProd: true,
      isAudit: false,
      isDebug: false,
      isCI: false,
      isTest: false,
      isLocalhost: false,
    });
    prefs.set({ enabled: true });
    _resetPostHog();
    document.head
      .querySelectorAll('script[src*="analytics.netwk.pro"]')
      .forEach((s) => s.remove());
  });

  afterEach(() => {
    _resetPostHog();
  });

  it('configures Matomo before queuing the first pageview', () => {
    capture('$pageview');

    const queued = commands();
    expect(queued.indexOf('setSiteId')).toBeGreaterThanOrEqual(0);
    expect(queued.indexOf('setSiteId')).toBeLessThan(
      queued.indexOf('trackPageView'),
    );
    expect(queued.filter((c) => c === 'trackPageView')).toHaveLength(1);
  });

  it('queues referrer, URL, title, then trackPageView for client navigations', () => {
    initPostHog();
    window._paq.length = 0;
    document.title = 'FOSS Spotlight — Network Pro™';

    capture('$pageview', { referrer: 'https://netwk.pro/about' });

    expect(window._paq).toEqual([
      ['setReferrerUrl', 'https://netwk.pro/about'],
      ['setCustomUrl', window.location.href],
      ['setDocumentTitle', 'FOSS Spotlight — Network Pro™'],
      ['trackPageView'],
    ]);
  });

  it('does not override the referrer on the initial page load', () => {
    capture('$pageview');

    expect(commands()).not.toContain('setReferrerUrl');
  });

  it.each([
    ['audit', { isAudit: true, isProd: false }],
    ['debug', { isDebug: true, isProd: false }],
    ['localhost', { isLocalhost: true }],
  ])('queues nothing in %s environments', (_label, overrides) => {
    Object.assign(env, overrides);

    capture('$pageview');
    initPostHog();

    expect(commands()).toEqual([]);
  });

  it('queues nothing without consent', () => {
    prefs.set({ enabled: false });

    capture('$pageview');

    expect(commands()).toEqual([]);
  });

  it('opts Matomo out once when consent is revoked after initialization', () => {
    capture('$pageview');
    const before = window._paq.length;

    prefs.set({ enabled: false });
    prefs.set({ enabled: false });
    capture('$pageview');

    const after = window._paq.slice(before).map((c) => c[0]);
    expect(after).toEqual(['optUserOut']);
  });

  it('opts Matomo back in when consent is granted again', () => {
    capture('$pageview');
    prefs.set({ enabled: false });
    const before = window._paq.length;

    prefs.set({ enabled: true });
    capture('$pageview', { referrer: 'https://netwk.pro/about' });

    const after = window._paq.slice(before).map((c) => c[0]);
    expect(after[0]).toBe('forgetUserOptOut');
    expect(after.filter((c) => c === 'trackPageView')).toHaveLength(1);
  });

  it('only clears a stale Matomo opt-out on initialization (not unconditionally)', () => {
    capture('$pageview');

    const reconcile = window._paq.find((c) => typeof c[0] === 'function');
    expect(reconcile).toBeDefined();

    const optedOut = {
      isUserOptedOut: () => true,
      forgetUserOptOut: vi.fn(),
    };
    reconcile[0].call(optedOut);
    expect(optedOut.forgetUserOptOut).toHaveBeenCalledOnce();

    const optedIn = { isUserOptedOut: () => false, forgetUserOptOut: vi.fn() };
    reconcile[0].call(optedIn);
    expect(optedIn.forgetUserOptOut).not.toHaveBeenCalled();
  });

  it('starts tracking when consent is granted after an initially disabled state', () => {
    prefs.set({ enabled: false });
    capture('$pageview');
    expect(commands()).toEqual([]);

    prefs.set({ enabled: true });
    capture('$pageview', { referrer: 'https://netwk.pro/privacy-dashboard' });

    const queued = commands();
    expect(queued).toContain('setSiteId');
    expect(queued).not.toContain('optUserOut');
    expect(queued.filter((c) => c === 'trackPageView')).toHaveLength(1);
  });
});
