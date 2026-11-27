/* ==========================================================================
tests/unit/client/lib/utils/initAnalytics.test.js

Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * @file initAnalytics.test.js
 * @description Verifies trackPageview records exactly one pageview per
 * initial load and genuine page transition, and ignores same-page and
 * hash-only navigation.
 * @module tests/unit/client/lib/utils
 * @author Scott Lopez
 * @updated 2026-11-26
 */

import { beforeEach, describe, expect, it, vi } from 'vitest';

const capture = vi.fn();

vi.mock('$app/env', () => ({ browser: true }));
vi.mock('#lib/stores/posthog.js', () => ({
  capture: (...args) => capture(...args),
  initPostHog: vi.fn(),
}));
vi.mock('#lib/registerServiceWorker.js', () => ({
  registerServiceWorker: vi.fn(),
}));

const { trackPageview } = await import('#lib/utils/initAnalytics.js');

const ORIGIN = 'https://netwk.pro';

/**
 * Build a minimal AfterNavigate-shaped object.
 *
 * @param {string} type - The navigation type.
 * @param {string | null} fromPath - Path (with optional query/hash) navigated from.
 * @param {string} toPath - Path (with optional query/hash) navigated to.
 * @returns {any} A navigation stand-in.
 */
function nav(type, fromPath, toPath) {
  const target = (path) => ({
    url: new URL(path, ORIGIN),
    params: {},
    route: { id: null },
  });
  return {
    type,
    from: fromPath === null ? null : target(fromPath),
    to: target(toPath),
    willUnload: false,
    complete: Promise.resolve(),
  };
}

describe('trackPageview', () => {
  beforeEach(() => {
    capture.mockClear();
  });

  it('records one pageview for the initial page load without a referrer override', () => {
    trackPageview(nav('enter', null, '/about'));

    expect(capture).toHaveBeenCalledTimes(1);
    expect(capture).toHaveBeenCalledWith('$pageview');
  });

  it.each(['link', 'goto', 'popstate', 'form'])(
    'records one pageview with the previous page as referrer for a %s transition',
    (type) => {
      trackPageview(nav(type, '/about', '/foss'));

      expect(capture).toHaveBeenCalledTimes(1);
      expect(capture).toHaveBeenCalledWith('$pageview', {
        referrer: `${ORIGIN}/about`,
      });
    },
  );

  it('keeps the full previous URL, including query and hash, as referrer', () => {
    trackPageview(nav('link', '/privacy?x=1#top', '/legal#cc-by'));

    expect(capture).toHaveBeenCalledWith('$pageview', {
      referrer: `${ORIGIN}/privacy?x=1#top`,
    });
  });

  it('treats a query-string change on the same path as a page transition', () => {
    trackPageview(nav('goto', '/posts', '/posts?page=2'));

    expect(capture).toHaveBeenCalledTimes(1);
  });

  it('ignores hash-only navigation on the same page', () => {
    trackPageview(
      nav('link', '/privacy-dashboard', '/privacy-dashboard#rights'),
    );
    trackPageview(
      nav('popstate', '/privacy-dashboard#rights', '/privacy-dashboard'),
    );

    expect(capture).not.toHaveBeenCalled();
  });

  it('ignores a same-page link (refresh of the current URL)', () => {
    trackPageview(nav('link', '/about', '/about'));

    expect(capture).not.toHaveBeenCalled();
  });

  it('records a pageview without referrer if a non-enter navigation lacks a source', () => {
    trackPageview(nav('goto', null, '/about'));

    expect(capture).toHaveBeenCalledWith('$pageview');
  });
});
