/* ==========================================================================
scripts/bundleCss.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * LightningCSS transform and minification utility
 * Transforms and minifies CSS files using LightningCSS (single file)
 *
 * @module scripts/
 * @author SunDevil311
 * @updated 2025-05-16
 */

import fs from "fs";
import { bundle } from "lightningcss";
import path from "path";

// Define the path to your input CSS file
const inputFilePath = path.resolve("src/lib/styles/css/offline.css");

// Define the path for the output CSS file
const outputFilePath = path.resolve("static/offline.min.css");

// Bundle and minify the CSS
const { code, map } = bundle({
  filename: inputFilePath,
  minify: true,
  sourceMap: true,
});

// Write the bundled CSS to the output file
fs.writeFileSync(outputFilePath, code);

// Only write the source map if it exists
if (map) {
  fs.writeFileSync(`${outputFilePath}.map`, map);
}
