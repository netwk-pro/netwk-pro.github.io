/* ==========================================================================
src/lib/index.js

Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * Library index file
 *
 * @file index.js
 * @description  Main export hub for $lib modules
 *
 * Components, images, and utilities are organized in submodules
 * and re-exported here for flat `$lib` imports.
 * @module src/lib
 * @author Scott Lopez
 * @updated 2026-01-10
 */

// Re-export all images so they can be imported directly from `$lib`
// Example usage:
//   import { logoPng } from '$lib';
export * from './images.js';

// Re-export all components so they can be imported directly from `$lib`
export * from './components/index.js';

// Re-export all pages so they can be imported directly from `$lib`
export * from './pages/index.js';

// Re-export `pgpKeys` data so it can be imported directly from `$lib`
export { PGP_KEYS } from '$lib/data/pgpKeys.js';

// Export utility functions
// Uncomment and adjust these as needed for your project
// export * from './utils/formatting.js';
// export * from './utils/validation.js';
// export * from './utils/helpers.js';

// Export components
// Uncomment and adjust these as needed for your project
// export * from './components/index.js';
// export { default as Button } from './components/Button.svelte';
// export { default as Card } from './components/Card.svelte';

/** @typedef {import('./types/appConstants.js').AppConstants} AppConstants */


/** @type {AppConstants} */
export const CONSTANTS = {
  COMPANY_INFO: {
    NAME: 'Network Pro Strategies',
    APP_NAME: 'Network Pro™',
    YEAR: '2025, 2026',
  },
  CONTACT: {
    EMAIL: 'support (at) netwk.pro',
    EMAIL_LINK: 'support@netwk.pro',
    SECURE: 'contact (at) s.neteng.pro',
    SECURE_LINK: 'contact@s.neteng.pro',
    PRIVACY: 'privacy (at) netwk.pro',
    PRIVACY_LINK: 'privacy@netwk.pro',
    PHONE: '(602) 428-5300',
  },
  PAGE: {
    BLANK: '_blank',
    REL: 'noopener noreferrer',
    SELF: '_self',
  },
  NAV: {
    BACKTOP: 'Back to top',
    HREFTOP: '#top',
  },
  LINKS: {
    HOME: 'https://netwk.pro',
    BLOG: 'https://blog.netwk.pro',
  },
};
