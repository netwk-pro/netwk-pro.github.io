/* ==========================================================================
src/routes/api/mock-csp/+server.js

Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function POST({ request }) {
  try {
    const data = await request.json();
    console.log('🔶 [Mock CSP] Payload:', data);
  } catch {
    console.warn('⚠️ [Mock CSP] No JSON body provided.');
  }

  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
