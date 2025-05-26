<!-- ==========================================================================
src/lib/pages/FossContent.svelte

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== -->

<script>
  import { fossData } from "$lib/data/fossData.js";
  import FossItemContent from "$lib/components/foss/FossItemContent.svelte";

  /**
   * Process the FOSS data
   * @type {any[]}
   */
  const processedFossData = fossData.map((item) => {
    // Create a new object to avoid modifying the original
    const processedItem = { ...item };

    // Process the links to ensure all have required properties
    if (item.links) {
      processedItem.links = item.links.map((link) => {
        // Use a type assertion to tell TypeScript this is any object
        /** @type {any} */
        const typedLink = link;

        // Now create a new object with all default values
        return {
          label: typedLink.label || "Download",
          href: typedLink.href || "#",
          imgSrc: typedLink.imgSrc || "",
          imgAlt: typedLink.imgAlt || "",
          downloadText: typedLink.downloadText || "",
          downloadHref: typedLink.downloadHref || "",
        };
      });
    }

    return processedItem;
  });

  /**
   * Page information containing title and last updated date
   * @type {{title: string, lastUpdated: string}}
   */
  const pageInfo = {
    title: "FOSS Spotlight",
    lastUpdated: "May 26, 2025",
  };

  /** @type {any} */
  const constants = {
    classSmall: "small-text",
    rel: "noopener noreferrer",
    backTop: "Back to top",
    hrefTop: "#top",
    targetSelf: "_self",
    targetBlank: "_blank",
  };
</script>

<section id="top">
  <span class={constants.classSmall}>
    <a
      rel={constants.rel}
      href="https://spdx.dev/learn/handling-license-info"
      target={constants.targetBlank}>
      SPDX License Identifier
    </a>
    : &nbsp;<code>CC-BY-4.0 OR GPL-3.0-or-later</code>
  </span>
</section>

<section id="page-title">
  <h1>{pageInfo.title}</h1>
  <p>
    <strong
      >Highlights of Exceptional Free and Open Source Software (FOSS)</strong
    ><br />
    <strong>Last Updated:</strong>
    {pageInfo.lastUpdated}
  </p>
</section>

&nbsp;

<nav id="toc">
  <h2>Table of Contents</h2>
  <ul>
    {#each processedFossData as { id, title }}
      <li><a href={"#" + id}>{title}</a></li>
    {/each}
  </ul>
</nav>

<div class="spacer"></div>

<hr />

{#each processedFossData as fossItem, index (fossItem.id)}
  <FossItemContent {fossItem} isFirst={index === 0} />
  {#if index !== processedFossData.length - 1}
    <div class="spacer"></div>

    <hr class="hr-styled" />

    <div class="spacer"></div>
  {/if}
{/each}
