/* ==========================================================================
tests/unit/server/security/probely.test.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * @file probely.test.js
 * @description  Unit tests for the isProbelyRequest helper.
 * Validates detection logic for identifying known Probely scanner traffic
 * based on User-Agent and IP address heuristics.
 * @module tests/unit/server/security
 * @author Scott Lopez
 * @updated 2025-11-11
 */

import { isProbelyScanner } from '$lib/security/probely.js';

describe('isProbelyScanner', () => {
  it('detects known user-agent', () => {
    const ua =
      'Mozilla/5.0 (compatible; +https://probely.com/sos) AppleWebKit/537.36 Chrome/104.0.0.0 Safari/537.36 ProbelySPDR/0.2.0';
    expect(isProbelyScanner({ ua, ip: '' })).toBe(true);
  });

  it('detects known IP', () => {
    expect(isProbelyScanner({ ua: '', ip: '18.235.241.170' })).toBe(true);
  });

  it('handles lowercase and spacing in IP', () => {
    expect(
      isProbelyScanner({ ua: 'probelyspdr/1.0', ip: ' 18.235.241.170 ' }),
    ).toBe(true);
  });

  it('returns false for unrelated UA and IP', () => {
    expect(
      isProbelyScanner({
        ua: 'Mozilla/5.0 (Linux x86_64)',
        ip: '8.8.8.8',
      }),
    ).toBe(false);
  });

  it('handles missing headers safely', () => {
    expect(isProbelyScanner({ ua: '', ip: '' })).toBe(false);
  });
});
