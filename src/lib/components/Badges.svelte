<!-- ==========================================================================
src/lib/components/Badges.svelte

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== -->

<script>
  import { base } from "$app/paths";
  // Import badges for licenses
  import { ccBadge, gplBadge } from "$lib";

  // Log the base path to verify its value
  //console.log("Base path:", base);

  const ccbyLink = `${base}/license#cc-by`;
  const gplLink = `${base}/license#gnu-gpl`;

  /**
   * Badge link object.
   * @typedef {Object} Badge
   * @property {string} href - The URL the badge links to.
   * @property {string} src - The source URL of the badge image.
   * @property {string} alt - The alt text for the badge image.
   * @property {string} [class] - The CSS class for styling the badge (optional).
   * @property {string} width - The width of the badge (CSS value).
   * @property {string} height - The height of the badge (CSS value).
   */

  /**
   * Array of badges with their properties.
   * @type {Badge[]}
   */
  const badges = [
    {
      href: ccbyLink,
      src: ccBadge,
      alt: "Creative Commons BY",
      width: "160px",
      height: "24px",
    },
    {
      href: gplLink,
      src: gplBadge,
      alt: "GPL 3.0 or Later",
      width: "120px",
      height: "24px",
    },
  ];
</script>

<!-- BEGIN BADGES -->
<!-- Updated 2025-05-15 02:12:35 by SunDevil311 -->
<div class="bnav2-wrap">
  <table class="bnav2">
    <tbody>
      <tr>
        {#each badges as badge}
          <td class="bnav2-nav">
            <a href={badge.href} target="_self">
              <img
                decoding="async"
                loading="lazy"
                src={badge.src}
                alt={badge.alt}
                style="width: {badge.width}; height: {badge.height};" />
            </a>
          </td>
        {/each}
      </tr>
    </tbody>
  </table>
</div>
<!-- END BADGES -->
