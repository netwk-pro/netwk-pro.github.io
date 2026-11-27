/* ==========================================================================
tests/unit/client/lib/utils/redirect.test.js

Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * @file redirect.test.js
 * @description Unit test for src/lib/utils/redirect.js
 * @module tests/unit/lib/util/
 * @author Scott Lopez
 * @updated 2025-07-01
 */

import { redirectWithBrowserAwareness } from '#lib/utils/redirect.js';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('redirectWithBrowserAwareness', () => {
  let originalLocation;

  /** @type {{ url: string; delay: number }} */
  const commonMocks = {
    url: 'https://example.com',
    delay: 1,
  };

  beforeEach(() => {
    // Preserve globals
    originalLocation = window.location;

    // Stub window.location.replace
    delete window.location;
    window.location = {
      replace: vi.fn(),
    };
  });

  afterEach(() => {
    // Restore globals
    window.location = originalLocation;
    vi.useRealTimers();
    // jsdom 31 exposes navigator as getter-only, so userAgent is stubbed via
    // vi.spyOn; restoreAllMocks puts the real getter back.
    vi.restoreAllMocks();
  });

  it('should redirect immediately in Firefox', () => {
    vi.spyOn(navigator, 'userAgent', 'get').mockReturnValue(
      'Mozilla/5.0 (Windows NT 10.0; rv:99.0) Gecko/20100101 Firefox/99.0',
    );

    redirectWithBrowserAwareness(commonMocks.url, commonMocks.delay);

    expect(window.location.replace).toHaveBeenCalledWith(commonMocks.url);
  });

  it('should redirect after delay in non-Firefox', () => {
    vi.useFakeTimers();

    vi.spyOn(navigator, 'userAgent', 'get').mockReturnValue(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0 Safari/537.36',
    );

    redirectWithBrowserAwareness(commonMocks.url, commonMocks.delay);

    expect(window.location.replace).not.toHaveBeenCalled();

    vi.advanceTimersByTime(commonMocks.delay * 1000);

    expect(window.location.replace).toHaveBeenCalledWith(commonMocks.url);
  });
});

// cspell:ignore khtml
