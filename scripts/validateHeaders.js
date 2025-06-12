/* ==========================================================================
scripts/validateHeaders.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * CSP header validation utility
 * Validates the Content-Security-Policy header in a headers file
 *
 * @module scripts/
 * @author SunDevil311
 * @updated 2025-05-18
 */

// validate-headers.js
import fs from 'fs';

const file = './_headers';
const lines = fs.readFileSync(file, 'utf-8').split('\n');

let currentPath = null;
let errors = [];

let currentHeader = null;
let headerValueBuffer = [];

function flushBufferedHeader(lineNum) {
  if (!currentHeader) return;

  const value = headerValueBuffer.join(' ').trim();

  if (currentHeader !== 'Content-Security-Policy' && value.endsWith(';')) {
    errors.push(
      `Line ${lineNum}: Header '${currentHeader}' should not end with a semicolon`,
    );
  }

  if (currentHeader === 'Content-Security-Policy' && !value.endsWith(';')) {
    errors.push(
      `Line ${lineNum}: 'Content-Security-Policy' must end with a semicolon`,
    );
  }

  currentHeader = null;
  headerValueBuffer = [];
}

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const trimmed = line.trim();

  if (trimmed.startsWith('/*')) {
    if (currentPath) {
      errors.push(
        `Line ${i + 1}: Multiple '/*' blocks detected. Only one is allowed in Netlify _headers`,
      );
    }
    currentPath = trimmed;
    continue;
  }

  if (trimmed === '') continue;

  if (line.startsWith('  ')) {
    const colonIndex = line.indexOf(':');

    if (colonIndex !== -1) {
      // New header
      flushBufferedHeader(i);
      currentHeader = line.substring(0, colonIndex).trim();
      const rest = line.substring(colonIndex + 1).trim();
      headerValueBuffer.push(rest);
    } else if (currentHeader) {
      // Continuation of previous header
      headerValueBuffer.push(trimmed);
    } else {
      errors.push(
        `Line ${i + 1}: Continuation line without a valid header context`,
      );
    }
  }
}

// Final flush
flushBufferedHeader(lines.length);

if (errors.length) {
  console.error('❌ Header validation failed:');
  errors.forEach((e) => console.error('  -', e));
  process.exit(1);
} else {
  console.log('✅ _headers file passed validation!');
}
