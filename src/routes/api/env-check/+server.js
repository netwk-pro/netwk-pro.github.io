/* ==========================================================================
src/routes/api/env-check/+server.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * @file Returns the current environment state (client + server vars)
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function GET() {
  const data = {
    NODE_ENV: process.env.NODE_ENV,
    ENV_MODE: process.env.ENV_MODE,
    PUBLIC_ENV_MODE: process.env.PUBLIC_ENV_MODE,
    IMPORT_META_MODE: import.meta.env.MODE,
    IMPORT_META_PUBLIC: import.meta.env.PUBLIC_ENV_MODE,
  };

  return new Response(JSON.stringify(data, null, 2), {
    headers: { 'Content-Type': 'application/json' },
  });
}
