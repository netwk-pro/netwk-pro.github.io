/* ==========================================================================
src/lib/utils/env.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * @file env.js
 * @description Unified environment detection utility.
 * Normalizes process.env and import.meta.env for consistent behavior
 * across SvelteKit server (SSR), client (browser), and build-time contexts.
 *
 * Supports: dev, prod, ci, test, audit.
 *
 * @module src/lib/utils
 * @author Scott Lopez
 * @updated 2025-11-02
 *
 * @example
 * import { detectEnvironment } from '$lib/utils/env.js';
 * const { isAudit, isProd } = detectEnvironment();
 * if (isAudit) console.log('Running in audit mode');
 */

/**
 * @typedef {object} EnvironmentInfo
 * @property {string} mode - The detected environment mode (`dev`, `prod`, `audit`, etc.).
 * @property {boolean} isDev - True when running in a development or local environment.
 * @property {boolean} isProd - True when running in production.
 * @property {boolean} isAudit - True when running in audit / staging environments.
 * @property {boolean} isCI - True when running in continuous integration (CI) pipelines.
 * @property {boolean} isTest - True when running under test or mock environments.
 */

/**
 * Normalizes environment detection across client, SSR, and build contexts.
 * Uses `import.meta.env` for Vite build-time vars and `process.env` for runtime vars.
 *
 * @returns {EnvironmentInfo} Normalized environment context flags.
 */
export function detectEnvironment() {
  /** @type {string | undefined} */
  const viteMode = import.meta.env?.MODE;
  /** @type {string | undefined} */
  const publicEnvMode = import.meta.env?.PUBLIC_ENV_MODE;

  /** @type {string | undefined} */
  const nodeEnv =
    typeof process !== 'undefined' && process?.env?.NODE_ENV
      ? process.env.NODE_ENV
      : undefined;

  /** @type {string | undefined} */
  const envMode =
    typeof process !== 'undefined' && process?.env?.ENV_MODE
      ? process.env.ENV_MODE
      : undefined;

  // Fallback order — guarantees a mode string even if nothing is set
  /** @type {string} */
  const mode = envMode || publicEnvMode || viteMode || nodeEnv || 'unknown';

  // Return a normalized, typed object
  return {
    mode,
    isDev: ['development', 'dev'].includes(mode),
    isProd: ['production', 'prod'].includes(mode),
    isAudit: mode === 'audit',
    isCI: mode === 'ci',
    isTest: mode === 'test',
  };
}
