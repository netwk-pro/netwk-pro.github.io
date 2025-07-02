/* =========================================================================
vitest.config.server.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================= */

import { sveltekit } from '@sveltejs/kit/vite';
import lightningcssPlugin from 'vite-plugin-lightningcss';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    sveltekit(),
    lightningcssPlugin({
      minify: process.env.NODE_ENV === 'production',
      pruneUnusedFontFaceRules: true,
      pruneUnusedKeyframes: true,
      removeUnusedFontFaces: true,
    }),
  ],
  test: {
    name: 'server',
    environment: 'node',
    include: ['tests/unit/server/**/*.test.{js,mjs}'],
    exclude: ['tests/unit/**/*.svelte.test.{js,mjs}'],
    reporters: ['default', 'json'],
    testTimeout: 10000,
    outputFile: {
      json: './reports/server/results.json',
    },
    coverage: {
      provider: 'v8',
      reporter: ['html'],
      reportsDirectory: './reports/server/coverage',
    },
  },
});
