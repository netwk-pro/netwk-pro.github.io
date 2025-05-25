/* ==========================================================================
src/hooks.server.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * SvelteKit server hook to generate a per-request CSP nonce and inject it.
 * @type {import('@sveltejs/kit').Handle}
 */
export async function handle({ event, resolve }) {
  const nonce = crypto.randomUUID().replace(/-/g, "");
  event.locals.nonce = nonce;

  // Temporarily disable nonce injection; uncomment when re-enabling strict CSP
  // const response = await resolve(event, {
  //   transformPageChunk: ({ html }) => html.replace(/__cspNonce__/g, nonce),
  // });

  //TODO: Create a unit test while revisiting nonce enforcement

  const response = await resolve(event); // Fallback while nonces are off

  response.headers.set(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://snap.licdn.com",
      "img-src 'self' data: https://px.ads.linkedin.com",
      "connect-src 'self' https://px.ads.linkedin.com https://snap.licdn.com",
      "style-src 'self' 'unsafe-inline'",
      "font-src 'self' data:",
      "form-action 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests",
      "report-uri /.netlify/functions/cspReport",
    ].join("; "),
  );

  response.headers.set(
    "Permissions-Policy",
    [
      "fullscreen=(self)", // Allow fullscreen for PWA
      "sync-xhr=()", // Disallow synchronous XHR to improve performance and prevent UI blocking
      "camera=()", // Block camera access
      "microphone=()", // Block microphone access
      "geolocation=()", // Block geolocation
      "clipboard-read=()", // Block clipboard access
      "clipboard-write=()", // Block clipboard write
      "payment=()", // Block Payment Request API
      "usb=()", // Block USB device access
      "hid=()", // Block Human Interface Devices
      "gamepad=()", // Block gamepad input
      "serial=()", // Block serial device access
      "publickey-credentials-get=()", // Block WebAuthn unless explicitly required
      "interest-cohort=()", // Disable FLoC (Federated Learning of Cohorts)
      "topics=()", // Disable Topics API (FLoC v2)
    ].join(", "),
  );

  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-Frame-Options", "DENY");

  return response;
}
