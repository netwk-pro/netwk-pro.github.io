/* ==========================================================================
scripts/checkEnv.js

Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * Utility to validate execution environment
 * Ensures `ENV_MODE` is defined and matches allowed environments
 *
 * @module scripts/
 * @author Scott Lopez
 * @updated 2026-03-12
 */

import { fileURLToPath } from 'url';

const validEnvs = new Set(['dev', 'test', 'ci', 'prod', 'preview']);

/**
 * Checks and returns validation for ENV_MODE
 * @returns {{
 *   mode: string,
 *   valid: boolean,
 *   wasDefaulted: boolean,
 *   allowed: string[]
 * }}
 */
export function checkEnv() {
  let mode = process.env.ENV_MODE;
  let wasDefaulted = false;

  if (!mode) {
    mode = 'dev';
    process.env.ENV_MODE = mode;
    wasDefaulted = true;
    console.warn("⚠️ ENV_MODE not set. Defaulting to 'dev'.");
  }

  const allowed = [...validEnvs].sort();
  const valid = validEnvs.has(mode);

  if (valid) {
    console.log(
      `${wasDefaulted ? '[info]' : '[ok]'} ENV_MODE is set to: "${mode}"`,
    );
  } else {
    console.error(
      `❌ Invalid ENV_MODE "${mode}". Must be one of: ${allowed.join(', ')}`,
    );
  }

  return {
    mode,
    valid,
    wasDefaulted,
    allowed,
  };
}

const thisFile = fileURLToPath(import.meta.url);

if (process.argv[1] && thisFile === process.argv[1]) {
  checkEnv();
}
