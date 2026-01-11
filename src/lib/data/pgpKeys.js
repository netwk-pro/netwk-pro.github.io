/* ==========================================================================
src/lib/data/pgpKeys.js

Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * @file pgpKeys.js
 * @description Dedicated data module for PGP key definitions
 * @module src/lib/data
 * @author Scott Lopez
 * @updated 2025-10-20
 */

import { getQR } from '$lib';

/**
 * @typedef {{ png?: string; webp?: string }} QrImagePair
 *
 * @typedef {QrImagePair & {
 *   id: string;
 *   name: string;
 *   email: string;
 *   fingerprint: string;
 *   opgp: string;
 *   file: string;
 * }} PgpKeyEntry
 */

/**
 * Base definitions for PGP keys. Each `id` must match a QR code image name
 * (e.g. "pgp-support" → pgp-support.png / pgp-support.webp).
 *
 * @type {Array<{
 *   id: string;
 *   name: string;
 *   email: string;
 *   fingerprint: string;
 *   opgp: string;
 *   file: string;
 * }>}
 */
const BASE_PGP_KEYS = [
  {
    id: 'pgp-support',
    name: 'General Contact & Support',
    email: 'support (at) netwk.pro',
    fingerprint: '6590 B992 E2E3 EFF1 2738 7BCE 2AF0 93E9 DEC6 1BA0',
    opgp: 'https://keys.openpgp.org/search?q=support%40netwk.pro',
    file: '/pgp/support@netwk.pro.asc',
  },
  {
    id: 'pgp-contact',
    name: 'Secure Email',
    email: 'contact (at) s.neteng.pro',
    fingerprint: 'DF11 8BAA 6C2D 9DCD EBDC 2DDC F993 7349 9495 F957',
    opgp: 'https://keys.openpgp.org/search?q=contact%40s.neteng.pro',
    file: '/pgp/contact@s.neteng.pro.asc',
  },
  {
    id: 'pgp-security',
    name: 'Security Contact',
    email: 'security (at) s.neteng.pro',
    fingerprint: 'B7FE 1D4E 6CAB 3E71 4A9F DF6E 48CB 7290 C00D 0DA5',
    opgp: 'https://keys.openpgp.org/search?q=security%40s.neteng.pro',
    file: '/pgp/security@s.neteng.pro.asc',
  },
];

/**
 * Full list of enriched PGP keys, each with dynamically resolved QR images.
 *
 * @type {PgpKeyEntry[]}
 */
export const PGP_KEYS = BASE_PGP_KEYS.map((entry) => ({
  ...entry,
  ...getQR(entry.id),
}));

// cspell:ignore EBDC
