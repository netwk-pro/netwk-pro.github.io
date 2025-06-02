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

/* Application constants moved to vite.config.js to be used at build time */
