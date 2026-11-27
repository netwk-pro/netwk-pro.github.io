/* =========================================================================
vitest.config.client.js

Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================= */

import { sveltekit } from '@sveltejs/kit/vite';
import { svelteTesting } from '@testing-library/svelte/vite';
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
    svelteTesting(),
    lightningcssPlugin({
      minify: process.env.NODE_ENV === 'production',
      pruneUnusedFontFaceRules: true,
      pruneUnusedKeyframes: true,
      removeUnusedFontFaces: true,
    }),
  ],

  // Svelte 5 / Runes compatibility (Vitest 4.x+)
  optimizeDeps: {
    include: ['svelte', '@sveltejs/kit'], // Ensures .svelte files are pre-bundled with rune support
  },

  test: {
    name: 'client',
    environment: 'jsdom',
    clearMocks: true,
    include: ['tests/unit/client/**/*.test.{js,mjs,svelte}'],
    exclude: [],
    setupFiles: ['./vitest-setup-client.js'],
    reporter: ['default', 'json'],
    testTimeout: 10000,
    outputFile: {
      json: './reports/client/results.json',
    },
    coverage: {
      provider: 'v8',
      reporter: ['html', 'text', 'lcov'],
      reportsDirectory: './reports/client/coverage',
    },

    // Optional: quiet down noisy vite logs
    logHeapUsage: false,
    isolate: true,
  },
});
