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

  // Check if the environment is for testing
  const isTestEnvironment =
    process.env.NODE_ENV === "test" || process.env.ENV_MODE === "ci";

  // Set the Content Security Policy header
  if (isTestEnvironment) {
    // Relaxed CSP for testing: Allow inline scripts and eval
    response.headers.set(
      "Content-Security-Policy",
      [
        "default-src 'self';",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' ws://localhost:*;", // Allow inline and eval scripts, and websockets for local testing
        "style-src 'self' 'unsafe-inline';", // Allow inline styles
        "img-src 'self' data:;", // Allow images from same origin and data URIs
        "connect-src 'self';", // Allow connections only to same origin
        "font-src 'self' data:;", // Allow fonts from same origin and data URIs
        "form-action 'self';", // Allow forms to post to same origin
        "base-uri 'self';", // Restrict base URIs to same origin
        "object-src 'none';", // Block all object sources
        "frame-ancestors 'none';", // Prevent framing of the site
        "upgrade-insecure-requests;", // Automatically upgrade HTTP to HTTPS
        "report-uri /api/mock-csp;", // Mock CSP reports for testing
      ].join(" "),
    );
  } else {
    // Production or development environment: use a more restrictive CSP
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
  }

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

  if (process.env.ENV_MODE !== "test" && process.env.ENV_MODE !== "ci") {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=2592000; includeSubDomains;", // Use max-age of 30 days
    );
  }

  return response;
}

// cspell:ignore licdn
