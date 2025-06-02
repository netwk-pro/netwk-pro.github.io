<!-- ==========================================================================
src/lib/components/layout/Footer.svelte

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== -->

<!-- cspell:ignore ccby gnugpl -->

<script>
  import { base } from "$app/paths";
  // Import icons for licenses
  import { bySvg, ccSvg } from "$lib";

  // Log the base path to verify its value
  //console.log("Base path:", base);

  console.log(__COMPANY__); // "Network Pro Strategies"
  console.log(__APP_NAME__); // "Network Pro"
  console.log(__COPYRIGHT_YEAR__); // "2025"

  // Dynamic links for licensing and trademark
  const ccbyLink = `${base}/license#cc-by`;
  const gnugplLink = `${base}/license#gnu-gpl`;
  const trademarkLink = `${base}/license#trademark`;

  /**
   * Creator details object.
   * @typedef {Object} Creator
   * @property {string} name - The name of the creator.
   * @property {string} url - The URL of the creator's website.
   * @property {string} trademark - The trademark name of the creator.
   * @property {string} slogan - The slogan of the creator.
   */

  /**
   * Icon details object.
   * @typedef {Object} Icon
   * @property {string} src - The source URL of the icon image.
   * @property {string} alt - The alt text for the icon image.
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

  /**
   * @type {Creator}
   */
  const creator = {
    url: "https://netwk.pro",
    slogan: "Locking Down Networks™",
  };

  /**
   * @type {License[]}
   */
  const licenses = [
    {
      type: "CC BY 4.0",
      url: ccbyLink,
      externalUrl: "https://creativecommons.org/licenses/by/4.0/",
      icons: [
        {
          src: ccSvg,
          alt: "Creative Commons BY",
        },
        {
          src: bySvg,
          alt: "Creative Commons BY",
        },
      ],
    },
    {
      type: "GNU GPL",
      url: gnugplLink,
      externalUrl: "https://fsf.org",
      description: "Free Software Foundation",
    },
  ];

  /**
   * Namespace attributes for the container.
   * @type {Object}
   */
  const namespaceAttributes = {
    "xmlns:cc": "http://creativecommons.org/ns#",
    "xmlns:dct": "http://purl.org/dc/terms/",
  };

  /**
   * Relation attributes for external links.
   * @type {string}
   */
  const rel = "noopener noreferrer";

  /**
   * Relation attributes for license links.
   * @type {string}
   */
  const relLicense = "license noopener noreferrer";

  /**
   * Target attribute for opening links in the same tab.
   * @type {string}
   */
  const targetSelf = "_self";

  /**
   * Target attribute for opening links in a new tab.
   * @type {string}
   */
  const targetBlank = "_blank";
</script>

<!-- BEGIN FOOTER -->
<div class="copyright" {...namespaceAttributes}>
  <!-- Copyright Section -->
  <p>
    Copyright &copy; {__COPYRIGHT_YEAR__}<br />
    <a
      rel="cc:attributionURL dct:creator"
      property="cc:attributionName"
      href={creator.url}
      target={targetBlank}>
      <strong>{__COMPANY__}</strong>
    </a>
    ({__APP_NAME__}&trade;)
  </p>

  <!-- Trademark Section -->
  <p>
    {__APP_NAME__}&trade;, the shield logo, and the "{creator.slogan}" slogan
    are
    <a href={trademarkLink} target={targetSelf}>trademarks</a>
    of {creator.name}.
  </p>

  <!-- Licensing Section -->
  <p>
    Licensed under
    {#each licenses as license, index}
      {#if license.type === "CC BY 4.0"}
        <a
          href={license.url}
          target={targetSelf}
          rel={relLicense}
          style="display: inline-block">
          <strong>{license.type}</strong>
        </a>
        {#if license.icons}
          {#each license.icons as icon}
            <a
              href={license.externalUrl}
              target={targetBlank}
              rel={relLicense}
              style="display: inline-block">
              <img
                decoding="async"
                loading="lazy"
                src={icon.src}
                alt={icon.alt}
                style="
                  width: 18px !important;
                  height: 18px !important;
                  margin-left: 3px;
                  text-decoration: none;
                  vertical-align: text-bottom;
                " />
            </a>
          {/each}
        {/if}
      {:else}
        <a href={license.url} target={targetSelf} rel={relLicense}>
          <strong>{license.type}</strong>
        </a>
        , as published by the
        <a {rel} href={license.externalUrl} target={targetBlank}
          >{license.description}</a
        >, either version 3 of the License, or (at your option) any later
        version.
      {/if}
      {index < licenses.length - 1 ? ", and the " : ""}
    {/each}
  </p>
</div>
<!-- END FOOTER -->
