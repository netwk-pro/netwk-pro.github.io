<!-- ==========================================================================
src/lib/components/layout/HeaderDefault.svelte

SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== -->

<script>
  import { base } from "$app/paths";

  // Log the base path to verify its value
  console.log("Base path:", base);

  const homeLink = base || "/";
  const aboutLink = `${base}/about`;
  const blogLink = "https://blog.netwk.pro";

  /**
   * Navigation link object.
   * @typedef {Object} NavItem
   * @property {string} label - The text displayed for the link.
   * @property {string} href - The URL or anchor the link points to.
   * @property {string} target - Specifies where to open the link (e.g., "_self" or "_blank").
   * @property {boolean} external - Whether the link points to an external resource.
   */

  /**
   * Array of navigation links.
   * @type {NavItem[]}
   */
  const nav = [
    { label: "home", href: homeLink, target: "_self", external: false },
    { label: "about", href: aboutLink, target: "_self", external: false },
    {
      label: "blog",
      href: blogLink,
      target: "_self",
      external: false,
    },
    {
      label: "discussions",
      href: "https://github.com/netwk-pro/netwk-pro.github.io/discussions",
      target: "_blank",
      external: true,
    },
    {
      label: "link hub",
      href: "https://linktr.ee/neteng_pro",
      target: "_blank",
      external: true,
    },
  ];

  /**
   * Relation attribute for external links.
   * @type {string}
   */
  const rel = "noopener noreferrer";
</script>

<!-- BEGIN DEFAULT HEADER -->
<nav class="center-nav">
  {#each nav as { label, href, target, external }, index}
    <a {href} {target} rel={external ? rel : undefined}>
      {label}
    </a>
    {#if external}
      <sup>
        <span style="color: #ffc627;">
          <i class="fas fa-arrow-up-right-from-square fa-2xs"></i>
        </span>
      </sup>
    {/if}
    <!-- Separator logic -->
    {#if index < nav.length - 1}
      {#if label === "blog"}
        <br />
      {:else}
        <span class="separator">|</span>
      {/if}
    {/if}
  {/each}
</nav>
<!-- END DEFAULT HEADER -->
