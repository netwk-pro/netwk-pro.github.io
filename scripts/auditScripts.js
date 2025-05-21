/* ==========================================================================
scripts/auditScripts.js

SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * Audit for untested script modules in scripts/
 * Looks for any .js files without a matching test in tests/
 *
 * @module scripts/
 * @author SunDevil311
 * @updated 2025-05-20
 */

import fs from "fs";
import path from "path";

const scriptsDir = path.resolve("./scripts");
const testsDir = path.resolve("./tests");

// Allow-list for scripts that intentionally have no test
const allowList = new Set([
  "checkNode.js",
  "auditScripts.js", // itself
]);

const scriptFiles = fs
  .readdirSync(scriptsDir)
  .filter((file) => file.endsWith(".js"));

const testFiles = fs
  .readdirSync(testsDir)
  .filter((file) => file.endsWith(".test.js") || file.endsWith(".spec.js"));

const testedModules = new Set(
  testFiles.map((f) => f.replace(/\.test\.js$|\.spec\.js$/, "")),
);

const untested = scriptFiles.filter((file) => {
  const base = file.replace(/\.js$/, "");
  return !allowList.has(file) && !testedModules.has(base);
});

const pathRelative = (file) =>
  path.relative(process.cwd(), path.join(scriptsDir, file));

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
      ".js",
      ".test.js",
    )})`,
  );
} else {
  console.log("✅ All script files have corresponding tests.");
}
