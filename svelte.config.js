/* =========================================================================
svelte.config.js

Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================= */

import adapter from '@sveltejs/adapter-vercel'; // Vercel adapter for deployment
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'; // Vite preprocessor for Svelte

// Vite does not expose its resolved mode directly to this config object, so
// inspect the CLI args as a fallback for commands such as `vite --mode audit`.
function getCliMode() {
  const modeFlagIndex = process.argv.indexOf('--mode');
  if (modeFlagIndex !== -1) return process.argv[modeFlagIndex + 1];

  const inlineModeFlag = process.argv.find((arg) => arg.startsWith('--mode='));
  return inlineModeFlag?.slice('--mode='.length);
}

// PUBLIC_ENV_MODE is the deployment contract; other sources are only fallbacks
// for local commands and compatibility with existing scripts.
const envMode = (
  process.env.PUBLIC_ENV_MODE ||
  process.env.MODE ||
  getCliMode() ||
  'production'
).toLowerCase();

const isAudit = envMode === 'audit';
const isDebug = ['development', 'dev', 'test'].includes(envMode);
const cspReportUri = 'https://csp.netwk.pro/.netlify/functions/csp-report';

// Directives shared by every environment. `style-src 'unsafe-inline'` remains
// because Svelte transitions can create inline style elements at runtime.
const sharedCspDirectives = {
  'default-src': ['self'],
  'style-src': ['self', 'unsafe-inline'],
  'img-src': ['self', 'data:'],
  'font-src': ['self', 'data:'],
  'form-action': ['self'],
  'base-uri': ['self'],
  'object-src': ['none'],
  'frame-ancestors': ['none'],
  'upgrade-insecure-requests': true,
};

// Production permits the current analytics and banner sources, and sends CSP
// violations to the external report collector.
const productionCspDirectives = {
  ...sharedCspDirectives,
  'script-src': [
    'self',
    'https://us.i.posthog.com',
    'https://us-assets.i.posthog.com',
    'https://keepandroidopen.org',
  ],
  'connect-src': [
    'self',
    'https://us.i.posthog.com',
    'https://us-assets.i.posthog.com',
  ],
  'report-uri': [cspReportUri],
  'report-to': ['csp-endpoint'],
};

// Audit mode removes analytics and reporting egress while keeping the temporary
// Keep Android Open banner allowed.
const auditCspDirectives = {
  ...sharedCspDirectives,
  'script-src': ['self', 'https://keepandroidopen.org'],
  'connect-src': ['self'],
};

// Dev and test use report-only CSP so local tooling, HMR, and diagnostics can
// surface violations without blocking the developer workflow.
const debugCspDirectives = {
  ...sharedCspDirectives,
  'script-src': [
    'self',
    'unsafe-eval',
    'http://localhost:*',
    'ws://localhost:*',
    'https://keepandroidopen.org',
  ],
  'style-src': ['self', 'unsafe-inline', 'http://localhost:*'],
  'img-src': ['self', 'data:', 'http://localhost:*'],
  'connect-src': [
    'self',
    'http://localhost:*',
    'ws://localhost:*',
    'https://us.i.posthog.com',
    'https://us-assets.i.posthog.com',
  ],
};

// SvelteKit augments these policies with hashes/nonces for framework-generated
// inline code. Prerendered pages use hashes; dynamic pages use nonces.
const csp = {
  mode: 'auto',
  ...(isDebug
    ? { reportOnly: debugCspDirectives }
    : { directives: isAudit ? auditCspDirectives : productionCspDirectives }),
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Only vitePreprocess with PostCSS
  preprocess: vitePreprocess({ postcss: true }),

  kit: {
    // Vercel adapter configuration
    adapter: adapter({
      runtime: 'nodejs24.x',
    }),

    // Paths configuration for deployment
    paths: {
      base: '', // Always deploy to the root of the domain
    },

    csp,

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

  // File extensions for Svelte only
  extensions: ['.svelte'],
};

export default config;

// PostCSS configuration is handled separately in postcss.config.cjs
// Consult https://svelte.dev/docs#compile-time-svelte-preprocess
// for more information about preprocessors
