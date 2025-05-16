/* =========================================================================
svelte.config.js

SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================= */

import adapter from "@sveltejs/adapter-netlify"; // Netlify adapter for deployment
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte"; // Vite preprocessor for Svelte
import { mdsvex } from "mdsvex"; // mdsvex for Markdown support
import preprocess from "svelte-preprocess"; // svelte-preprocess for additional preprocessing features

const config = {
  // Preprocessors for enhanced functionality (vitePreprocess + mdsvex for Markdown support + svelte-preprocess for PostCSS)
  preprocess: [
    vitePreprocess(), // Simplified (TypeScript is natively supported)
    mdsvex({ extensions: [".svx", ".md"] }), // Configure mdsvex with .svx and .md extensions
    preprocess({
      postcss: true, // Enable PostCSS support
    }),
  ],

  kit: {
    // Netlify adapter configuration
    adapter: adapter({
      edge: false, // Disable edge functions (optional, enable if needed)
      split: false, // Disable splitting function files (optional, enable if needed),
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
