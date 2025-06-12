/* ==========================================================================
scripts/openReport.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * @file openReport.js
 * @description Opens the HTML code coverage report for a specified target (client or server).
 * Handles platform-specific commands to launch the report in the default browser.
 *
 * @module scripts/
 * @author SunDevil311
 * @updated 2025-06-09
 */

import { exec } from 'child_process';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

// ESM replacement for __dirname
const __dirname = dirname(fileURLToPath(import.meta.url));

// Read the CLI argument: "client" or "server"
const target = process.argv[2];

if (!target) {
  console.error("❌ Please specify 'client' or 'server'");
  process.exit(1);
}

// Resolve the full path to the HTML report
const filePath = join(__dirname, `../reports/${target}/coverage/index.html`);

/**
 * Platform-specific shell commands to open the report in the default browser.
 * - Windows: uses `start`
 * - macOS: uses `open`
 * - Linux: uses `xdg-open`
 */
const open = {
  win32: `start "" "${filePath}"`,
  darwin: `open "${filePath}"`,
  linux: `xdg-open "${filePath}"`,
};

const platform = process.platform;
const command = open[platform];

if (!command) {
  console.error(`❌ Unsupported platform: ${platform}`);
  process.exit(1);
}

// Execute the shell command to open the report
exec(command, (err) => {
  if (err) {
    console.error(`❌ Failed to open coverage report: ${err.message}`);
    process.exit(1);
  } else {
    console.log(`✅ Opened coverage report for "${target}"`);
  }
});
