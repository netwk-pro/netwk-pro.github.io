/* ==========================================================================
scripts/checkNode.js

SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * Utility to check Node.js and NPM version
 * Ensures the current environment matches the required versions from package.json
 *
 * @module scripts/
 * @author SunDevil311
 * @updated 2025-05-20
 */

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import semver from "semver";

// Load engines from package.json
const pkg = JSON.parse(fs.readFileSync(path.resolve("./package.json"), "utf8"));
const { node: nodeRange, npm: npmRange } = pkg.engines;

// Check Node version
if (!semver.satisfies(process.version, nodeRange)) {
  console.error(
    `⚠️ Node version ${process.version} does not match required range: ${nodeRange}`,
  );
  process.exit(1);
}

// Check NPM version
let npmVersion;

try {
  npmVersion = execSync("npm --version").toString().trim();
  if (!semver.satisfies(npmVersion, npmRange)) {
    console.error(
      `⚠️ NPM version ${npmVersion} does not match required range: ${npmRange}`,
    );
    process.exit(1);
  }
} catch (err) {
  console.error("❌ Failed to check NPM version:", err.message);
  process.exit(1);
}

if (!process.env.CI || process.env.VERBOSE === "true") {
  console.log(
    `✅ Node (${process.version}) matches ${nodeRange}, and NPM (${npmVersion}) matches ${npmRange}`,
  );
}
