/* ==========================================================================
src/hooks.server.js

Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

import { isProbelyScanner } from '$lib/security/probely.js';
import { detectEnvironment } from '$lib/utils/env.js';

/**
 * SvelteKit server hook to set Content Security Policy (CSP) header.
 * @type {import('@sveltejs/kit').Handle}
 */
export async function handle({ event, resolve }) {
  /**
   * 🔍 Probely scanner allowlisting
   * - Robust UA check (case‑insensitive)
   * - Normalized X‑Forwarded‑For parsing
   * - Avoids false positives
   * @see https://help.probely.com/en/articles/5112461/
   */

  /** @type {string} */
  const userAgent = event.request.headers.get('user-agent') || '';

  /** @type {string} */
  const remoteIp =
    event.request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '';

  const isProbely = isProbelyScanner({ ua: userAgent, ip: remoteIp });

  if (isProbely) {
    console.info('[Probely Bypass] Matched scanner request:', {
      ip: remoteIp,
      ua: userAgent,
    });
  }
  const response = await resolve(event);

  const env = detectEnvironment(event.url.hostname);
  const { isAudit, isDebug, isTest, isProd } = env;

  const reportUri =
    isProd && !isTest && !isAudit
      ? 'https://csp.netwk.pro/.netlify/functions/csp-report'
      : '/api/mock-csp';

  console.log('[CSP] Report URI set to:', reportUri);

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

  // 📋 Add reporting for environments that support it
  const shouldReport = !isAudit && !isTest;

  if (shouldReport) {
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

  // ✅ Apply CSP — enforce in prod or audit, report-only in dev/test
  const cspHeader =
    (isProd || isAudit) && !isTest
      ? 'Content-Security-Policy'
      : 'Content-Security-Policy-Report-Only';

  response.headers.set(cspHeader, cspDirectives.join(' '));

  // Log applied CSP headers in debug/audit/test
  if (isDebug || isAudit) {
    console.info(`[CSP] Applied header: ${cspHeader}`);
    console.info(`[CSP] Policy:`, cspDirectives.join(' '));
    console.info(`[CSP] Reporting to: ${reportUri}`);
  }

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
