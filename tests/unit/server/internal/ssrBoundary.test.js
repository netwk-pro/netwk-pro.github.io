/* ==========================================================================
tests/unit/server/ssrBoundary.test.js

Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * @file ssrBoundary.test.js
 * @description Checks for improper usage of Node
 * @module tests/unit/server/internal
 * @author Scott Lopez
 * @updated 2025-12-11
 */

// @vitest-environment node

import fs from 'fs/promises';
import { globby } from 'globby';

// Node-only modules that cannot appear in client-visible code
const NODE_ONLY_IMPORTS = [
  'fs',
  'path',
  'url',
  'crypto',
  'os',
  'child_process',
  'module',
  'jsdom',
];

// Files in these locations are ALWAYS allowed to use Node-only modules
const SERVER_ONLY_ALLOWLIST = [
  'src/lib/server/',
  '/server/',
  '+server.js',
  '+server.ts',
  '.test.',
  '.spec.',
  'vitest.config',
  'playwright.config',
];

function isServerOnlyFile(filePath) {
  return SERVER_ONLY_ALLOWLIST.some((key) => filePath.includes(key));
}

// Regex helpers
function createStaticImportRegex(moduleName) {
  return new RegExp(`import\\s+[^;]*['"]${moduleName}['"]`);
}

function createDynamicImportRegex(moduleName) {
  return new RegExp(`import\\(['"]${moduleName}['"]\\)`);
}

function hasSSRGuard(text) {
  // Basic detection of SSR guard presence
  // Stronger variants are possible, but this avoids false positives
  return /import\.meta\.env\.SSR/.test(text);
}

test('no Node-only modules leak into client-visible modules', async () => {
  const files = await globby([
    'src/**/*.{js,ts,svelte}',
    '!src/lib/server/**', // ignore server-only utilities
    '!**/*.test.*',
    '!**/*.spec.*',
  ]);

  const violations = [];

  for (const file of files) {
    if (isServerOnlyFile(file)) continue;

    const text = await fs.readFile(file, 'utf8');

    for (const mod of NODE_ONLY_IMPORTS) {
      const staticMatch = createStaticImportRegex(mod).test(text);
      const dynamicMatch = createDynamicImportRegex(mod).test(text);

      if (!staticMatch && !dynamicMatch) continue;

      // If SSR guarded, allow it
      if (hasSSRGuard(text)) continue;

      violations.push({
        file,
        module: mod,
      });
    }
  }

  if (violations.length > 0) {
    const formatted = violations
      .map((v) => `❌ ${v.module} imported in ${v.file}`)
      .join('\n');

    throw new Error(
      'SSR boundary violations detected:\n' +
        formatted +
        '\n\nTo fix: move to src/lib/server/, or wrap the import in import.meta.env.SSR.',
    );
  }
});
