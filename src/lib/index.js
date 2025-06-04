/* ==========================================================================
src/lib/index.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * Library index file
 *
 * @file index.js
 * @description Main export point for library components, utilities, and assets
 * @module src/lib
 * @author SunDevil311
 * @updated 2025-06-03
 */

// Re-export images from dedicated images.js file
// This maintains backward compatibility with existing imports
export * from "./images.js";

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
    NAME: "Network Pro Strategies",
    APP_NAME: "Network Pro",
    YEAR: "2025",
  },
  CONTACT: {
    EMAIL: "support (at) neteng.pro",
    SECURE: "contact (at) s.neteng.pro",
    PRIVACY: "privacy (at) netwk.pro",
    PHONE: "(623) 252-4350",
  },
  PAGE: {
    BLANK: "_blank",
    REL: "noopener noreferrer",
    SELF: "_self",
  },
  NAV: {
    BACKTOP: "Back to top",
    HREFTOP: "#top",
  },
  LINKS: {
    HOME: "https://netwk.pro",
    BLOG: "https://blog.netwk.pro",
  },
};
