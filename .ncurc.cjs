/* ==========================================================================
.ncurc.cjs

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================= */

/**
 * ==========================================================
 *  npm-check-updates Configuration
 *  ----------------------------------------------------------
 *  This file defines upgrade behavior for project dependencies.
 *  It ensures consistent updates while protecting pinned tools
 *  that are known to break between major versions.
 *
 *  🔧 Usage:
 *    - Run `npm run check:updates` to preview safe upgrades
 *    - Run `npm run upgrade` to apply upgrades (respects these rules)
 *
 *  📜 Notes for Contributors:
 *    - Do NOT remove entries from "reject" unless a maintainer
 *      confirms the dependency has been tested and verified.
 *    - This config is automatically used by npm-check-updates (NCU)
 *      and requires no command-line flags.
 *
 *  💡 See CONTRIBUTING.md → "Dependency Management" for details.
 * ==========================================================
 */

/** @type {import('npm-check-updates').RunOptions} */
module.exports = {
  // Ignore specific dependencies (prevent upgrades)
  reject: [
    'vitest',
    '@vitest/coverage-v8',
    'prettier',
    'jsdom',
    'markdownlint-cli2',
  ],

  // Always upgrade devDependencies as well
  dep: 'prod,dev',

  // Show a summary table
  format: ['group', 'table'],

  // Don’t automatically install — just update package.json
  upgrade: true,

  // Display upgraded dependencies as JSON (optional for automation)
  jsonUpgraded: false,

  // Enable readable colors when supported
  color: true, // harmless, but CLI-only
};
