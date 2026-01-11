#!/usr/bin/env node

/* ==========================================================================
scripts/generateTest.js

Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * @file generateTest.js
 * @description Auto-generates a *.test.js scaffold for utilities and
 * components.
 * @module scripts
 * @author Scott Lopez
 * @updated 2025-06-01
 */

import fs from 'fs';
import path from 'path';

const [, , targetFile] = process.argv;

if (!targetFile) {
  console.error('Usage: node generateTest.js <path/to/yourFile.js>');
  process.exit(1);
}

const absolutePath = path.resolve(targetFile);
const parsed = path.parse(absolutePath);

const testFileName = `${parsed.name}.test.js`;
const testFilePath = path.join(
  parsed.dir.replace('src', 'tests/unit'),
  testFileName,
);

// Example scaffold content
const scaffold = `/**
 * Unit tests for ${parsed.base}
 */

import { describe, it, expect } from "vitest";
import * as Module from "${path.relative(path.dirname(testFilePath), absolutePath).replace(/\\/g, '/')}";

describe("${parsed.name}", () => {
  it("should have tests", () => {
    expect(true).toBe(true);
  });
});
`;

fs.mkdirSync(path.dirname(testFilePath), { recursive: true });

if (fs.existsSync(testFilePath)) {
  console.warn(`Test file already exists at: ${testFilePath}`);
} else {
  fs.writeFileSync(testFilePath, scaffold);
  console.log(`✅ Test scaffold created: ${testFilePath}`);
}
