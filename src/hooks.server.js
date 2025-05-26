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
  // Generate a random nonce for each request
  const nonce = crypto.randomUUID().replace(/-/g, ""); // Generate and clean the nonce

  // Store the nonce in event.locals so we can access it later
  event.locals.nonce = nonce;

  // Create the response
  const response = await resolve(event, {
    // Inject the nonce into the HTML
    transformPageChunk: ({ html }) => html.replace(/__cspNonce__/g, nonce), // Replace placeholder with actual nonce
  });

  // Set the Content Security Policy header allowing nonces
  response.headers.set(
    "Content-Security-Policy",
    [
      "default-src 'self';", // Allow resources from same origin
      "script-src 'self' 'unsafe-inline';", // Allow inline scripts
      "style-src 'self' 'unsafe-inline';", // Allow inline styles
      "img-src 'self' data:;", // Allow images from same origin and data URIs
      "connect-src 'self';", // Allow connections only to same origin
      "font-src 'self' data:;", // Allow fonts from same origin and data URIs
      "form-action 'self';", // Allow forms to post to same origin
      "base-uri 'self';", // Restrict base URIs to same origin
      "object-src 'none';", // Block all object sources
      "frame-ancestors 'none';", // Prevent framing of the site
      "upgrade-insecure-requests;", // Automatically upgrade HTTP to HTTPS
      `report-uri ${process.env.ENV_MODE === "prod" ? "/.netlify/functions/cspReport" : "/api/mock-csp"};`, // Add CSP report URI for violations
    ].join(" "),
  );

  // Set other security headers
  response.headers.set(
    "Permissions-Policy",
    [
      "fullscreen=(self)",
      "sync-xhr=()",
      "camera=()",
      "microphone=()",
      "geolocation=()",
      "clipboard-read=()",
      "clipboard-write=()",
      "payment=()",
      "usb=()",
      "hid=()",
      "gamepad=()",
      "serial=()",
      "publickey-credentials-get=()",
      "interest-cohort=()",
      "topics=()",
    ].join(", "),
  );

  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-Frame-Options", "DENY");

  return response;
}

// cspell:ignore licdn
