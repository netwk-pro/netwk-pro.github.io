/* ==========================================================================
src/routes/__audit/headers/+server.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * @file +server.js
 * @description Audit header debug endpoint.
 * This route is used to verify runtime header behavior in the audit environment.
 * It returns a 204 No Content response with diagnostic headers.
 * @module src/routes/__audit/headers
 * @author Scott Lopez
 * @updated 2025-11-11
 */

/**
 * @param {import('@sveltejs/kit').RequestEvent} _event
 * @returns {Response}
 */
export function GET(_event) {
  return new Response(null, {
    status: 204,
    headers: {
      'X-Env': process.env.NODE_ENV ?? 'undefined',
      'X-Mode': process.env.ENV_MODE ?? 'unset',
      'X-Public-Mode': process.env.PUBLIC_ENV_MODE ?? 'unset',
      'X-Check': 'audit-path-active'
    }
  });
}
