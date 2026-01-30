<!-- ==========================================================================
src/lib/components/layout/Footer.svelte

Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== -->

<script>
  import { base } from '$app/paths';
  import { bySvg, ccSvg } from '$lib';
  import { CONSTANTS } from '$lib';

  // Log the base path to verify its value
  //console.log("Base path:", base);

  const { COMPANY_INFO, CONTACT, PAGE, NAV } = CONSTANTS;

  // Dynamic links for licensing and trademark
  const ccbyLink = `${base}/legal#cc-by`;
  const gnugplLink = `${base}/legal#gnu-gpl`;
  const trademarkLink = `${base}/legal#trademark`;

  /** @type {string} */
  const creatorUrl = 'https://netwk.pro';

  /** @type {string} */
  const businessName = 'Network Pro Strategies, LLC';

  /** @type {string} */
  const creatorSlogan = 'Locking Down Networks...';

  /**
   * Icon used in a license object.
   * @typedef {Object} Icon
   * @property {string} src - The image source path or URL.
   * @property {string} alt - The alt text for the image.
   */

  /**
   * License details object.
   * @typedef {Object} License
   * @property {string} type - The type of the license (e.g., "CC BY 4.0").
   * @property {string} url - The internal URL for the license.
   * @property {string} [externalUrl] - The external URL for the license.
   * @property {string} [description] - A brief description of the license.
   * @property {Icon[]} [icons] - An array of icon objects for representing the license visually.
   */

  const licenses = [
    {
      type: 'CC BY 4.0',
      url: ccbyLink,
      externalUrl: 'https://creativecommons.org/licenses/by/4.0/',
      icons: [
        {
          src: ccSvg,
          alt: 'Creative Commons BY',
        },
        {
          src: bySvg,
          alt: 'Creative Commons BY',
        },
      ],
    },
    {
      type: 'GNU GPL',
      url: gnugplLink,
      externalUrl: 'https://fsf.org',
      description: 'Free Software Foundation',
    },
  ];

  /**
   * Namespace attributes for the container.
   * @type {Object}
   */
  const namespaceAttributes = {
    'xmlns:cc': 'http://creativecommons.org/ns#',
    'xmlns:dct': 'http://purl.org/dc/terms/',
  };

  /**
   * Relation attributes for license links.
   * @type {string}
   */
  const relLicense = 'license noopener noreferrer';
</script>

<!-- BEGIN FOOTER -->
<div class="copyright" {...namespaceAttributes}>
  <!-- Copyright Section -->
  <p>
    Copyright &copy; {COMPANY_INFO.YEAR}<br />
    <a
      rel="cc:attributionURL dct:creator"
      property="cc:attributionName"
      href={creatorUrl}
      target={PAGE.BLANK}>
      <strong>{businessName}</strong>
    </a>
    ({COMPANY_INFO.APP_NAME})
  </p>

  <!-- Trademark Section -->
  <p>
    {COMPANY_INFO.APP_NAME}, the shield logo, and the "{creatorSlogan}&trade;"
    slogan are
    <a href={trademarkLink} target={PAGE.SELF}>trademarks</a>
    of {businessName}.
  </p>

  <!-- Licensing Section -->
  <p>
    Licensed under
    {#each licenses as license, index}
      {#if license.type === 'CC BY 4.0'}
        <a href={license.url} target={PAGE.SELF} rel={relLicense}>
          <strong>{license.type}</strong>
        </a>
        {#if license.icons}
          {#each license.icons as icon}
            <a href={license.externalUrl} target={PAGE.BLANK} rel={relLicense}>
              <img
                class="cc-img"
                decoding="async"
                loading="lazy"
                src={icon.src}
                alt={icon.alt} />
            </a>
          {/each}
        {/if}
      {:else}
        <a href={license.url} target={PAGE.SELF} rel={relLicense}>
          <strong>{license.type}</strong>
        </a>, as published by the
        <a rel={PAGE.REL} href={license.externalUrl} target={PAGE.BLANK}
          >{license.description}</a
        >, either version 3 of the License or (at your option) any later
        version.
      {/if}
      {index < licenses.length - 1 ? ' and the ' : ''}
    {/each}
  </p>
</div>
<!-- END FOOTER -->

<!-- cspell:ignore ccby gnugpl -->
