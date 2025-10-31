/* ==========================================================================
src/lib/meta.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * @typedef {object} MetaData
 * @property {string} title - The title of the page
 * @property {string} description - The description of the page
 */

/**
 * @type {Record<string, MetaData>}
 */
const meta = {
  '/': {
    title:
      'Security, Networking, Privacy',
    description:
      'Locking Down Networks, Unlocking Confidence™',
  },
  '/about': {
    title: 'About Us',
    description: 'About Us',
  },
  '/privacy': {
    title: 'Privacy Policy',
    description:
      'Privacy Policy',
  },
  '/terms-of-use': {
    title: 'Website Terms of Use',
    description:
      'Website Terms of Use',
  },
  '/legal': {
    title: 'Legal, Copyright, and Licensing',
    description:
      'Legal, Copyright, and Licensing',
  },
  '/terms-conditions': {
    title: 'Consulting Terms and Conditions',
    description:
      'Terms and Conditions',
  },
  '/foss': {
    title: 'FOSS Spotlight',
    description:
      'FOSS Spotlight',
  },
  '/privacy-dashboard': {
    title: 'Privacy Dashboard',
    description:
      'Privacy Dashboard',
  },
  '/pgp': {
    title: 'Public PGP Keys',
    description:
      'Public encryption keys for secure communication',
  },
  '/services': {
    title: "On-Site Services",
    description:
      'On-Site Services'
  },
  // Excludes redirect-only routes like /contact, /consultation, /privacy-rights
};

/** @type {MetaData} */
const defaultMeta = {
  title: 'Loading...',
  description:
    'Please wait while the content loads...',
};

// Export values
export { defaultMeta, meta };
