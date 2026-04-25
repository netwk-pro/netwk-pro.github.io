/* ==========================================================================
src/hooks.server.js

Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

import { isProbelyScanner } from '$lib/security/probely.js';
import { detectEnvironment } from '$lib/utils/env.js';

const cspReportUri = 'https://csp.netwk.pro/.netlify/functions/csp-report';

/**
 * SvelteKit server hook to set request-time security headers.
 * CSP is configured in svelte.config.js so SvelteKit can manage nonces/hashes.
 * @type {import('@sveltejs/kit').Handle}
 */
export async function handle({ event, resolve }) {
  // Probely scanner detection is diagnostic only. Audit mode may use this log
  // to confirm scanner traffic without changing the request handling path.
  /** @type {string} */
  const userAgent = event.request.headers.get('user-agent') || '';

  /** @type {string} */
  const remoteIp =
    event.request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '';

  const isProbely = isProbelyScanner({ ua: userAgent, ip: remoteIp });

  const response = await resolve(event);
  const env = detectEnvironment(event.url.hostname);
  const { isAudit, isProd, isTest, mode } = env;

  if (isAudit && isProbely) {
    console.info('[Audit Mode] Probely scanner detected:', {
      ip: remoteIp,
      ua: userAgent,
    });
  }

  if (event.url.hostname.endsWith('audit.netwk.pro') && mode !== 'audit') {
    console.warn(
      `[CSP] Audit hostname requested with PUBLIC_ENV_MODE=${mode}; ` +
        'SvelteKit CSP is selected at build time from PUBLIC_ENV_MODE.',
    );
  }

  if (isProd && !isTest && !isAudit) {
    response.headers.set(
      'Report-To',
      JSON.stringify({
        group: 'csp-endpoint',
        max_age: 10886400, // 18 weeks
        endpoints: [{ url: cspReportUri }],
        include_subdomains: true,
      }),
    );
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
      'max-age=31536000; includeSubDomains',
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
