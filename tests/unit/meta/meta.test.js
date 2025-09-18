/* ==========================================================================
tests/unit/meta/meta.test.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * @file meta.test.js
 * @description Checks for correct metadata population in CI
 * @module tests/unit/meta
 * @author SunDevil311
 * @updated 2025-09-17
 */

import { describe, expect, it } from 'vitest';
import { load } from '../../../src/routes/+layout.js';

const routes = [
  {
    path: '/',
    title: /Security, Networking, Privacy/,
    description: /Network Pro/,
  },
  // add more paths as needed:
  // { path: '/about', title: /About/, description: /Network Pro/ }
];

describe('Meta checks', () => {
  for (const route of routes) {
    it(`should return correct meta for ${route.path}`, () => {
      const mockUrl = new URL(`http://localhost${route.path}`);
      const { meta } = load({ url: mockUrl });

      expect(meta.title).toMatch(route.title);
      expect(meta.description).toMatch(route.description);
    });
  }
});
