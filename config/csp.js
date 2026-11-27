/* =========================================================================
config/csp.js

Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================= */

/**
 * SvelteKit Content Security Policy configuration.
 *
 * @typedef {NonNullable<import('@sveltejs/kit/vite').Config['csp']>} CspConfig
 */

/**
 * Content Security Policy directive definitions.
 *
 * @typedef {NonNullable<CspConfig['directives']>} CspDirectives
 */

/**
 * Resolved deployment environment and associated flags.
 *
 * @typedef {import('./env.js').BuildEnvironment} BuildEnvironment
 */

/**
 * External endpoint for collecting CSP violation reports.
 *
 * @type {string}
 */
const cspReportUri = 'https://csp.netwk.pro/.netlify/functions/csp-report';

/**
 * Trusted origin for Matomo analytics resources and requests.
 *
 * Typed as a CSP host source (rather than a plain string) so it satisfies
 * SvelteKit's `script-src` and `connect-src` directive types.
 *
 * @type {`https://${string}.${string}`}
 */
const matomoOrigin = 'https://analytics.netwk.pro';

/**
 * Content Security Policy directives shared by every environment.
 *
 * The style-src directive permits unsafe-inline because Svelte transitions
 * can create inline style elements at runtime.
 *
 * @type {CspDirectives}
 */
const sharedCspDirectives = {
  'default-src': ['self'],
  'style-src': ['self', 'unsafe-inline'],
  'img-src': ['self', 'data:'],
  'font-src': ['self', 'data:'],
  'form-action': ['self'],
  'base-uri': ['self'],
  'object-src': ['none'],
  'frame-ancestors': ['none'],
  'upgrade-insecure-requests': true,
};

/**
 * Enforced Content Security Policy directives for production deployments.
 *
 * Permits Matomo analytics and sends CSP violation reports to the external
 * report collector.
 *
 * @type {CspDirectives}
 */
const productionCspDirectives = {
  ...sharedCspDirectives,
  'script-src': ['self', matomoOrigin],
  'connect-src': ['self', matomoOrigin],
  'report-uri': [cspReportUri],
  'report-to': ['csp-endpoint'],
};

/**
 * Enforced Content Security Policy directives for audit deployments.
 *
 * Restricts scripts and connections to the same origin and removes external
 * analytics and CSP reporting destinations.
 *
 * @type {CspDirectives}
 */
const auditCspDirectives = {
  ...sharedCspDirectives,
  'script-src': ['self'],
  'connect-src': ['self'],
};

/**
 * Report-only Content Security Policy directives for development and testing.
 *
 * Accommodates local development tooling, hot module replacement, and
 * diagnostics without blocking the developer workflow.
 *
 * SvelteKit requires report-only policies to include a reporting directive.
 *
 * @type {CspDirectives}
 */
const debugCspDirectives = {
  ...sharedCspDirectives,
  'script-src': [
    'self',
    'unsafe-eval',
    'http://localhost:*',
    'ws://localhost:*',
  ],
  'style-src': ['self', 'unsafe-inline', 'http://localhost:*'],
  'img-src': ['self', 'data:', 'http://localhost:*'],
  'connect-src': ['self', 'http://localhost:*', 'ws://localhost:*'],
  'report-uri': ['/api/mock-csp'],
};

/**
 * Generate the Content Security Policy for the resolved deployment environment.
 *
 * Allows SvelteKit to select hashes for prerendered output and nonces for
 * dynamic responses, avoiding stale nonce headers while preserving support
 * for nonce-based CSP.
 *
 * Debug environments (development, dev, test) receive report-only
 * directives. Audit receives the hardened enforced policy. Every other
 * environment, including production and unrecognized modes, receives the
 * enforced production policy.
 *
 * @param {BuildEnvironment} environment - The resolved deployment environment
 *   and associated flags.
 * @returns {CspConfig} The environment-specific Content Security Policy
 *   configuration.
 */
export function createCsp(environment) {
  const { isAudit, isDebug } = environment;

  return {
    mode: 'auto',
    ...(isDebug
      ? { reportOnly: debugCspDirectives }
      : { directives: isAudit ? auditCspDirectives : productionCspDirectives }),
  };
}
