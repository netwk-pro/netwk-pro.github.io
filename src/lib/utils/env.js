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
 * @property {string} mode - The resolved environment mode (from ENV_MODE or PUBLIC_ENV_MODE).
 * @property {string} nodeEnv - The Node environment ('development' or 'production').
 * @property {boolean} isDev - True if running in development mode.
 * @property {boolean} isProd - True if running in production mode.
 * @property {boolean} isAudit - True if running in audit mode.
 * @property {boolean} isCI - True if running in CI/CD environment.
 * @property {boolean} isTest - True if running in test/dev/CI contexts.
 */

/**
 * Detects and normalizes environment flags across Node and Vite contexts.
 * @returns {EnvironmentInfo} A structured object describing the current environment state.
 */
export function detectEnvironment() {
  /** @type {ImportMetaEnv | Record<string, string>} */
  const metaEnv =
    typeof import.meta !== 'undefined' ? (import.meta.env ?? {}) : {};

  // Guard for environments where process isn't defined (browser)
  const safeProcessEnv =
    typeof process !== 'undefined' && process.env ? process.env : {};

  // Safely resolve mode
  const mode =
    safeProcessEnv.ENV_MODE ||
    metaEnv.PUBLIC_ENV_MODE ||
    safeProcessEnv.NODE_ENV ||
    metaEnv.MODE ||
    'development';

  const nodeEnv = safeProcessEnv.NODE_ENV || metaEnv.MODE || 'development';

  const isDev = nodeEnv === 'development';
  const isProd = nodeEnv === 'production';
  const isCI = mode === 'ci';
  const isAudit = mode === 'audit';
  const isTest = ['test', 'dev', 'ci'].includes(mode) || isDev;

  return { mode, nodeEnv, isDev, isProd, isAudit, isCI, isTest };
}
