<!-- ==========================================================================
src/lib/components/Logo.svelte

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== -->

<script>
  import { CONSTANTS } from '$lib';
  // Import logo images
  import { logoPng, logoWbp } from '$lib';

  const { COMPANY_INFO } = CONSTANTS;

  /**
   * Decoding mode for the image.
   * @type {"sync" | "async" | "auto"}
   */
  export let decoding = 'sync';

  /**
   * Loading mode for the image.
   * @type {"eager" | "lazy"}
   */
  export let loading = 'eager';

  /**
   * Optional extra CSS classes for the logo image.
   * @type {string}
   */
  export let className = '';

  /**
   * Alt text for the logo image.
   * @type {string}
   */
  export let alt = COMPANY_INFO.NAME;

  /**
   * First part of the company slogan.
   * @type {string}
   */
  export let sloganA = 'Locking Down Networks';

  /**
   * Second part of the company slogan.
   * @type {string}
   */
  export let sloganB = 'Unlocking Confidence™';

  /**
   * Enable/disable display of the slogan.
   * @type {boolean}
   */
  export let showSlogan = true;

  /**
   * Enable/disable display of the tagline.
   * @type {boolean}
   */
  export let showTagline = true;

  /**
   * Fetch priority for the logo image.
   * @type {"high" | "low" | "auto"}
   */
  export let fetchpriority = 'high';
</script>

<!-- BEGIN LOGO AND SITE TITLE -->
<picture>
  <source srcset={logoWbp} type="image/webp" />
  <img
    {decoding}
    {loading}
    class={`logo${className ? ` ${className}` : ''}`}
    src={logoPng}
    {alt}
    {fetchpriority} />
</picture>

{#if showSlogan}
  <div class="index-title1">
    {sloganA},<br />
    {sloganB}
  </div>
{/if}

<div class="spacer"></div>

{#if showTagline}
  <h2 class="index-title2"
    >{['Security', 'Networking', 'Privacy'].join(' \u00A0 | \u00A0 ')}</h2>
{/if}
<!-- END LOGO AND SITE TITLE -->
