/* ==========================================================================
src/lib/images.js

SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * Image import utility
 * Provides convenient access to images in the src/lib/img directory
 *
 * @module src/lib
 * @author SunDevil311
 * @updated 2025-05-15
 */

// Import favicon images
import faviconSvg from "$lib/img/favicon.svg";
import appleTouchIcon from "$lib/img/icon-180x180.png";

// Import logo image
import logoPng from "$lib/img/logo-web.png";
import logoWbp from "$lib/img/logo-web.webp";

// Import badges
import ccBadge from "$lib/img/badges/cc-by-badge.png";
import gplBadge from "$lib/img/badges/gpl-badge.svg";

// Import general images
import bySvg from "$lib/img/by.svg";
import ccSvg from "$lib/img/cc.svg";
import obtainiumPng from "$lib/img/obtainium.png";
import obtainiumWbp from "$lib/img/obtainium.webp";

// Import images for posts
import acodePng from "$lib/img/posts/acode.png";
import acodeWbp from "$lib/img/posts/acode.webp";
import lsheetPng from "$lib/img/posts/linksheet.png";
import lsheetWbp from "$lib/img/posts/linksheet.webp";
import pmxPng from "$lib/img/posts/pmx.png";
import pmxWbp from "$lib/img/posts/pmx.webp";
import tosPng from "$lib/img/posts/tosdr.png";
import tosWbp from "$lib/img/posts/tosdr.webp";
import urlPng from "$lib/img/posts/urlcheck.png";
import urlWbp from "$lib/img/posts/urlcheck.webp";

// Import QR code images
import pgpContact from "$lib/img/qr/pgp-contact.png";
import pgpSupport from "$lib/img/qr/pgp-support.png";
import vcfSrc from "$lib/img/qr/vcard.png";

// Re-export all imports
export {
  acodePng,
  acodeWbp,
  appleTouchIcon,
  bySvg,
  ccBadge,
  ccSvg,
  faviconSvg,
  gplBadge,
  logoPng,
  logoWbp,
  lsheetPng,
  lsheetWbp,
  obtainiumPng,
  obtainiumWbp,
  pgpContact,
  pgpSupport,
  pmxPng,
  pmxWbp,
  tosPng,
  tosWbp,
  urlPng,
  urlWbp,
  vcfSrc
};
