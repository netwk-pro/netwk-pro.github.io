/* ==========================================================================
tests/unit/client/lib/utils/redirect.test.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * @file redirect.test.js
 * @description Unit test for src/lib/utils/redirect.js
 * @module tests/unit/lib/util/
 * @author SunDevil311
 * @updated 2025-07-01
 */

import { redirectWithBrowserAwareness } from '$lib/utils/redirect.js';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('redirectWithBrowserAwareness', () => {
  let originalLocation;
  let originalNavigator;

  /** @type {{ url: string; delay: number }} */
  const commonMocks = {
    url: 'https://example.com',
    delay: 1,
  };

  beforeEach(() => {
    // Preserve globals
    originalLocation = window.location;
    originalNavigator = global.navigator;

    // Stub window.location.replace
    delete window.location;
    window.location = {
      replace: vi.fn(),
    };
  });

  afterEach(() => {
    // Restore globals
    window.location = originalLocation;
    global.navigator = originalNavigator;
    vi.clearAllMocks();
  });

  it('should redirect immediately in Firefox', () => {
    global.navigator = {
      userAgent:
        'Mozilla/5.0 (Windows NT 10.0; rv:99.0) Gecko/20100101 Firefox/99.0',
    };

    redirectWithBrowserAwareness(commonMocks.url, commonMocks.delay);

    expect(window.location.replace).toHaveBeenCalledWith(commonMocks.url);
  });

  it('should redirect after delay in non-Firefox', () => {
    vi.useFakeTimers();

    global.navigator = {
      userAgent:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0 Safari/537.36',
    };

    redirectWithBrowserAwareness(commonMocks.url, commonMocks.delay);

    expect(window.location.replace).not.toHaveBeenCalled();

    vi.advanceTimersByTime(commonMocks.delay * 1000);

    expect(window.location.replace).toHaveBeenCalledWith(commonMocks.url);

    vi.useRealTimers();
  });
});

// cspell:ignore khtml
