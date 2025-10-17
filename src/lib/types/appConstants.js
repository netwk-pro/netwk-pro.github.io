/* ==========================================================================
src/lib/types/appConstants.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * @file appConstants.js
 * @description Type definitions for app constants in src/lib/index.js
 * @module src/lib/types
 * @author Scott Lopez
 * @updated 2025-06-03
 */

/**
 * @typedef {object} CompanyInfo
 * @property {string} NAME - Full company name
 * @property {string} APP_NAME - Application name
 * @property {string} YEAR - Current copyright year
 */

/**
 * @typedef {object} ContactInfo
 * @property {string} EMAIL - Primary contact email
 * @property {string} SECURE - Secure contact email
 * @property {string} PRIVACY - Privacy policy email
 * @property {string} PHONE - Support phone number
 */

/**
 * @typedef {object} PageTargets
 * @property {string} BLANK - Value for `target="_blank"`
 * @property {string} SELF - Value for `target="_self"`
 * @property {string} REL - Value for `rel="noopener noreferrer"`
 */

/**
 * @typedef {object} NavigationLabels
 * @property {string} BACKTOP
 * @property {string} HREFTOP
 */

/**
 * @typedef {object} Links
 * @property {string} HOME - Main website URL
 * @property {string} BLOG - External blog URL
 */

/**
 * @typedef {object} AppConstants
 * @property {CompanyInfo} COMPANY_INFO
 * @property {ContactInfo} CONTACT
 * @property {PageTargets} PAGE
 * @property {NavigationLabels} NAV
 * @property {Links} LINKS
 */

export {};
