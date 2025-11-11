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
 * @param {import('@sveltejs/kit').RequestEvent} _event - Unused request event
 * @returns {Response} - A 204 response with environment-specific headers
 */
export function GET(_event) {
  /** @type {HeadersInit} */
  const headers = {
    'X-Env': process.env.NODE_ENV ?? 'undefined',
    'X-Check': 'audit-path-active',
  };

  return new Response(null, {
    status: 204,
    headers,
  });
}
