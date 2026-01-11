/* ==========================================================================
src/routes/relay-[slug]/[...catchall]/+server.js

Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * Universal mock for PostHog Proxy Handler
 *
 * @file +server.js
 * @description Mocks GET, HEAD, and OPTIONS
 * @module src/routes/relay-[slug]/[...catchall]
 * @author Scott Lopez
 * @updated 2025-10-17
 */

/** @typedef {import('@sveltejs/kit').RequestHandler} Handler */

/** @type {Handler} */
export function GET({ url }) {
  const path = url.pathname;

  // Match known mock paths
  if (path.includes('/flags')) {
    return new Response(
      JSON.stringify({
        feature_flags: [],
        groups: {},
        distinct_id: 'mock-user',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', 'X-Mock': 'true' },
      },
    );
  }

  if (path.includes('/config') || path.includes('/config.js')) {
    return new Response('{}', {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'X-Mock': 'true' },
    });
  }

  // Log unexpected paths during tests
  console.warn('[RELAY MOCK] Unhandled path:', path);

  // Default 404 response
  return new Response('Not Found', { status: 404 });
}

/** @type {Handler} */
export function HEAD() {
  return new Response(null, { status: 200 });
}

/** @type {Handler} */
export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      Allow: 'GET, HEAD, OPTIONS',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
