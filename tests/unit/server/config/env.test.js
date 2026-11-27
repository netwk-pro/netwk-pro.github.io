/* ==========================================================================
tests/unit/server/config/env.test.js

Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * @file env.test.js
 * @description Regression tests for build-time deployment environment
 * resolution, which selects the SvelteKit CSP policy.
 * @module tests/unit/server/config
 * @author Scott Lopez
 * @updated 2026-11-26
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { resolveEnvironment } from '../../../../config/env.js';

/**
 * Environment variables that may influence (or must not influence)
 * environment resolution.
 *
 * @type {string[]}
 */
const ENV_KEYS = ['PUBLIC_ENV_MODE', 'MODE', 'ENV_MODE'];

describe('resolveEnvironment', () => {
  beforeEach(() => {
    // Start each test from a clean slate regardless of the invoking shell.
    for (const key of ENV_KEYS) vi.stubEnv(key, '');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('does not let ENV_MODE=dev override an explicit Vite audit mode', () => {
    vi.stubEnv('ENV_MODE', 'dev');

    const environment = resolveEnvironment('audit');

    expect(environment.envMode).toBe('audit');
    expect(environment.isAudit).toBe(true);
    expect(environment.isDebug).toBe(false);
  });

  it('ignores ENV_MODE entirely when selecting the environment', () => {
    vi.stubEnv('ENV_MODE', 'audit');

    const environment = resolveEnvironment('production');

    expect(environment.envMode).toBe('production');
    expect(environment.isAudit).toBe(false);
  });

  it('gives PUBLIC_ENV_MODE precedence over every other source', () => {
    vi.stubEnv('PUBLIC_ENV_MODE', 'audit');
    vi.stubEnv('MODE', 'development');
    vi.stubEnv('ENV_MODE', 'dev');

    const environment = resolveEnvironment('development');

    expect(environment.envMode).toBe('audit');
    expect(environment.isAudit).toBe(true);
    expect(environment.isDebug).toBe(false);
  });

  it('gives MODE precedence over the Vite mode', () => {
    vi.stubEnv('MODE', 'audit');

    const environment = resolveEnvironment('development');

    expect(environment.envMode).toBe('audit');
    expect(environment.isAudit).toBe(true);
  });

  it('falls back to the Vite mode when no variables are set', () => {
    expect(resolveEnvironment('development').envMode).toBe('development');
    expect(resolveEnvironment('audit').envMode).toBe('audit');
    expect(resolveEnvironment('codex').envMode).toBe('codex');
  });

  it('defaults to production when no source provides a mode', () => {
    const environment = resolveEnvironment('');

    expect(environment.envMode).toBe('production');
    expect(environment.isProduction).toBe(true);
    expect(environment.isDebug).toBe(false);
    expect(environment.isAudit).toBe(false);
  });

  it('normalizes the resolved mode to lowercase', () => {
    vi.stubEnv('PUBLIC_ENV_MODE', 'AUDIT');

    expect(resolveEnvironment('production').envMode).toBe('audit');
  });

  it.each(['development', 'dev', 'test'])(
    'classifies %s as a debug environment',
    (mode) => {
      const environment = resolveEnvironment(mode);

      expect(environment.isDebug).toBe(true);
      expect(environment.isAudit).toBe(false);
      expect(environment.isProduction).toBe(false);
    },
  );

  it('preserves the native Vite mode for diagnostics', () => {
    vi.stubEnv('PUBLIC_ENV_MODE', 'production');

    expect(resolveEnvironment('codex').mode).toBe('codex');
  });
});
