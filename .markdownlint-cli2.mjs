/* ==========================================================================
.markdownlint-cli2.mjs

Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

export default {
  globs: ['**/*.{md,markdown}'],

  ignores: [
    'build/**',
    '.netlify/**',
    'node_modules/**',
    'playwright-report/**',
    'test-results/**',
    '.claude/**',
  ],
};
