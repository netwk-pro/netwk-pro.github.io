<!-- ==========================================================================
src/lib/components/layout/HeaderHome.svelte

Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== -->

<script>
  import { base } from '$app/paths';
  import { CONSTANTS } from '$lib';

  // Log the base path to verify its value
  //console.log("Base path:", base);

  //console.log(CONSTANTS.COMPANY_INFO.APP_NAME);

  const { PAGE, LINKS } = CONSTANTS;

  const aboutLink = `${base}/about`;
  const fossLink = `${base}/foss`;
  //const servLink = `${base}/services`;
  const lhubLink = `${base}/links`;
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
    { label: 'about', href: aboutLink, target: PAGE.SELF, external: false },
    {
      label: 'blog',
      href: LINKS.BLOG,
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

<!-- BEGIN HOME HEADER -->
<nav class="center-nav" aria-label="Homepage navigation">
  {#each nav as { label, href, target, external, redirect }, index}
    <a {href} {target} rel={!redirect && external ? rel : undefined}>
      {label}{#if external}
        <span class="gold external-icon">
          <i class="fas fa-arrow-up-right-from-square fa-2xs" aria-hidden="true"
          ></i>
        </span>
      {/if}
    </a>{#if index < nav.length - 1}{#if label === 'foss'}<br />{:else}<span
          class="gold-separator">|</span
        >{/if}{/if}
  {/each}
</nav>
<!-- END HOME HEADER -->

<!-- cspell:ignore lhub servLink -->
