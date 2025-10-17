/* ==========================================================================
scripts/checkEnv.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * Utility to validate execution environment
 * Ensures `ENV_MODE` is defined and matches allowed environments
 *
 * @module scripts/
 * @author Scott Lopez
 * @updated 2025-05-21
 */

import { basename } from 'path';
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
  const current = process.env.ENV_MODE;
  let mode = current;
  let valid = false;
  let wasDefaulted = false;

  if (!mode) {
    mode = 'dev';
    process.env.ENV_MODE = mode;
    wasDefaulted = true;
    console.warn("⚠️ ENV_MODE not set. Defaulting to 'dev'.");
  }

  valid = validEnvs.has(mode);

  if (valid) {
    const tag = wasDefaulted ? '[info]' : '[ok]';
    console.log(`${tag} ENV_MODE is set to: "${mode}"`);
  } else {
    console.error(
      `❌ Invalid ENV_MODE "${mode}". Must be one of: ${[...validEnvs].join(', ')}`,
    );
  }

  return {
    mode,
    valid,
    wasDefaulted,
    allowed: [...validEnvs].sort(),
  };
}

// ✅ Run only if called directly via CLI
if (basename(fileURLToPath(import.meta.url)) === basename(process.argv[1])) {
  checkEnv();
}
