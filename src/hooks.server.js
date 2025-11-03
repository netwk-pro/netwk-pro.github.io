/* ==========================================================================
src/hooks.server.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

import { detectEnvironment } from '$lib/utils/env.js';

/**
 * SvelteKit server hook to set Content Security Policy (CSP) header.
 * @type {import('@sveltejs/kit').Handle}
 */
export async function handle({ event, resolve }) {
  const response = await resolve(event);

  const env = detectEnvironment(event.url.hostname);
  const { isAudit, isDebug, isTest, isProd, mode, effective } = env;

  // Show logs in dev only
  if (isDebug) {
    console.log('[CSP Debug ENV]', {
      mode,
      effective,
      hostname: event.url.hostname,
      isAudit,
      isTest,
      isProd,
    });
  }

  // Determine report URI
  const reportUri =
    isProd && !isTest && !isAudit
      ? 'https://csp.netwk.pro/.netlify/functions/csp-report'
      : '/api/mock-csp';

  // Base hardened policy
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
  ];

  // 🧪 Looser CSP for local/CI test environments
  if (isDebug) {
    cspDirectives[1] =
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:* ws://localhost:*;";
    cspDirectives[2] = "style-src 'self' 'unsafe-inline' http://localhost:*;";
    cspDirectives[3] = "img-src 'self' data: http://localhost:*;";
    cspDirectives[4] =
      "connect-src 'self' http://localhost:* ws://localhost:* https://us.i.posthog.com https://us-assets.i.posthog.com;";
  }

  // 🧩 Hardened CSP for audit environment — no analytics, no CSP reporting
  if (isAudit) {
    cspDirectives[1] = "script-src 'self' 'unsafe-inline';";
    cspDirectives[2] = "style-src 'self' 'unsafe-inline';";
    cspDirectives[3] = "img-src 'self' data:;";
    cspDirectives[4] = "connect-src 'self';";
  }

  // 📋 Attach CSP report directives ONLY in production
  if (isProd && !isAudit && !isTest) {
    cspDirectives.push(`report-uri ${reportUri};`, 'report-to csp-endpoint;');

    response.headers.set(
      'Report-To',
      JSON.stringify({
        group: 'csp-endpoint',
        max_age: 10886400, // 18 weeks
        endpoints: [{ url: reportUri }],
        include_subdomains: true,
      }),
    );
  }

  // ✅ Apply final CSP
  response.headers.set('Content-Security-Policy', cspDirectives.join(' '));

  // Standard security headers
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

  if (!isTest) {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains;',
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
  return { message: 'A server-side error occurred' };
}
