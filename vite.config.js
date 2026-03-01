/* =========================================================================
vite.config.js

Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================= */

import { sveltekit } from '@sveltejs/kit/vite';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import devtoolsJson from 'vite-plugin-devtools-json';
import lightningcssPlugin from 'vite-plugin-lightningcss';
import tsconfigPaths from 'vite-tsconfig-paths'; // tsconfig/jsconfig alias support

// Compute absolute project root
const projectRoot = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig(({ mode }) => {
  // --- 🧩 Log Build Environment Info -------------------------------------
  console.log(
    '\x1b[36m%s\x1b[0m',
    '──────────────────────────────────────────────',
  );
  console.log('\x1b[33m%s\x1b[0m', `📦 Building Network Pro — mode: ${mode}`);
  console.log(
    '\x1b[36m%s\x1b[0m',
    '──────────────────────────────────────────────',
  );
  console.log('ENV_MODE:', process.env.ENV_MODE);
  console.log('PUBLIC_ENV_MODE:', process.env.PUBLIC_ENV_MODE);
  console.log('NODE_ENV:', process.env.NODE_ENV);
  if (
    process.env.ENV_MODE === 'audit' ||
    process.env.PUBLIC_ENV_MODE === 'audit' ||
    mode === 'audit'
  ) {
    process.stderr.write(
      '🔒 Audit Mode Detected — hardened CSP and no analytics will be applied.\n',
    );
  }
  console.log(
    '\x1b[36m%s\x1b[0m',
    '──────────────────────────────────────────────',
  );

  // -----------------------------------------------------------------------

  return {
    envPrefix: ['PUBLIC_'],
    ssr: {
      // posthog-js ships both CJS and ESM entries. Vite SSR externalizes it by
      // default (it isn't pure-ESM), but Netlify's esbuild then resolves the
      // module-field path (dist/module.js — ESM) and emits a CJS require() for
      // that path, causing "SyntaxError: Unexpected token 'export'" at runtime.
      // Bundling it here at Vite build time avoids that runtime resolution step.
      noExternal: ['posthog-js'],
    },
    plugins: [
      tsconfigPaths(),
      devtoolsJson({
        projectRoot: resolve(projectRoot),
        normalizeForWindowsContainer: true,
        uuid: 'ad0db4f4-6172-4c1e-ae17-26b1bee53764',
      }),
      sveltekit(),
      lightningcssPlugin({
        minify: ['production', 'audit'].includes(mode),
        pruneUnusedFontFaceRules: true,
        pruneUnusedKeyframes: true,
        removeUnusedFontFaces: true,
      }),
    ],
  };
});
