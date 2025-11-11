/* ==========================================================================
src/lib/security/probely.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * @file probely.js
 * @description Determines whether a request originates from the Probely
 * security scanner, based on its User-Agent string or known source IP address.
 * @module tests/security
 * @author Scott Lopez
 * @updated 2025-11-11
 */

/** @typedef {{ ua: string, ip: string }} ScannerInput */

/**
 * Check if a request is likely from Probely.
 * @param {ScannerInput} input
 * @returns {boolean} - True if the request matches Probely’s fingerprint.
 */
export function isProbelyScanner({ ua, ip }) {
  const PROBELY_UA_FRAGMENT = 'probelyspdr/';
  const PROBELY_IPS = [
    '18.235.241.170',
    '52.65.214.19',
    '13.237.213.25',
    '52.19.40.38',
    '44.205.45.120',
    '3.104.172.219',
    '13.211.189.220',
    '52.16.191.244',
  ];

  if (!ua && !ip) return false;

  const normalizedUA = ua?.toLowerCase() ?? '';
  const normalizedIP = ip?.trim() ?? '';

  return (
    normalizedUA.includes(PROBELY_UA_FRAGMENT) ||
    PROBELY_IPS.includes(normalizedIP)
  );
}
