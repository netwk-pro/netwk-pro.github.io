/* =========================================================================
svelte.config.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================= */

import adapter from "@sveltejs/adapter-netlify"; // Netlify adapter for deployment
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte"; // Vite preprocessor for Svelte

const config = {
  // Preprocessors for enhanced functionality (vitePreprocess + mdsvex for Markdown support + svelte-preprocess for PostCSS)
  preprocess: [
    vitePreprocess({
      postcss: true,
      mdsvex: {
        extensions: [".svx", ".md"],
      },
    }),
  ],

  kit: {
    // Netlify adapter configuration
    adapter: adapter({
      edge: true, // Enable edge functions (used by CSP reporting endpoint)
      split: false, // Disable splitting function files (optional, enable if needed)
    }),

    // Paths configuration for deployment
    paths: {
      base: "", // Always deploy to the root of the domain
    },

    prerender: {
      // Handle HTTP errors during prerendering
      handleHttpError: ({ path, _referrer, message }) => {
        // Paths to ignore and warn about
        const warnList = ["/...404"];

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
  extensions: [".svelte", ".svx", ".md"], // Added .md for Markdown support
};

export default config;

// PostCSS configuration is handled separately in postcss.config.cjs
// Consult https://svelte.dev/docs#compile-time-svelte-preprocess
// for more information about preprocessors
