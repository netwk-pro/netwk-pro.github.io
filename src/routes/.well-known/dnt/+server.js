/* ==========================================================================
src/routes/.well-known/dnt/+server.js

Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * @file +server.js
 * @description Site-wide W3C Do Not Track tracking status resource.
 * @see https://w3c.github.io/dnt/drafts/tracking-dnt.html#status-representation
 * @module src/routes/.well-known/dnt
 * @author Scott Lopez
 * @updated 2026-04-25
 */

/**
 * @type {import('./$types').RequestHandler}
 */
export function GET() {
  return new Response(
    // `N` signals that data collected by this origin is not used for tracking.
    JSON.stringify({
      tracking: 'N',
      policy: '/.well-known/dnt-policy.txt',
      config: '/privacy#tracking',
    }),
    {
      headers: {
        'Content-Type': 'application/tracking-status+json',
        // W3C TSR clients may cache stable site-wide status for preflight checks.
        'Cache-Control': 'public, max-age=86400',
      },
    },
  );
}
