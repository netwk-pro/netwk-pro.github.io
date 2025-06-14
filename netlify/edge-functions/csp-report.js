/* ==========================================================================
edge-functions/csp-report.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * @file csp-report.js
 * @description Netlify Edge Function to handle CSP violation reports.
 *
 * Accepts POST requests to /api/csp-report and logs relevant CSP reports.
 * Filters out common low-value reports (e.g., img-src) to reduce invocation
 * cost. Alerts on high-risk violations via ntfy topic.
 *
 * @module netlify/edge-functions
 * @author SunDevil311
 * @updated 2025-05-31
 */

/**
 * Netlify Edge Function entry point for CSP reporting.
 *
 * @param {Request} request - The incoming HTTP request object
 * @param {import('@netlify/edge-functions').Context} _context - The Netlify Edge Function context (unused)
 * @returns {Promise<Response>} HTTP Response with status 204 or 405
 */
export default async (request, _context) => {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const body = await request.json();
    const report = body['csp-report'];

    // Ignore if report is missing or malformed
    if (!report || typeof report !== 'object') {
      return new Response(null, { status: 204 });
    }

    const violated = report['violated-directive'] ?? '';
    const blockedUri = report['blocked-uri'] ?? '';

    /*
    // Filter: Skip img-src violations and empty URIs
      const ignored = [
        violated.startsWith('img-src'),
        blockedUri === '',
        blockedUri === 'about',
        blockedUri.startsWith('chrome-extension://'),
        blockedUri.startsWith('moz-extension://'),
      ].some(Boolean);

      if (ignored) {
        return new Response(null, { status: 204 });
      }
    */

    // Send alert for high-risk directives
    await sendToNtfy(violated, blockedUri, report);

    // Log useful violations
    console.log('[CSP-Edge] Violation:', {
      directive: violated,
      uri: blockedUri,
      referrer: report['referrer'],
      source: report['source-file'],
      line: report['line-number'],
    });
  } catch (err) {
    console.warn('[CSP-Edge] Failed to parse CSP report:', err.message);
  }

  return new Response(null, { status: 204 });
};

const recentViolations = new Map();
const VIOLATION_TTL_MS = 60_000;

/**
 * Sends a high-priority alert to your ntfy topic for high-risk CSP violations.
 * Applies rate-limiting to avoid sending duplicate alerts within 60 seconds.
 *
 * @param {string} violated - The violated CSP directive
 * @param {string} blockedUri - The URI that was blocked
 * @param {Record<string, any>} report - The full CSP report object
 */
async function sendToNtfy(violated, blockedUri, report) {
  const highRiskDirectives = [
    'script-src',
    'form-action',
    'frame-ancestors',
    'base-uri',
  ];

  const directiveKey = violated.split(' ')[0]; // strip fallback values or sources
  const isHighRisk = highRiskDirectives.includes(directiveKey);
  console.log(`[CSP-Edge] Checking directive: ${directiveKey}`);
  if (!isHighRisk) return;

  const key = `${violated}|${blockedUri}`;
  const now = Date.now();

  // Skip and log if violation was reported recently
  if (
    recentViolations.has(key) &&
    now - recentViolations.get(key) < VIOLATION_TTL_MS
  ) {
    console.log(`[CSP-Edge] Skipped duplicate alert for ${key}`);
    return;
  }

  // Record the current timestamp
  recentViolations.set(key, now);

  // Cleanup old entries (memory-safe for low volume)
  for (const [k, t] of recentViolations.entries()) {
    if (now - t > VIOLATION_TTL_MS) {
      recentViolations.delete(k);
    }
  }

  const topicUrl = 'https://ntfy.neteng.pro/csp-alerts';

  const message = [
    `🚨 CSP Violation Detected`,
    `Directive: ${violated}`,
    `Blocked URI: ${blockedUri}`,
    `Referrer: ${report.referrer || 'N/A'}`,
    `Source: ${report['source-file'] || 'N/A'}`,
    `Line: ${report['line-number'] || 'N/A'}`,
  ].join('\n');

  await fetch(topicUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
      'X-Title': 'High-Risk CSP Violation',
      'X-Priority': '5',
    },
    body: message,
  });
}

/**
 * Configuration block for the Edge Function.
 * This sets the endpoint route to /api/csp-report
 */
export const config = {
  path: '/api/csp-report',
};
