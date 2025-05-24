/* ==========================================================================
scripts/flattenHeaders.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * CSP header flattening utility
 * Flattens the Content-Security-Policy header in a headers file
 *
 * @module scripts/
 * @author SunDevil311
 * @updated 2025-05-18
 */

import fs from "fs";

const HEADERS_PATH = "./.headers_new"; // update if needed
const OUTPUT_PATH = "./_headers.flattened";

const lines = fs.readFileSync(HEADERS_PATH, "utf-8").split("\n");
const output = [];

let cspLines = [];
let inCSP = false;

for (const line of lines) {
  if (line.trim().startsWith("Content-Security-Policy:")) {
    inCSP = true;
    cspLines.push(line.trim());
  } else if (inCSP && line.startsWith("  ")) {
    cspLines.push(line.trim());
  } else {
    if (inCSP) {
      // Output flattened CSP
      const flattened = cspLines
        .join(" ")
        .replace(/\s*;\s*/g, "; ") // Normalize spacing
        .replace(/\s+/g, " ")
        .trim();
      output.push(`  ${flattened}`);
      cspLines = [];
      inCSP = false;
    }
    output.push(line);
  }
}

// Handle edge case: CSP is last in file
if (cspLines.length > 0) {
  const flattened = cspLines
    .join(" ")
    .replace(/\s*;\s*/g, "; ")
    .replace(/\s+/g, " ")
    .trim();
  output.push(`  ${flattened}`);
}

fs.writeFileSync(OUTPUT_PATH, output.join("\n"));
console.log(`Flattened headers written to ${OUTPUT_PATH}`);
