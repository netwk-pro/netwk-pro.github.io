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
 * @property {string} mode        - The build-time environment mode.
 * @property {string} effective   - The environment actually being used (after host fallback).
 * @property {boolean} isDev
 * @property {boolean} isProd
 * @property {boolean} isAudit
 * @property {boolean} isCI
 * @property {boolean} isTest
 */

/**
 * Build-time mode injected by Vite.
 * Always baked into the client bundle.
 * Falls back to 'production' if nothing else is defined.
 */
export const BUILD_ENV_MODE =
  import.meta.env.PUBLIC_ENV_MODE || import.meta.env.MODE || 'production';

/**
 * Detects the current environment, combining build-time
 * and runtime (hostname-based) checks.
 * Works safely in both Node and browser contexts.
 *
 * @returns {EnvironmentInfo}
 */
export function detectEnvironment() {
  const mode = BUILD_ENV_MODE;

  // Client-side fallback for audit/netwk environments
  const host = typeof window !== 'undefined' ? window.location.hostname : '';

  const hostIsAudit = /(^|\.)audit\.netwk\.pro$/i.test(host);

  const isDev = ['development', 'dev'].includes(mode);
  const isProd = ['production', 'prod'].includes(mode);
  const isAudit = mode === 'audit' || hostIsAudit;
  const isCI = mode === 'ci';
  const isTest = mode === 'test';

  // Prefer host-based detection if it disagrees with build-time
  const effective = hostIsAudit && !isAudit ? 'audit(host)' : mode;

  if (typeof window === 'undefined') {
    // Only log on server / build to avoid client noise
    console.log('[detectEnvironment] Build mode:', mode);
    if (hostIsAudit && mode !== 'audit') {
      console.log(
        '[detectEnvironment] Host suggests audit, overriding build-time mode.',
      );
    }
  }

  return { mode, effective, isDev, isProd, isAudit, isCI, isTest };
}
