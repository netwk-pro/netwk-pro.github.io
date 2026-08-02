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
 * @updated 2026-08-02
 */

/**
 * @type {import('./$types').RequestHandler}
 */
export function GET({ cookies, request }) {
  const dnt = request.headers.get('DNT');
  const hasPrivacySignal =
    dnt?.startsWith('1') === true || request.headers.get('Sec-GPC') === '1';
  const optedIn = cookies.get('enable_tracking') === 'true';
  const optedOut = cookies.get('disable_tracking') === 'true';
  let tracking = 'T';

  if (optedOut) tracking = 'N';
  else if (optedIn) tracking = 'C';
  else if (hasPrivacySignal) tracking = 'N';

  return new Response(
    JSON.stringify({
      tracking,
      controller: ['/'],
      policy: '/.well-known/dnt-policy.txt',
      config: 'https://netwk.pro/privacy#tracking',
    }),
    {
      headers: {
        'Content-Type': 'application/tracking-status+json',
        // The status varies by user-specific signals and preference cookies.
        'Cache-Control': 'private, no-store',
        Vary: 'Cookie, DNT, Sec-GPC',
      },
    },
  );
}
