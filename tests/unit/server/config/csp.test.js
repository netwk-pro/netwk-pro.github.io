/* ==========================================================================
tests/unit/server/config/csp.test.js

Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * @file csp.test.js
 * @description Regression tests for the environment-specific SvelteKit
 * Content Security Policy configuration.
 * @module tests/unit/server/config
 * @author Scott Lopez
 * @updated 2026-11-26
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { createCsp } from '../../../../config/csp.js';
import { resolveEnvironment } from '../../../../config/env.js';

const MATOMO_ORIGIN = 'https://analytics.netwk.pro';
const CSP_REPORT_URI = 'https://csp.netwk.pro/.netlify/functions/csp-report';
const LOCAL_REPORT_URI = '/api/mock-csp';

/**
 * Resolve the environment for a Vite mode and build its CSP config.
 *
 * @param {string} mode - The native Vite mode to resolve.
 * @returns {ReturnType<typeof createCsp>} The CSP configuration.
 */
function cspForMode(mode) {
  return createCsp(resolveEnvironment(mode));
}

/**
 * Collect every source value across all directives of a policy.
 *
 * @param {Record<string, unknown>} directives - The CSP directives.
 * @returns {string[]} All string source values in the policy.
 */
function allSources(directives) {
  return Object.values(directives).filter(Array.isArray).flat().map(String);
}

describe('createCsp', () => {
  beforeEach(() => {
    for (const key of ['PUBLIC_ENV_MODE', 'MODE', 'ENV_MODE']) {
      vi.stubEnv(key, '');
    }
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('uses SvelteKit auto mode (hashes when prerendered, nonces otherwise)', () => {
    for (const mode of ['production', 'audit', 'development']) {
      expect(cspForMode(mode).mode).toBe('auto');
    }
  });

  describe('production', () => {
    it('enforces the policy rather than reporting only', () => {
      const csp = cspForMode('production');

      expect(csp.directives).toBeDefined();
      expect(csp.reportOnly).toBeUndefined();
    });

    it('permits the configured Matomo origin for scripts and connections', () => {
      const directives = cspForMode('production').directives ?? {};

      expect(directives['script-src']).toEqual(['self', MATOMO_ORIGIN]);
      expect(directives['connect-src']).toEqual(['self', MATOMO_ORIGIN]);
    });

    it('includes the existing reporting directives', () => {
      const directives = cspForMode('production').directives ?? {};

      expect(directives['report-uri']).toEqual([CSP_REPORT_URI]);
      expect(directives['report-to']).toEqual(['csp-endpoint']);
    });

    it('retains the shared hardening directives', () => {
      const directives = cspForMode('production').directives ?? {};

      expect(directives['default-src']).toEqual(['self']);
      expect(directives['object-src']).toEqual(['none']);
      expect(directives['frame-ancestors']).toEqual(['none']);
      expect(directives['base-uri']).toEqual(['self']);
      expect(directives['form-action']).toEqual(['self']);
      expect(directives['upgrade-insecure-requests']).toBe(true);
    });
  });

  describe('audit', () => {
    it('enforces the policy rather than reporting only', () => {
      const csp = cspForMode('audit');

      expect(csp.directives).toBeDefined();
      expect(csp.reportOnly).toBeUndefined();
    });

    it('restricts scripts and connections to the same origin', () => {
      const directives = cspForMode('audit').directives ?? {};

      expect(directives['script-src']).toEqual(['self']);
      expect(directives['connect-src']).toEqual(['self']);
    });

    it('has no external analytics or reporting destinations', () => {
      const directives = cspForMode('audit').directives ?? {};

      expect(directives['report-uri']).toBeUndefined();
      expect(directives['report-to']).toBeUndefined();
      expect(allSources(directives)).not.toContain(MATOMO_ORIGIN);
      expect(allSources(directives)).not.toContain(CSP_REPORT_URI);
      expect(
        allSources(directives).filter((source) => /^https?:\/\//.test(source)),
      ).toEqual([]);
    });

    it('cannot be downgraded to report-only by ENV_MODE=dev', () => {
      vi.stubEnv('ENV_MODE', 'dev');

      const csp = cspForMode('audit');

      expect(csp.reportOnly).toBeUndefined();
      expect(csp.directives?.['script-src']).toEqual(['self']);
    });
  });

  describe.each(['development', 'dev', 'test'])('%s', (mode) => {
    it('uses a report-only policy and no enforced directives', () => {
      const csp = cspForMode(mode);

      expect(csp.reportOnly).toBeDefined();
      expect(csp.directives).toBeUndefined();
    });

    it('reports to the existing local endpoint only', () => {
      const reportOnly = cspForMode(mode).reportOnly ?? {};

      expect(reportOnly['report-uri']).toEqual([LOCAL_REPORT_URI]);
      expect(allSources(reportOnly)).not.toContain(CSP_REPORT_URI);
      expect(allSources(reportOnly)).not.toContain(MATOMO_ORIGIN);
    });
  });

  it.each(['codex', 'staging', 'unknown-mode'])(
    'retains the enforced production policy for unrecognized mode %s',
    (mode) => {
      const csp = cspForMode(mode);

      expect(csp.reportOnly).toBeUndefined();
      expect(csp.directives).toEqual(cspForMode('production').directives);
    },
  );
});
