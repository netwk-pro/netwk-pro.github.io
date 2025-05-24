/* ==========================================================================
scripts/auditScripts.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * Audit for untested script modules in scripts/
 * Looks for any .js/.mjs files without a matching test in tests/
 *
 * @module scripts/
 * @author SunDevil311
 * @updated 2025-05-21
 */

import fs from "fs";
import path from "path";

const scriptsDir = path.resolve("./scripts");
const testsDir = path.resolve("./tests");

// Scripts intentionally excluded from test coverage
const allowList = new Set([
  "checkNode.js",
  "auditScripts.js", // itself
]);

// Recursively gather all test files
function getAllTestFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getAllTestFiles(fullPath));
    } else if (
      entry.isFile() &&
      (entry.name.endsWith(".test.js") ||
        entry.name.endsWith(".spec.js") ||
        entry.name.endsWith(".test.mjs") ||
        entry.name.endsWith(".spec.mjs"))
    ) {
      files.push(fullPath);
    }
  }

  return files;
}

// Get base names of tested modules (no extension or test specifier)
const testFiles = getAllTestFiles(testsDir);
const testedModules = new Set(
  testFiles.map((filePath) =>
    path
      .basename(filePath)
      .replace(/\.test\.js$|\.spec\.js$|\.test\.mjs$|\.spec\.mjs$/, ""),
  ),
);

// Gather all scripts (.js and .mjs)
const scriptFiles = fs
  .readdirSync(scriptsDir)
  .filter((file) => file.endsWith(".js") || file.endsWith(".mjs"));

const untested = scriptFiles.filter((file) => {
  const base = file.replace(/\.(js|mjs)$/, "");
  return !allowList.has(file) && !testedModules.has(base);
});

const pathRelative = (file) =>
  path.relative(process.cwd(), path.join(scriptsDir, file));

// Output results
if (untested.length) {
  console.warn("\n⚠ Untested script files detected:\n");

  untested.forEach((file) => {
    const filePath = pathRelative(file);
    console.warn(
      `::warning file=${filePath},line=1,col=1::Missing test file for ${file}`,
    );
  });

  console.warn(
    `\nAdd a corresponding test file in /tests (e.g., ${untested[0].replace(
      /\.(js|mjs)$/,
      ".test.js",
    )})`,
  );
} else {
  console.log("✅ All script files have corresponding tests.");
}
