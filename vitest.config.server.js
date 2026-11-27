/* =========================================================================
vitest.config.server.js

Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================= */

import { sveltekit } from '@sveltejs/kit/vite';
import lightningcssPlugin from 'vite-plugin-lightningcss';
import { defineConfig } from 'vitest/config';

import { createSvelteKitConfig } from './config/sveltekit.js';

/**
 * Fixed test environment for the shared SvelteKit configuration.
 *
 * Declared explicitly instead of calling resolveEnvironment() so inherited
 * shell or deployment variables (PUBLIC_ENV_MODE, MODE) cannot change the
 * configuration under test.
 *
 * @type {import('./config/env.js').BuildEnvironment}
 */
const testEnvironment = {
  mode: 'test',
  envMode: 'test',
  isAudit: false,
  isDebug: true,
  isProduction: false,
};

export default defineConfig({
  plugins: [
    sveltekit(createSvelteKitConfig(testEnvironment)),
    lightningcssPlugin({
      minify: process.env.NODE_ENV === 'production',
      pruneUnusedFontFaceRules: true,
      pruneUnusedKeyframes: true,
      removeUnusedFontFaces: true,
    }),
  ],
  test: {
    name: 'server',
    globals: true,
    environment: 'node',
    include: ['tests/unit/server/**/*.test.{js,mjs}'],
    exclude: ['tests/unit/**/*.svelte.test.{js,mjs}'],
    reporter: ['default', 'json'],
    testTimeout: 10000,
    restoreMocks: true,
    outputFile: {
      json: './reports/server/results.json',
    },
    coverage: {
      provider: 'v8',
      reporter: ['html', 'text', 'lcov'],
      reportsDirectory: './reports/server/coverage',
    },
  },
});
