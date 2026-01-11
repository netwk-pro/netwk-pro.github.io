/* ==========================================================================
tests/unit/client/lib/utils/utm.test.js

Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

// Mock SvelteKit environment and store
vi.mock('$app/environment', () => ({ browser: true }));

import { writable } from 'svelte/store';

vi.mock('$app/stores', () => {
  const mockPageStore = writable({
    url: {
      pathname: '/contact',
    },
  });

  return {
    getStores: () => ({
      page: mockPageStore,
    }),
  };
});

import { appendUTM } from '$lib/utils/utm.js';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('appendUTM', () => {
  const originalWindow = globalThis.window;

  beforeEach(() => {
    globalThis.window = {
      location: { search: '' },
    };
  });

  afterEach(() => {
    globalThis.window = originalWindow;
  });

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
