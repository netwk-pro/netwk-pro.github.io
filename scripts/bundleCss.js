/* ==========================================================================
scripts/bundleCss.js

Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * LightningCSS transform and minification utility
 * Transforms and minifies CSS files using LightningCSS (single file)
 *
 * @module scripts/
 * @author Scott Lopez
 * @updated 2026-01-10
 */

import fs from 'fs';
import { bundle } from 'lightningcss';
import path from 'path';

const inputFilePath = path.resolve('src/lib/styles/css/global.css');
const outputFilePath = path.resolve('src/lib/styles/global.min.css');

const { code, map } = bundle({
  filename: inputFilePath,
  minify: true,
  sourceMap: false,
});

// Ensure output directory exists
fs.mkdirSync(path.dirname(outputFilePath), { recursive: true });

// Convert CSS bytes -> string so we can append the sourceMappingURL comment
let cssText = Buffer.from(code).toString('utf8');

if (map) {
  const mapPath = `${outputFilePath}.map`;

  // Write map as raw bytes (no encoding argument)
  fs.writeFileSync(mapPath, Buffer.from(map));

  // Link it from the CSS (DevTools uses this)
  cssText += `\n/*# sourceMappingURL=${path.basename(mapPath)} */`;
}

// Write final CSS as UTF-8 text
fs.writeFileSync(outputFilePath, cssText, 'utf8');

console.log('CSS bundled →', outputFilePath);
