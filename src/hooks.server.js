/* ==========================================================================
src/hooks.server.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * SvelteKit server hook to set Content Security Policy (CSP) header.
 * @type {import('@sveltejs/kit').Handle}
 */
export async function handle({ event, resolve }) {
  // Create the response
  const response = await resolve(event);

  // Determine environment flags
  // Default to development policy if neither test nor prod
  const isTestEnvironment =
    process.env.NODE_ENV === 'development' ||
    process.env.ENV_MODE === 'dev' ||
    process.env.ENV_MODE === 'ci';
  const isProdEnvironment =
    process.env.NODE_ENV === 'production' || process.env.ENV_MODE === 'prod';

  console.log('[CSP Debug] NODE_ENV:', process.env.NODE_ENV);
  console.log('[CSP Debug] ENV_MODE:', process.env.ENV_MODE);

  // Determine report URI
  const reportUri =
    isProdEnvironment && !isTestEnvironment
      ? 'https://csp.netwk.pro/.netlify/functions/csp-report'
      : '/api/mock-csp';

  console.log('[CSP Debug] Using report URI:', reportUri);

  // Construct base policy
  const cspDirectives = [
    "default-src 'self';",
    "script-src 'self' 'unsafe-inline' https://us.i.posthog.com https://us-assets.i.posthog.com;",
    "style-src 'self' 'unsafe-inline';",
    "img-src 'self' data:;",
    "connect-src 'self' https://us.i.posthog.com https://us-assets.i.posthog.com;",
    "font-src 'self' data:;",
    "form-action 'self';",
    "base-uri 'self';",
    "object-src 'none';",
    "frame-ancestors 'none';",
    'upgrade-insecure-requests;',
    // Report CSP violations to external endpoint hosted at csp.netwk.pro
    `report-uri ${reportUri};`,
    'report-to csp-endpoint;',
  ];

  // Loosen up CSP for test environments (and allow local PostHog proxy)
  if (isTestEnvironment) {
    cspDirectives[1] =
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:* ws://localhost:*;";
    cspDirectives[2] =
      "script-src-elem 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:* ws://localhost:*;";
    cspDirectives[3] = "style-src 'self' 'unsafe-inline' http://localhost:*;";
    cspDirectives[4] = "img-src 'self' data: http://localhost:*;";
    cspDirectives[5] =
      "connect-src 'self' http://localhost:* ws://localhost:* https://us.i.posthog.com https://us-assets.i.posthog.com;";
  }

  response.headers.set(
    'Report-To',
    JSON.stringify({
      group: 'csp-endpoint',
      max_age: 10886400, // 18 weeks
      endpoints: [
        {
          url: 'https://csp.netwk.pro/.netlify/functions/csp-report',
        },
      ],
      include_subdomains: true,
    }),
  );

  response.headers.set('Content-Security-Policy', cspDirectives.join(' '));

  // Set other security headers
  response.headers.set(
    'Permissions-Policy',
    [
      'fullscreen=(self)',
      'sync-xhr=()',
      'camera=()',
      'microphone=()',
      'geolocation=()',
      'clipboard-read=()',
      'clipboard-write=(self)',
      'payment=()',
      'usb=()',
      'hid=()',
      'gamepad=()',
      'serial=()',
      'publickey-credentials-get=()',
      'browsing-topics=()',
    ].join(', '),
  );

  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-Frame-Options', 'DENY');

  if (process.env.ENV_MODE !== 'test' && process.env.ENV_MODE !== 'ci') {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains;', // No preload here
    );
  }

  return response;
}

/**
 * SvelteKit server-side error handler to log SSR errors.
 * @type {import('@sveltejs/kit').HandleServerError}
 */
export function handleError({ error, event }) {
  console.error('🔴 SSR Error in route:', event.url.pathname);
  console.error(error);

  return {
    message: 'A server-side error occurred',
  };
}
