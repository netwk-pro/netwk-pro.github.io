/* ==========================================================================
.lighthouserc.cjs

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

module.exports = {
  ci: {
    collect: {
      url: ['https://netwk.pro'],
      numberOfRuns: 1,
      settings: {
        onlyCategories: [
          'performance',
          'accessibility',
          'best-practices',
          'seo',
        ],
        disableFullPageScreenshot: true,
      },
    },
    assert: {
      preset: 'none',
      assertions: {
        // Add budget checks by asserting that "resource-summary" does not exceed budget
        'resource-summary': ['error', { budgetPath: 'budget.json' }],
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: './.lighthouseci',
      reporter: ['html', 'json'],
    },
  },
};
