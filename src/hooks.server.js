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

  const isTest = process.env.NODE_ENV === "test";
  const isProd = process.env.ENV_MODE === "prod";

  // ✅ DEBUG: Log environment context for validation in CI
  console.log("[hooks.server.js] NODE_ENV =", process.env.NODE_ENV);
  console.log("[hooks.server.js] ENV_MODE =", process.env.ENV_MODE);

  // Temporarily disable nonce injection; uncomment when re-enabling strict CSP
  // const response = await resolve(event, {
  //   transformPageChunk: ({ html }) => html.replace(/__cspNonce__/g, nonce),
  // });

  //TODO: Create a unit test when revisiting nonce enforcement

  const response = await resolve(event); // Fallback while nonces are off

  // Content Security Policy: Adjusted to support test-mode LinkedIn tracking pixels
  response.headers.set(
    "Content-Security-Policy",
    [
      "default-src 'self'",

      // Allow unsafe-inline only in test to prevent blocking hydration/playwright eval
      // ✅ No inline scripts in production — 'unsafe-inline' only enabled in test mode
      `script-src 'self' ${isTest ? "'unsafe-inline'" : ""} https://snap.licdn.com`,

      // img-src relaxed in test mode for LinkedIn pixel
      `img-src 'self' data: ${isTest ? "https://px.ads.linkedin.com" : ""}`,

      "connect-src 'self' https://px.ads.linkedin.com https://snap.licdn.com",
      "style-src 'self' 'unsafe-inline'",
      "font-src 'self' data:",
      "form-action 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests",

      // Use mock CSP handler locally and Netlify function in prod
      `report-uri ${
        isProd ? "/.netlify/functions/cspReport" : "/api/mock-csp"
      }`,
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
