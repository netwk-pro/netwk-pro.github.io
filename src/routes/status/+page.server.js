/* ==========================================================================
src/routes/status/+page.server.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * Server-side load function for /status route.
 *
 * Logs runtime environment variables for debugging purposes.
 * This function executes on the server during SSR and is used to verify
 * that environment variables (e.g., ENV_MODE and NODE_ENV) are properly
 * injected and available during runtime in Netlify's SSR context.
 *
 * @module src/routes/status
 * @author SunDevil311
 * @updated 2025-05-31
 */

export const prerender = false;

/**
 * @function load
 * @returns {{ ok: boolean }} Response indicating successful execution
 */
export function load() {
  console.log("[Status Debug] ENV_MODE:", process.env.ENV_MODE);
  console.log("[Status Debug] NODE_ENV:", process.env.NODE_ENV);
  return { ok: true };
}
