/* =========================================================================
vite.config.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================= */

import { sveltekit } from '@sveltejs/kit/vite';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import devtoolsJson from 'vite-plugin-devtools-json';
import lightningcssPlugin from 'vite-plugin-lightningcss';
import tsconfigPaths from 'vite-tsconfig-paths'; // NEW: tsconfig/jsconfig alias support

// Compute absolute project root
const projectRoot = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  plugins: [
    tsconfigPaths(), // Insert before sveltekit()
    devtoolsJson({
      projectRoot: resolve(projectRoot), // Correct key name
      normalizeForWindowsContainer: true, // optional, helps with path consistency on Windows or WSL
      uuid: 'ad0db4f4-6172-4c1e-ae17-26b1bee53764',
    }),
    sveltekit(),
    lightningcssPlugin({
      minify: process.env.NODE_ENV === 'production',
      pruneUnusedFontFaceRules: true,
      pruneUnusedKeyframes: true,
      removeUnusedFontFaces: true,
    }),
  ],
});
