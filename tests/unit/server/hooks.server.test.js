/* ==========================================================================
tests/unit/server/hooks.server.test.js

Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * @file hooks.server.test.js
 * @description Verifies the SvelteKit 3 server handleError hook preserves
 * safe app/framework/validation errors and sanitizes unknown errors.
 * @module tests/unit/server
 * @author Scott Lopez
 * @updated 2026-11-26
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { handleError } from '../../../src/hooks.server.js';

/**
 * Build the minimal request event used by handleError.
 *
 * @param {string} [pathname] - The request pathname.
 * @returns {any} A request event stand-in.
 */
function createEvent(pathname = '/some/route') {
  return { url: new URL(`https://netwk.pro${pathname}`) };
}

describe('handleError', () => {
  /** @type {ReturnType<typeof vi.spyOn>} */
  let consoleError;
  /** @type {ReturnType<typeof vi.spyOn>} */
  let consoleWarn;

  beforeEach(() => {
    consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    consoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('sanitizes unknown errors and logs them server-side', () => {
    const secret = new Error('database password is hunter2');

    const result = handleError({
      kind: 'unknown',
      error: secret,
      event: createEvent('/boom'),
    });

    expect(result).toEqual({ message: 'A server-side error occurred' });
    expect(JSON.stringify(result)).not.toContain('hunter2');
    expect(result).not.toHaveProperty('status'); // SvelteKit default 500 applies
    expect(consoleError).toHaveBeenCalledWith(
      '🔴 SSR Error in route:',
      '/boom',
    );
    expect(consoleError).toHaveBeenCalledWith(secret);
  });

  it('keeps app errors unchanged without logging', () => {
    const result = handleError({
      kind: 'app',
      error: { status: 400, message: 'Invalid or missing file name' },
      event: createEvent('/pgp/bad'),
    });

    expect(result).toBeUndefined();
    expect(consoleError).not.toHaveBeenCalled();
  });

  it('keeps routine framework 4xx errors unchanged without logging', () => {
    const result = handleError({
      kind: 'framework',
      error: { status: 404, message: 'Not Found' },
      event: createEvent('/missing'),
    });

    expect(result).toBeUndefined();
    expect(consoleError).not.toHaveBeenCalled();
  });

  it('keeps framework 5xx errors unchanged but logs them', () => {
    const result = handleError({
      kind: 'framework',
      error: { status: 500, message: 'Internal Error' },
      event: createEvent('/broken'),
    });

    expect(result).toBeUndefined();
    expect(consoleError).toHaveBeenCalledOnce();
  });

  it('keeps validation errors unchanged and logs metadata only', () => {
    const result = handleError({
      kind: 'validation',
      error: { status: 400, message: 'Bad Request' },
      issues: [{ message: 'contains user input: secret@example.com' }],
      remote: { name: 'submitForm' },
      event: createEvent('/form'),
    });

    expect(result).toBeUndefined();
    expect(consoleWarn).toHaveBeenCalledOnce();
    const logged = JSON.stringify(consoleWarn.mock.calls);
    expect(logged).toContain('submitForm');
    expect(logged).toContain('"issueCount":1');
    expect(logged).not.toContain('secret@example.com');
  });
});
