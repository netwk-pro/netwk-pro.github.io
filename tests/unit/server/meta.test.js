/* ==========================================================================
tests/unit/server/meta.test.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * @file meta.test.js
 * @description Checks for correct metadata population
 * @module tests/unit/server
 * @author Scott Lopez
 * @updated 2025-09-17
 */

import { describe, expect, it } from 'vitest';
import { load } from '../../../src/routes/+layout.js';

describe('Meta info', () => {
  it('should have correct title and description', () => {
    // Mock a URL similar to what SvelteKit provides
    const mockUrl = new URL('http://localhost/');

    const { meta } = load({ url: mockUrl });

    expect(meta.title).toMatch(/Security, Networking, Privacy/);
    expect(meta.description).toMatch(/Network Pro/);
  });
});
