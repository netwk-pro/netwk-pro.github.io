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
 * @property {string} mode - Active environment mode (e.g. 'dev', 'prod', 'audit').
 * @property {boolean} isDev - True when running in development mode.
 * @property {boolean} isProd - True when running in production mode.
 * @property {boolean} isAudit - True when running in the audit or staging environment.
 * @property {boolean} isCI - True when running in continuous integration (CI) pipelines.
 * @property {boolean} isTest - True when running under test or mock environments.
 */

/**
 * Get the environment mode (frozen at build time).
 * This avoids Vercel runtime overriding import.meta.env.MODE.
 * @type {string}
 */
export const BUILD_ENV_MODE =
  import.meta.env.PUBLIC_ENV_MODE ||
  import.meta.env.MODE ||
  'production';

/**
 * Detects the current environment with fallbacks for audit, CI, test, etc.
 * @returns {EnvironmentInfo}
 */
export function detectEnvironment() {
  const mode = BUILD_ENV_MODE;

  return {
    mode,
    isDev: ['development', 'dev'].includes(mode),
    isProd: ['production', 'prod'].includes(mode),
    isAudit:
      mode === 'audit' ||
      /(^|\.)audit\.netwk\.pro$/i.test(
        typeof window !== 'undefined' ? window.location.hostname : '',
      ),
    isCI: mode === 'ci',
    isTest: mode === 'test',
  };
}
