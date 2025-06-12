/* ==========================================================================
src/lib/types/fossTypes.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * @file fossTypes.js
 * @description Type definitions for `fossItem` in
 * src/lib/components/foss/FossItemContent.svelte
 * @module src/lib/types
 * @author SunDevil311
 * @updated 2025-06-12
 */

/**
 * @typedef {object} FossLink
 * @property {string} [label]
 * @property {string} [href]
 * @property {string} [imgAlt]
 * @property {string} [downloadText]
 * @property {string} [downloadHref]
 */

/**
 * @typedef {object} FossObtainium
 * @property {string} href        // Link for Obtainium intent
 * @property {string} label       // Text for the manual config download link
 * @property {string} download    // Filename for the downloaded config
 */

/**
 * @typedef {object} FossItem
 * @property {string} id
 * @property {string} title
 * @property {{ webp: string, png: string }} images
 * @property {string} imgAlt
 * @property {string} headline
 * @property {string} headlineDescription
 * @property {string} detailsDescription
 * @property {Array<any>} features
 * @property {Array<string>} notes
 * @property {Array<FossLink>} links
 * @property {FossObtainium} [obtainium]
 */
