/* =========================================================================
config/sveltekit.js

Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================= */

import adapter from '@sveltejs/adapter-netlify'; // Netlify adapter for audit deployment
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { createCsp } from './csp.js';

/**
 * SvelteKit Vite plugin configuration.
 *
 * @typedef {import('@sveltejs/kit/vite').Config} SvelteKitConfig
 */

/**
 * Resolved deployment environment and associated flags.
 *
 * @typedef {import('./env.js').BuildEnvironment} BuildEnvironment
 */

/**
 * Generate the SvelteKit Vite plugin configuration.
 *
 * Configures preprocessing, Netlify deployment, application paths, manual
 * service worker registration, environment-specific Content Security Policy,
 * prerender error handling, and supported Svelte file extensions.
 *
 * @param {BuildEnvironment} environment - The resolved deployment environment
 *   and associated flags.
 * @returns {SvelteKitConfig} The complete SvelteKit plugin configuration for
 *   the resolved deployment environment.
 */
export function createSvelteKitConfig(environment) {
  return {
    // Vite preprocessing with PostCSS
    preprocess: vitePreprocess(),

    // Netlify adapter configuration (no runtime option needed)
    adapter: adapter(),

    // Paths configuration for deployment
    paths: {
      base: '', // Always deploy to the root of the domain
    },

    // Disable automatic registration of service worker
    // Registration is handled by src/lib/registerServiceWorker.js
    serviceWorker: {
      register: false,
    },

    // Environment-specific Content Security Policy
    csp: createCsp(environment),

    // SvelteKit 3 polls for new deployments hourly by default. Disable
    // interval polling to preserve the SvelteKit 2 behavior; app updates are
    // managed by the custom service worker lifecycle in
    // src/lib/registerServiceWorker.js. SvelteKit's same-origin, event-based
    // version checks (e.g. on window focus) still run.
    version: {
      pollInterval: 0,
    },

    prerender: {
      /**
       * Handle HTTP errors encountered during prerendering.
       *
       * Logs warnings for explicitly permitted error paths and terminates
       * the build when an unexpected HTTP error occurs.
       *
       * @param {object} details - Details of the prerender HTTP error.
       * @param {string} details.path - The path that produced the HTTP error.
       * @param {string} details.message - The associated HTTP error message.
       * @returns {void}
       * @throws {Error} If the path is not included in the warning list.
       */
      handleHttpError: ({ path, message }) => {
        /**
         * Paths for which prerender errors are logged without failing
         * the build.
         *
         * @type {string[]}
         */
        const warnList = ['/...404'];

        if (warnList.includes(path)) {
          console.warn(`Prerender error at path: ${path}, message: ${message}`);
          return;
        }

        // Otherwise, fail the build
        throw new Error(message);
      },
    },

    // File extensions for Svelte only
    extensions: ['.svelte'],
  };
}

// PostCSS configuration is handled separately in postcss.config.mjs
// Consult https://svelte.dev/docs/kit/integrations
// for more information about preprocessors
