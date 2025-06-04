<!-- ==========================================================================
src/lib/components/LegalNav.svelte

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== -->

<script>
  import { base } from "$app/paths";
  import { CONSTANTS } from "$lib";

  // Log the base path to verify its value
  //console.log("Base path:", base);

  console.log(CONSTANTS.COMPANY_INFO.APP_NAME);

  const { PAGE } = CONSTANTS;

  const termsLink = `${base}/terms-of-use`;
  const privacyLink = `${base}/privacy`;
  const licenseLink = `${base}/license`;
  const pdashLink = `${base}/privacy-dashboard`;

  /**
   * Navigation link object.
   * @typedef {Object} NavLink
   * @property {string} href - The URL the link points to.
   * @property {string} text - The text displayed for the link.
   * @property {number} [colspan] - Optional property to specify column span for the table cell.
   */

  /**
   * Rows of navigation links, where each row is an array of NavLink objects.
   * @type {NavLink[][]}
   */
  const rows = [
    [
      {
        href: privacyLink,
        text: "Privacy Policy",
      },
      {
        href: pdashLink,
        text: "Privacy Dashboard",
      },
    ],
    [
      {
        href: termsLink,
        text: "Terms of Use",
      },
      {
        href: licenseLink,
        text: "Legal",
      },
    ],
  ];
</script>

<!-- BEGIN LEGAL NAVIGATION -->
<nav aria-label="Legal navigation">
  <div class="bnav-wrap">
    <table class="bnav">
      <tbody>
        {#each rows as row}
          <tr>
            {#each row as link}
              <td class="bnav-cell" colspan={link.colspan || 1}>
                <a href={link.href} target={PAGE.SELF}>
                  {link.text}
                </a>
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</nav>
<!-- END LEGAL NAVIGATION -->

<!-- cspell:ignore pdash bnav -->
