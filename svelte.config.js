/* =========================================================================
svelte.config.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================= */

import adapter from '@sveltejs/adapter-vercel'; // Vercel adapter for deployment
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'; // Vite preprocessor for Svelte

const config = {
  // Only vitePreprocess with PostCSS
  preprocess: vitePreprocess({ postcss: true }),

  kit: {
    // Vercel adapter configuration
    adapter: adapter(),

    // Paths configuration for deployment
    paths: {
      base: '', // Always deploy to the root of the domain
    },

    prerender: {
      // Handle HTTP errors during prerendering
      handleHttpError: ({ path, _referrer, message }) => {
        // Paths to ignore and warn about
        const warnList = ['/...404'];

        if (warnList.includes(path)) {
          console.warn(`Prerender error at path: ${path}, message: ${message}`);
          return;
        }

        // Otherwise, fail the build
        throw new Error(message);
      },
    },
  },

  // File extensions for Svelte and mdsvex
  extensions: ['.svelte'],
};

export default config;

// PostCSS configuration is handled separately in postcss.config.cjs
// Consult https://svelte.dev/docs#compile-time-svelte-preprocess
// for more information about preprocessors
