<!-- ==========================================================================
src/lib/components/SocialMedia.svelte

Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== -->

<script>
  /**
   * Social media link object.
   * @typedef {Object} SocialLink
   * @property {string} href - The URL of the social media profile.
   * @property {string} label - The name of the social media platform (used for accessibility).
   * @property {string} iconClass - The CSS class for the font-awesome icon.
   * @property {string} [rel="noopener noreferrer"] - The `rel` attribute for the link (optional, defaults to "noopener noreferrer").
   */

  /**
   * Array of social media links.
   * @type {SocialLink[]}
   */
  const socialLinks = [
    {
      href: 'https://instagram.com/netwk_pro',
      label: 'Instagram',
      iconClass: 'fab fa-square-instagram fa-2x',
    },
    {
      href: 'https://facebook.com/neteng.pro',
      label: 'Facebook',
      iconClass: 'fab fa-square-facebook fa-2x',
    },
    {
      href: 'https://linkedin.com/company/netwk-pro',
      label: 'LinkedIn',
      iconClass: 'fab fa-linkedin fa-2x',
    },
    {
      href: 'https://noc.social/@NetEng_Pro',
      label: 'Mastodon',
      rel: 'me noopener noreferrer', // Special rel attribute for Mastodon
      iconClass: 'fab fa-mastodon fa-2x',
    },
    {
      href: 'https://github.com/netwk-pro/',
      label: 'GitHub',
      iconClass: 'fab fa-square-github fa-2x',
    },
  ];
</script>

<!-- BEGIN SOCIAL MEDIA -->
<div class="soc-wrap">
  <table class="soc">
    <tbody>
      <tr>
        {#each socialLinks as { href, label, rel = "noopener noreferrer", iconClass }}
          <td class="soc-fa">
            <p>
              <a {rel} {href} target="_blank" aria-label={label}>
                <span class={iconClass}></span>
              </a>
            </p>
          </td>
        {/each}
      </tr>
    </tbody>
  </table>
</div>
<!-- END SOCIAL MEDIA -->
