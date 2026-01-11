<!-- ==========================================================================
src/lib/components/Badges.svelte

Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== -->

<script>
  import { base } from '$app/paths';
  // Import badges for licenses
  import { ccBadge, gplBadge } from '$lib';
  import { CONSTANTS } from '$lib';

  // Log the base path to verify its value
  //console.log("Base path:", base);

  //console.log(CONSTANTS.COMPANY_INFO.APP_NAME);

  const { PAGE } = CONSTANTS;

  const ccbyLink = `${base}/legal#cc-by`;
  const gplLink = `${base}/legal#gnu-gpl`;

  /**
   * Badge link object.
   * @typedef {Object} Badge
   * @property {string} href - The URL the badge links to.
   * @property {string} src - The source URL of the badge image.
   * @property {string} alt - The alt text for the badge image.
   * @property {string} [class] - The CSS class for styling the badge (optional).
   */

  /**
   * Array of badges with their properties.
   * @type {Badge[]}
   */
  const badges = [
    {
      href: ccbyLink,
      src: ccBadge,
      alt: 'Creative Commons BY',
      class: 'badge badge--cc',
    },
    {
      href: gplLink,
      src: gplBadge,
      alt: 'GPL 3.0 or Later',
      class: 'badge badge--gpl',
    },
  ];
</script>

<!-- BEGIN BADGES -->
<div class="bnav2-wrap">
  <table class="bnav2">
    <tbody>
      <tr>
        {#each badges as badge}
          <td class="bnav2-nav">
            <a href={badge.href} target={PAGE.SELF}>
              <img
                decoding="async"
                loading="lazy"
                src={badge.src}
                alt={badge.alt}
                class={badge.class} />
            </a>
          </td>
        {/each}
      </tr>
    </tbody>
  </table>
</div>
<!-- END BADGES -->
