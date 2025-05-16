<!-- ==========================================================================
src/lib/components/LegalNav.svelte

SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== -->

<script>
  import { base } from "$app/paths";

  // Log the base path to verify its value
  //console.log("Base path:", base);

  const termsLink = `${base}/terms-of-use`;
  const privacyLink = `${base}/privacy-policy`;
  const licenseLink = `${base}/license`;

  /**
   * Navigation link object.
   * @typedef {Object} NavLink
   * @property {string} href - The URL the link points to.
   * @property {string} text - The text displayed for the link.
   * @property {string} target - Specifies where to open the link (e.g., "_self" or "_blank").
   * @property {number} [colspan] - Optional property to specify column span for the table cell.
   */

  /**
   * Rows of navigation links, where each row is an array of NavLink objects.
   * @type {NavLink[][]}
   */
  const rows = [
    [
      {
        href: termsLink,
        text: "Terms of Use",
        target: "_self",
      },
      {
        href: privacyLink,
        text: "Privacy Policy",
        target: "_self",
      },
    ],
    [
      {
        href: licenseLink,
        text: "Legal",
        target: "_self",
        colspan: 2,
      },
    ],
  ];
</script>

<!-- BEGIN LEGAL NAVIGATION -->
<div class="bnav-wrap">
  <table class="bnav">
    <tbody>
      {#each rows as row}
        <tr>
          {#each row as link}
            <td
              class={link.colspan ? "bnav-cell" : "bnav-nav"}
              colspan={link.colspan || 1}>
              <a href={link.href} target={link.target}>
                {link.text}
              </a>
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>
<!-- END LEGAL NAVIGATION -->
