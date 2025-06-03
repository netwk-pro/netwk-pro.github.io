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
 * @updated 2025-06-02
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

/**
 * @typedef {{
 *   COMPANY: string,
 *   APP_NAME: string,
 *   COPYRIGHT_YEAR: string,
 *   CONTACT_EMAIL: string,
 *   SECURE_EMAIL: string,
 *   PRIVACY_EMAIL: string,
 *   PHONE: string,
 * }} AppConstants
 */

/** @type {AppConstants} */
export const CONSTANTS = {
  COMPANY: "Network Pro Strategies",
  APP_NAME: "Network Pro",
  COPYRIGHT_YEAR: "2025",
  CONTACT_EMAIL: "support (at) neteng.pro",
  SECURE_EMAIL: "contact (at) s.neteng.pro",
  PRIVACY_EMAIL: "privacy (at) netwk.pro",
  PHONE: "(623) 252-4350"
};
