/* =========================================================================
vite.config.js

Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================= */

import { sveltekit } from '@sveltejs/kit/vite';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { isMainThread } from 'node:worker_threads';
import { defineConfig } from 'vite';
import devtoolsJson from 'vite-plugin-devtools-json';
import lightningcssPlugin from 'vite-plugin-lightningcss';

import { logBuildEnvironment, resolveEnvironment } from './config/env.js';
import { createSvelteKitConfig } from './config/sveltekit.js';

/**
 * Absolute filesystem path to the project root directory.
 *
 * @type {string}
 */
const projectRoot = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig(
  /**
   * Generate the Vite configuration for the current execution mode.
   *
   * Resolves the deployment environment, logs build diagnostics, and configures
   * public environment variables, TypeScript path resolution, Chrome DevTools,
   * SvelteKit, and Lightning CSS integration.
   *
   * @param {import('vite').ConfigEnv} configEnv - The Vite configuration
   *   environment.
   * @param {string} configEnv.mode - The native Vite execution mode.
   * @returns {import('vite').UserConfig} The complete Vite configuration
   *   for the current execution mode.
   */
  ({ mode }) => {
    // Resolve the build environment
    const environment = resolveEnvironment(mode);

    // Log diagnostics only for the primary (main-thread) evaluation, which
    // selects the CSP and drives the build. SvelteKit's post-build analyze
    // and prerender steps re-load this config in worker threads with Vite's
    // default mode (process.env.MODE ?? 'production'), so their banner would
    // misreport audit and codex builds as production. Those steps only read
    // environment-independent options (adapter, outDir, appDir, paths,
    // prerender handlers), so skipping their log loses no information.
    if (isMainThread) {
      logBuildEnvironment(environment);
    }

    return {
      // Keep PUBLIC_* available through import.meta.env.PUBLIC_*.
      // SvelteKit's env.publicPrefix controls $env/static/public and
      // $env/dynamic/public instead; this app currently uses Vite env access
      // in env/analytics code, so this is intentional.
      envPrefix: ['PUBLIC_'],

      resolve: {
        tsconfigPaths: true,
      },

      plugins: [
        devtoolsJson({
          projectRoot: resolve(projectRoot),
          normalizeForWindowsContainer: true,
          uuid: 'ad0db4f4-6172-4c1e-ae17-26b1bee53764',
        }),

        sveltekit(createSvelteKitConfig(environment)),

        lightningcssPlugin({
          minify: ['production', 'audit'].includes(mode),
          pruneUnusedFontFaceRules: true,
          pruneUnusedKeyframes: true,
          removeUnusedFontFaces: true,
        }),
      ],
    };
  },
);
