/* ==========================================================================
scripts/checkVersions.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * Utility to check Node.js and NPM version (non-blocking)
 * Returns version info, can be unit tested, and doesn't kill process during
 * test runs
 *
 * @module scripts/
 * @author SunDevil311
 * @updated 2025-05-20
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import semver from 'semver';

/**
 * @typedef {object} VersionCheckResult
 * @property {string} nodeVersion
 * @property {string} npmVersion
 * @property {string} nodeRange
 * @property {string} npmRange
 * @property {boolean} nodeValid
 * @property {boolean} npmValid
 */

/**
 * Returns an object with validation results for Node and NPM versions.
 *
 * @returns {VersionCheckResult}
 */
export function checkVersions() {
  const pkg = JSON.parse(
    fs.readFileSync(path.resolve('./package.json'), 'utf8'),
  );
  const { node: nodeRange, npm: npmRange } = pkg.engines;

  const nodeVersion = process.version;
  const npmVersion = execSync('npm --version').toString().trim();

  const nodeValid = semver.satisfies(nodeVersion, nodeRange);
  const npmValid = semver.satisfies(npmVersion, npmRange);

  return {
    nodeVersion,
    npmVersion,
    nodeRange,
    npmRange,
    nodeValid,
    npmValid,
  };
}
