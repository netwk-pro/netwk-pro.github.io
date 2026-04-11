/* ==========================================================================
tests/unit/client/lib/utils/utm.test.js

Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * @file utm.test.js
 * @description Unit test for UTM parameters
 * @module tests/unit/client/lib/utils
 * @author Scott Lopez
 * @updated 2026-04-10
 */

import { writable } from 'svelte/store';
import { describe, expect, it, vi } from 'vitest';

// Mock SvelteKit environment and store
vi.mock('$app/environment', () => ({ browser: true }));

vi.mock('$app/stores', () => {
  const mockPageStore = writable({
    url: { pathname: '/contact' },
  });

  return {
    getStores: () => ({
      page: mockPageStore,
    }),
  };
});

// Import *after* mocks
import { appendUTM } from '$lib/utils/utm.js';

describe('appendUTM', () => {
  it('should return URL with utm parameters for /contact', () => {
    const url = 'https://example.com';
    const result = appendUTM(url);
    expect(result).toBe(
      'https://example.com?utm_source=netwk.pro&utm_medium=redirect&utm_campaign=contact',
    );
  });

  it('should append using & if URL already has query params', () => {
    const url = 'https://example.com?existing=value';
    const result = appendUTM(url);
    expect(result).toBe(
      'https://example.com?existing=value&utm_source=netwk.pro&utm_medium=redirect&utm_campaign=contact',
    );
  });
});
