/* ==========================================================================
src/lib/images.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * Image import utility
 *
 * @file images.js
 * @description Provides convenient access to images in the src/lib/img directory
 * @module src/lib
 * @author Scott Lopez
 * @updated 2025-10-20
 */

// Import favicon images
import faviconSvg from '$lib/img/favicon.svg';
import appleTouchIcon from '$lib/img/icon-180x180.png';

// Import logo image
import logoPng from '$lib/img/logo-web.png';
import logoWbp from '$lib/img/logo-web.webp';

// Import badges
import ccBadge from '$lib/img/badges/cc-by-badge.png';
import gplBadge from '$lib/img/badges/gpl-badge.svg';

// Import general images
import bySvg from '$lib/img/by.svg';
import ccSvg from '$lib/img/cc.svg';
import obtainiumPng from '$lib/img/obtainium.png';
import obtainiumWbp from '$lib/img/obtainium.webp';
import protonPower from '$lib/img/powered-by-proton.svg';

// Import images for posts
import acodePng from '$lib/img/posts/acode.png';
import acodeWbp from '$lib/img/posts/acode.webp';
import cryptomPng from "$lib/img/posts/cryptomator.png";
import cryptomWbp from "$lib/img/posts/cryptomator.webp";
import eauthPng from '$lib/img/posts/eauth.png';
import eauthWbp from '$lib/img/posts/eauth.webp';
import hboardPng from '$lib/img/posts/hboard.png';
import hboardWbp from '$lib/img/posts/hboard.webp';
import lsheetPng from '$lib/img/posts/linksheet.png';
import lsheetWbp from '$lib/img/posts/linksheet.webp';
import otphelpPng from '$lib/img/posts/otp-helper.png';
import otphelpWbp from '$lib/img/posts/otp-helper.webp';
import pmxPng from '$lib/img/posts/pmx.png';
import pmxWbp from '$lib/img/posts/pmx.webp';
import squirclePng from '$lib/img/posts/squircle.png';
import squircleWbp from '$lib/img/posts/squircle.webp';
import tosPng from '$lib/img/posts/tosdr.png';
import tosWbp from '$lib/img/posts/tosdr.webp';
import urlPng from '$lib/img/posts/urlcheck.png';
import urlWbp from '$lib/img/posts/urlcheck.webp';

// ================================================================
// Dynamic QR code image imports
// ================================================================

// Dynamically import all QR code images in src/lib/img/qr
const qrModules = import.meta.glob('$lib/img/qr/*.{png,webp}', { eager: true });

/**
 * Aggregated QR code image lookup.
 * Example: QR_IMAGES['pgp-support'].png → blob URL
 * @typedef {'png' | 'webp'} QRExtension
 * @type {Record<string, { png?: string; webp?: string }>}
 */
export const QR_IMAGES = {};

// Populate QR_IMAGES
for (const [path, mod] of Object.entries(qrModules)) {
  // Ensure we’re dealing with an ES module with a default export
  const module = /** @type {{ default: string }} */ (mod);

  const file = path.split('/').pop();
  if (!file) continue; // file is possibly undefined

  const [name, ext] = file.split('.');
  if (!QR_IMAGES[name]) QR_IMAGES[name] = {};

  if (ext === 'png' || ext === 'webp') {
    QR_IMAGES[name][ext] = module.default;
  }
}

/**
 * Retrieve QR code image pair (png/webp) by name.
 * Safely returns an empty object if not found.
 *
 * @param {string} name - Base filename (e.g., "pgp-support" or "vcard")
 * @returns {{ png?: string; webp?: string }}
 */
export function getQR(name) {
  return QR_IMAGES[name] ?? {};
}

// Re-export all imports
export {
  acodePng,
  acodeWbp,
  appleTouchIcon,
  bySvg,
  ccBadge,
  ccSvg,
  cryptomPng,
  cryptomWbp,
  eauthPng,
  eauthWbp,
  faviconSvg,
  gplBadge,
  hboardPng,
  hboardWbp,
  logoPng,
  logoWbp,
  lsheetPng,
  lsheetWbp, obtainiumPng,
  obtainiumWbp, otphelpPng,
  otphelpWbp, pmxPng,
  pmxWbp,
  protonPower,
  squirclePng,
  squircleWbp,
  tosPng,
  tosWbp,
  urlPng,
  urlWbp
};

// cspell:ignore eauth hboard cryptom tosdr otphelp
