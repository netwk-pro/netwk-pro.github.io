/* =========================================================================
vitest.config.client.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================= */

import { sveltekit } from '@sveltejs/kit/vite';
import { svelteTesting } from '@testing-library/svelte/vite';
import lightningcssPlugin from 'vite-plugin-lightningcss';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    sveltekit(),
    svelteTesting(),
    lightningcssPlugin({
      minify: process.env.NODE_ENV === 'production',
      pruneUnusedFontFaceRules: true,
      pruneUnusedKeyframes: true,
      removeUnusedFontFaces: true,
    }),
  ],
  test: {
    name: 'client',
    environment: 'jsdom',
    clearMocks: true,
    include: ['tests/unit/client/**/*.test.{js,mjs,svelte}'],
    exclude: [],
    setupFiles: ['./vitest-setup-client.js'],
    reporters: ['default', 'json'],
    testTimeout: 10000,
    outputFile: {
      json: './reports/client/results.json',
    },
    coverage: {
      provider: 'v8',
      reporter: ['html'],
      reportsDirectory: './reports/client/coverage',
    },

    // Svelte 5 / Runes compatibility (Vitest 4.x+)
    optimizeDeps: {
      include: [/svelte/], // Ensures .svelte files are pre-bundled with rune support
    },

    // Optional: quiet down noisy vite logs
    logHeapUsage: false,
    isolate: true,
  },
});
