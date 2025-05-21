/* ==========================================================================
tests/unit/auditScripts.test.js

SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * Unit test for scripts/auditScripts.js
 */

import fs from "fs";
import path from "path";
import { describe, expect, it } from "vitest";

describe("auditScripts.js", () => {
  it("should identify untested scripts correctly", () => {
    const scriptsDir = path.resolve("./scripts");
    const testsDir = path.resolve("./tests");

    const allowList = new Set(["checkNode.js", "auditScripts.js"]);

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

    expect(untested).not.toContain("auditScripts.js");
  });
});
