/* =========================================================================
config/env.js

Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================= */

/**
 * Resolved deployment environment and associated flags.
 *
 * @typedef {object} BuildEnvironment
 * @property {string} mode - The native Vite execution mode.
 * @property {string} envMode - The resolved deployment environment.
 * @property {boolean} isAudit - Whether audit mode is active.
 * @property {boolean} isDebug - Whether development or test mode is active.
 * @property {boolean} isProduction - Whether production mode is active.
 */

/**
 * Resolve the deployment environment and derive environment-specific flags.
 *
 * Precedence (first non-empty value wins):
 * 1. `PUBLIC_ENV_MODE` - the deployment contract.
 * 2. `MODE` - compatibility with existing scripts.
 * 3. Vite's native mode - replaces the former `--mode` CLI parsing and the
 *    `NODE_ENV=development` fallback (`vite dev` resolves to `development`,
 *    `vite build` to `production`).
 * 4. `production` - the enforced default.
 *
 * `ENV_MODE` is intentionally not consulted. It is logged for diagnostics
 * only and must never influence CSP selection; for example, a shell with
 * `ENV_MODE=dev` must not downgrade `vite build --mode audit` to a
 * report-only policy.
 *
 * @param {string} mode - The native execution mode provided by Vite.
 * @returns {BuildEnvironment} The resolved deployment environment and
 *   associated flags.
 */
export function resolveEnvironment(mode) {
  const envMode = (
    process.env.PUBLIC_ENV_MODE ||
    process.env.MODE ||
    mode ||
    'production'
  ).toLowerCase();

  return {
    mode,
    envMode,
    isAudit: envMode === 'audit',
    isDebug: ['development', 'dev', 'test'].includes(envMode),
    isProduction: envMode === 'production',
  };
}

/**
 * Log build environment diagnostics and the selected CSP enforcement mode.
 *
 * @param {BuildEnvironment} environment - The resolved deployment environment
 *   and associated flags.
 * @returns {void}
 */
export function logBuildEnvironment(environment) {
  const { mode, envMode, isAudit, isDebug } = environment;

  /**
   * Print a colorized separator for build environment diagnostics.
   *
   * @returns {void}
   */
  const separator = () =>
    console.log(
      '\x1b[36m%s\x1b[0m',
      '──────────────────────────────────────────────',
    );

  separator();

  console.log('\x1b[33m%s\x1b[0m', `📦 Building Network Pro — mode: ${mode}`);

  separator();

  console.log('ENV_MODE:', process.env.ENV_MODE);
  console.log('PUBLIC_ENV_MODE:', process.env.PUBLIC_ENV_MODE);
  console.log('MODE:', process.env.MODE);
  console.log('NODE_ENV:', process.env.NODE_ENV);
  console.log('Resolved environment:', envMode);

  if (isAudit) {
    process.stderr.write(
      '🔒 Audit Mode Detected — hardened CSP and no analytics will be applied.\n',
    );
  }

  console.info(
    `[CSP] SvelteKit configured ${
      isDebug
        ? 'Content-Security-Policy-Report-Only'
        : 'Content-Security-Policy'
    } for ${envMode} mode.`,
  );

  separator();
}
