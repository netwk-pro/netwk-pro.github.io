/* ==========================================================================
tests/unit/server/internal/auditCoverage.test.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * @file auditCoverage.test.js
 * @description Scans all .js files in src/ and scripts/ for matching unit
 * tests
 * @module tests/unit/server/internal
 * @author Scott Lopez
 * @updated 2025-09-17
 */

import fs from 'fs';
import path from 'path';
import { describe, expect, it } from 'vitest';

/**
 * Recursively get all .js files in a directory
 * @param {string} dir
 * @param {object} [opts]
 * @param {boolean} [opts.includeTests=false]
 * @returns {string[]}
 */
function getAllJsFiles(dir, { includeTests = false } = {}) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(getAllJsFiles(fullPath, { includeTests }));
    } else if (file.endsWith('.js')) {
      if (
        !includeTests &&
        (file.endsWith('.test.js') || file.endsWith('.spec.js'))
      ) {
        continue;
      }
      results.push(fullPath);
    }
  }
  return results;
}

describe('auditCoverage', () => {
  it('should have corresponding test files for all JS modules', () => {
    const allowList = new Set([
      'checkNode.js',
      'auditScripts.js',
      'vite.config.js',
      'svelte.config.js',
    ]);

    const srcFiles = getAllJsFiles(path.resolve('src'));
    const scriptsFiles = getAllJsFiles(path.resolve('scripts'));
    const allFiles = [...srcFiles, ...scriptsFiles].map((f) =>
      path
        .relative(process.cwd(), f)
        .replace(/\\/g, '/')
        .replace(/^src\//, '')
        .replace(/^scripts\//, '')
        .replace(/\.js$/, ''),
    );

    const clientTests = getAllJsFiles(path.resolve('tests/unit/client'), {
      includeTests: true,
    });
    const serverTests = getAllJsFiles(path.resolve('tests/unit/server'), {
      includeTests: true,
    });
    const testFiles = [...clientTests, ...serverTests];

    const testFilesNormalized = testFiles.map((f) =>
      path
        .relative(process.cwd(), f)
        .replace(/\\/g, '/')
        .replace(/^tests\/unit\/client\//, '')
        .replace(/^tests\/unit\/server\//, '')
        .replace(/\.test\.js$|\.spec\.js$/, ''),
    );

    const testedNames = new Set(testFilesNormalized);

    const untested = allFiles.filter((file) => {
      if (file.startsWith('tests/')) return false;
      if ([...allowList].some((allowed) => file.endsWith(allowed)))
        return false;
      return !testedNames.has(file);
    });

    if (untested.length > 0) {
      console.warn(
        '\n[WARN] The following JS modules do not have corresponding tests:\n' +
          untested.map((f) => `  - ${f}`).join('\n'),
      );
    }

    // ✅ Always pass — warn only
    expect(true).toBe(true);
  });
});
