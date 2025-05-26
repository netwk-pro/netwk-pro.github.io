/* ==========================================================================
src/routes/api/mock-csp/+server.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function POST({ request }) {
  console.log("🔶 [Mock CSP] Report received during dev/CI");

  // Optional: read/validate body for debugging
  try {
    const data = await request.json();
    console.log("🔶 [Mock CSP] Payload:", data);
  } catch {
    console.warn("⚠️ [Mock CSP] No JSON body provided.");
  }

  return new Response(null, { status: 204 });
}
