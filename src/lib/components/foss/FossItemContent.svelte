<!-- ==========================================================================
src/lib/components/foss/FossItemContent.svelte

Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== -->

<script>
  /* at-html is sanitized by DOMPurify */
  /* eslint-disable svelte/no-at-html-tags */

  import ObtainiumBlock from '$lib/components/foss/ObtainiumBlock.svelte';
  import FossFeatures from '$lib/components/foss/FossFeatures.svelte';

  import { onMount } from 'svelte';
  import { sanitizeHtml } from '$lib/utils/purify.js';
  import { obtainiumPng, obtainiumWbp } from '$lib';

  import { CONSTANTS } from '$lib';

  //console.log(CONSTANTS.COMPANY_INFO.APP_NAME);

  const { PAGE, NAV } = CONSTANTS;

  /** @type {"async"} */
  const decoding = 'async';

  /** @type {"lazy"} */
  const loading = 'lazy';

  /// <reference path="$lib/types/fossTypes.js" />

  /** @type {FossItem} */
  export let fossItem;

  /**
   * Flag indicating if this is the first FOSS item in the list.
   * Only the first item should use eager loading.
   * @type {boolean}
   */
  export let isFirst = false;

  let safeHeadlineDescription = '';
  let safeDetailsDescription = '';
  /** @type {string[]} */
  let safeNotes = [];

  // Sanitize everything on mount
  onMount(async () => {
    safeHeadlineDescription = await sanitizeHtml(fossItem.headlineDescription);
    safeDetailsDescription = await sanitizeHtml(fossItem.detailsDescription);
    safeNotes = await Promise.all((fossItem.notes ?? []).map(sanitizeHtml));
  });
</script>

<!-- BEGIN FOSS ITEMS -->
<section id={fossItem.id}>
  <div class="foss-wrap">
    <table class="foss">
      <tbody>
        <tr>
          <td class="foss-cell">
            <picture>
              <source srcset={fossItem.images.webp} type="image/webp" />
              <img
                decoding={isFirst ? 'sync' : decoding}
                loading={isFirst ? 'eager' : loading}
                fetchpriority={isFirst ? 'high' : 'auto'}
                src={fossItem.images.png}
                alt={fossItem.imgAlt}
                class="obtainium-icon" />
            </picture>
          </td>
          <td class="foss-cell">
            <h2>{fossItem.title}</h2>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3>{fossItem.headline}</h3>

  <!-- Sanitized input from DOMPurify -->
  <div class="headline-description">
    {@html safeHeadlineDescription}
  </div>

  <FossFeatures features={fossItem.features} />

  <!-- Sanitized input from DOMPurify -->
  <div class="details-description">
    {@html safeDetailsDescription}
  </div>

  {#each safeNotes as note}
    <blockquote class="bquote">
      <!-- Sanitized input from DOMPurify -->
      {@html note}
    </blockquote>
  {/each}

  &nbsp;

  <div class="obtainium">
    <!-- Special handling for LinkSheet's Obtainium link -->
    {#if fossItem.obtainium}
      <ObtainiumBlock obtainium={fossItem.obtainium} {isFirst} />
    {/if}

    <!-- Other links -->
    {#each fossItem.links as { label, href, imgAlt, downloadText, downloadHref }, i}
      <div class="linksheet-entry">
        {#if label && href}
          <strong>{label}:</strong>
          <a rel={PAGE.REL} {href} target={PAGE.BLANK}>{href}</a>
        {/if}
      </div>
    {/each}
  </div>

  <div class="spacer"></div>

  <span class="small-text"><a href={NAV.HREFTOP}>{NAV.BACKTOP}</a></span>
</section>
<!-- END FOSS ITEMS -->
