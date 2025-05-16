/* ==========================================================================
src/lib/index.js

SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * Library index file
 * Main export point for library components, utilities, and assets
 *
 * @module src/lib
 * @author SunDevil311
 * @updated 2025-05-14
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
 * Application constants
 * Common values used throughout the application
 *
 * @type {object}
 */
export const CONSTANTS = {
  APP_NAME: "Network Pro",
  COPYRIGHT_YEAR: "2025",
  CONTACT_EMAIL: "contact@s.neteng.pro",
};
