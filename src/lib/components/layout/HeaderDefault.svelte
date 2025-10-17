<!-- ==========================================================================
src/lib/components/layout/HeaderDefault.svelte

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== -->

<script>
  import { base } from '$app/paths';
  import { CONSTANTS } from '$lib';

  // Log the base path to verify its value
  //console.log("Base path:", base);

  //console.log(CONSTANTS.COMPANY_INFO.APP_NAME);

  const { PAGE } = CONSTANTS;

  const homeLink = base || '/';
  const aboutLink = `${base}/about`;
  const servLink = `${base}/services`;
  const lhubLink = `${base}/links`;
  const fossLink = `${base}/foss-spotlight`;
  const blogLink = 'https://blog.netwk.pro';
  const discussLink =
    'https://github.com/netwk-pro/netwk-pro.github.io/discussions';

  /**
   * Navigation link object.
   * @typedef {Object} NavItem
   * @property {string} label - The text displayed for the link.
   * @property {string} href - The URL or anchor the link points to.
   * @property {string} target - Specifies where to open the link (e.g., "_self" or "_blank").
   * @property {boolean} external - Whether the link points to an external resource.
   * @property {boolean} [redirect=false] - Indicates whether the external link is actually an internal redirect.
   */

  /**
   * Array of navigation links.
   * @type {NavItem[]}
   */
  const nav = [
    { label: 'home', href: homeLink, target: PAGE.SELF, external: false },
    { label: 'about', href: aboutLink, target: PAGE.SELF, external: false },
    { label: 'services', href: servLink, target: PAGE.SELF, external: false },
    {
      label: 'blog',
      href: blogLink,
      target: PAGE.SELF,
      external: false,
    },
    { label: 'foss', href: fossLink, target: PAGE.SELF, external: false },
    {
      label: 'discussions',
      href: discussLink,
      target: PAGE.BLANK,
      external: true,
      redirect: false,
    },
    {
      label: 'link hub',
      href: lhubLink,
      target: PAGE.BLANK,
      external: true,
      redirect: true,
    },
  ];

  /**
   * Relation attribute for external links.
   * @type {string}
   */
  const rel = 'noopener noreferrer';
</script>

<!-- BEGIN DEFAULT HEADER -->
<nav class="center-nav" aria-label="Site navigation">
  {#each nav as { label, href, target, external, redirect }, index}
    <a {href} {target} rel={!redirect && external ? rel : undefined}>
      {label}
    </a>
    {#if external}
      <sup>
        <span class="gold">
          <i class="fas fa-arrow-up-right-from-square fa-2xs"></i>
        </span>
      </sup>
    {/if}
    <!-- Separator logic -->
    {#if index < nav.length - 1}
      {#if label === 'blog'}
        <br />
      {:else}
        <span class="goldseparator">|</span>
      {/if}
    {/if}
  {/each}
</nav>
<!-- END DEFAULT HEADER -->

<!-- cspell:ignore lhub -->
