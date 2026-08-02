/* ==========================================================================
tests/unit/server/dnt.test.js

Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * @file dnt.test.js
 * @description Tests the site-wide tracking status resource.
 * @module tests/unit/server
 * @author Scott Lopez
 * @updated 2026-08-02
 */

import { describe, expect, it, vi } from 'vitest';
import { GET } from '../../../src/routes/.well-known/dnt/+server.js';

/**
 * @param {object} [options]
 * @param {HeadersInit} [options.headers]
 * @param {Record<string, string>} [options.cookies]
 * @returns {Promise<{ response: Response, status: Record<string, unknown> }>}
 */
async function getTrackingStatus({ headers = {}, cookies = {} } = {}) {
  const request = new Request('https://netwk.pro/.well-known/dnt', {
    headers,
  });
  const event = /** @type {Parameters<typeof GET>[0]} */ ({
    request,
    cookies: {
      get: vi.fn((name) => cookies[name]),
    },
  });
  const response = await GET(event);

  return { response, status: await response.json() };
}

describe('DNT tracking status resource', () => {
  it.each([
    ['DNT', { DNT: '1' }],
    ['DNT extension', { DNT: '1example' }],
    ['Sec-GPC', { 'Sec-GPC': '1' }],
  ])('returns N for a %s privacy signal', async (_signal, headers) => {
    const { status } = await getTrackingStatus({ headers });

    expect(status.tracking).toBe('N');
  });

  it.each([
    ['no expressed preference', {}],
    ['DNT tracking preference', { DNT: '0' }],
    ['invalid Sec-GPC value', { 'Sec-GPC': '0' }],
  ])('returns T for %s', async (_preference, headers) => {
    const { status } = await getTrackingStatus({ headers });

    expect(status.tracking).toBe('T');
  });

  it('returns N for a manual opt-out', async () => {
    const { status } = await getTrackingStatus({
      cookies: { disable_tracking: 'true' },
    });

    expect(status.tracking).toBe('N');
  });

  it('returns C when a manual opt-in takes precedence over a signal', async () => {
    const { status } = await getTrackingStatus({
      headers: { DNT: '1', 'Sec-GPC': '1' },
      cookies: { enable_tracking: 'true' },
    });

    expect(status.tracking).toBe('C');
  });

  it('gives a manual opt-out precedence if both cookies are present', async () => {
    const { status } = await getTrackingStatus({
      cookies: { disable_tracking: 'true', enable_tracking: 'true' },
    });

    expect(status.tracking).toBe('N');
  });

  it('returns a valid user-specific tracking status representation', async () => {
    const { response, status } = await getTrackingStatus();

    expect(status).toEqual({
      tracking: 'T',
      controller: ['/'],
      policy: '/.well-known/dnt-policy.txt',
      config: 'https://netwk.pro/privacy#tracking',
    });
    expect(response.headers.get('Content-Type')).toBe(
      'application/tracking-status+json',
    );
    expect(response.headers.get('Cache-Control')).toBe('private, no-store');
    expect(response.headers.get('Vary')).toBe('Cookie, DNT, Sec-GPC');
  });
});
