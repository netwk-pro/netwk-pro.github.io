/* ==========================================================================
tests/unit/server/checkVersions.test.js

Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * Unit test for scripts/checkVersions.js
 */

import { describe, expect, it } from 'vitest';
import { checkVersions } from '../../../scripts/checkVersions.js';

describe('checkVersions()', () => {
  it('should match current Node and NPM versions to engine ranges', () => {
    const result = checkVersions();

    expect(result.nodeVersion).toMatch(/^v\d+\.\d+\.\d+$/);
    expect(result.npmVersion).toMatch(/^\d+\.\d+\.\d+$/);
    expect(result.nodeValid).toBe(true);
    expect(result.npmValid).toBe(true);
  });
});
