/* ==========================================================================
tests/unit/client/hooks.client.test.js

Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * @file hooks.client.test.js
 * @description Verifies the client handleError hook falls back to a
 * full-page navigation when client-side navigation fails offline, so the
 * service worker's offline handling applies.
 * @module tests/unit/client
 * @author Scott Lopez
 * @updated 2026-11-26
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { handleError } from '../../../src/hooks.client.ts';

/**
 * Build a client handleError input.
 *
 * @param {unknown} error - The caught error.
 * @param {string} path - The navigation destination path.
 * @param {string} [kind] - The error kind.
 * @returns {any} A handleError input stand-in.
 */
function input(error, path, kind = 'unknown') {
  return {
    kind,
    error,
    event: { url: new URL(path, window.location.origin) },
  };
}

describe('client handleError', () => {
  /** @type {ReturnType<typeof vi.fn>} */
  let assign;

  beforeEach(() => {
    assign = vi.fn();
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.stubGlobal('location', {
      ...window.location,
      href: `${window.location.origin}/about`,
      assign,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it.each([
    'Failed to fetch',
    'NetworkError when attempting to fetch resource.',
    'Load failed',
  ])(
    'falls back to a full navigation for a network failure (%s)',
    (message) => {
      handleError(input(new TypeError(message), '/foss'));

      expect(assign).toHaveBeenCalledWith(`${window.location.origin}/foss`);
    },
  );

  it('does not navigate when the failure is on the current page (no reload loop)', () => {
    handleError(input(new TypeError('Failed to fetch'), '/about'));

    expect(assign).not.toHaveBeenCalled();
  });

  it('logs other unexpected errors without navigating', () => {
    handleError(input(new TypeError('x is not a function'), '/foss'));
    handleError(input(new Error('boom'), '/foss'));

    expect(assign).not.toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledTimes(2);
  });

  it('ignores app and framework errors', () => {
    handleError(input(new TypeError('Failed to fetch'), '/foss', 'framework'));
    handleError(input({ status: 404, message: 'Not Found' }, '/foss', 'app'));

    expect(assign).not.toHaveBeenCalled();
    expect(console.error).not.toHaveBeenCalled();
  });
});
