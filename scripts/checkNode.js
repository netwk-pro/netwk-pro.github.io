/* ==========================================================================
scripts/checkNode.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * Utility to check Node.js and npm version
 * Ensures the current environment matches the required versions from package.json
 *
 * Behavior:
 * - During `postinstall`: warns but does not exit
 * - In all other cases (manual run, CI, verify): fails on mismatch
 *
 * @module scripts/
 * @author Scott Lopez
 * @updated 2025-05-23
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import semver from 'semver';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load engines from package.json
const pkg = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf8'),
);
const { node: nodeRange, npm: npmRange } = pkg.engines;

// Determine if this is running as part of npm's postinstall hook
const isPostInstall = process.env.npm_lifecycle_event === 'postinstall';

let hasError = false;

// Check Node.js version
if (!semver.satisfies(process.version, nodeRange)) {
  const msg = `Node.js ${process.version} does not satisfy required range: ${nodeRange}`;
  if (isPostInstall) {
    console.warn(`⚠️  ${msg}`);
  } else {
    console.error(`❌ ${msg}`);
    hasError = true;
  }
}

// Check npm version
let npmVersion = null;

try {
  npmVersion = execSync('npm --version').toString().trim();
  if (!semver.satisfies(npmVersion, npmRange)) {
    const msg = `npm ${npmVersion} does not satisfy required range: ${npmRange}`;
    if (isPostInstall) {
      console.warn(`⚠️  ${msg}`);
    } else {
      console.error(`❌ ${msg}`);
      hasError = true;
    }
  }
} catch (err) {
  console.error('❌ Failed to check npm version:', err.message);
  process.exit(1);
}

// Final output
if (!hasError) {
  if (!process.env.CI || process.env.VERBOSE === 'true') {
    console.log(
      `✅ Node (${process.version}) matches ${nodeRange}, and npm (${npmVersion}) matches ${npmRange}`,
    );
  }
} else {
  process.exit(1);
}
