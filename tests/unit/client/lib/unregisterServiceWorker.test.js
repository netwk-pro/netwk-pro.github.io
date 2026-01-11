/* ==========================================================================
tests/unit/client/lib/unregisterServiceWorker.test.js

Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { unregisterServiceWorker } from '../../../../src/lib/unregisterServiceWorker.js';

describe('unregisterServiceWorker()', () => {
  beforeEach(() => {
    // Clean up any mocks from previous runs
    vi.restoreAllMocks();
  });

  it('should call unregister on all registered service workers', async () => {
    const mockUnregister1 = vi.fn();
    const mockUnregister2 = vi.fn();

    // Minimal mock objects
    const mockRegistration1 = { unregister: mockUnregister1 };
    const mockRegistration2 = { unregister: mockUnregister2 };

    // Stub getRegistrations to return mock service workers
    Object.defineProperty(navigator, 'serviceWorker', {
      configurable: true,
      value: {
        getRegistrations: vi
          .fn()
          .mockResolvedValue([mockRegistration1, mockRegistration2]),
      },
    });

    await unregisterServiceWorker();

    expect(mockUnregister1).toHaveBeenCalled();
    expect(mockUnregister2).toHaveBeenCalled();
  });
});
