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
      'Security, Networking, Privacy — Network Pro Strategies',
    description:
      'Locking Down Networks, Unlocking Confidence™ | Security, Networking, Privacy — Network Pro Strategies',
  },
  '/about': {
    title: 'About Us — Network Pro™',
    description: 'About Us | Security, Networking, Privacy — Network Pro Strategies',
  },
  '/privacy': {
    title: 'Privacy Policy — Network Pro™',
    description:
      'Privacy Policy | Security, Networking, Privacy — Network Pro Strategies',
  },
  '/terms-of-use': {
    title: 'Website Terms of Use — Network Pro™',
    description:
      'Website Terms of Use | Security, Networking, Privacy — Network Pro Strategies',
  },
  '/license': {
    title: 'Legal, Copyright, and Licensing — Network Pro™',
    description:
      'Legal, Copyright, and Licensing | Security, Networking, Privacy — Network Pro Strategies',
  },
  '/terms-conditions': {
    title: 'Consulting Terms and Conditions — Network Pro™',
    description:
      'Terms and Conditions | Security, Networking, Privacy — Network Pro Strategies',
  },
  '/foss-spotlight': {
    title: 'FOSS Spotlight — Network Pro™',
    description:
      'FOSS Spotlight | Security, Networking, Privacy — Network Pro Strategies',
  },
  '/privacy-dashboard': {
    title: 'Privacy Dashboard — Network Pro™',
    description:
      'Privacy Dashboard | Security, Networking, Privacy — Network Pro Strategies',
  },
  '/pgp': {
    title: 'Public PGP Keys — Network Pro™',
    description:
      'Public encryption keys for secure communication | Security, Networking, Privacy — Network Pro Strategies',
  },
  '/services': {
    title: "On-Site Services - Network Pro™",
    description:
      'On-Site Services | Security, Networking, Privacy — Network Pro Strategies'
  },
  // Excludes redirect-only routes like /contact, /consultation, /privacy-rights
};

/** @type {MetaData} */
const defaultMeta = {
  title: 'Loading... | Network Pro™',
  description:
    'Please wait while the content loads... | Security, Networking, Privacy — Network Pro™',
};

// Export values
export { defaultMeta, meta };
