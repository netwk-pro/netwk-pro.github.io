<!-- ==========================================================================
src/lib/components/Logo.svelte

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== -->

<script>
  // Import logo images
  import { logoPng, logoWbp } from '$lib';

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
   * CSS class for the logo image.
   * @type {string}
   */
  export let className = 'logo';

  /**
   * Alt text for the logo image.
   * @type {string}
   */
  export let alt = 'Network Pro Strategies';

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
   * Width of the logo in pixels.
   * @type {number}
   */
  export let width = 250;

  /**
   * Height of the logo in pixels.
   * @type {number}
   */
  export let height = 250;

  /**
   * Fetch priority for the logo image.
   * @type {"high" | "low" | "auto"}
   */
  export let fetchpriority = 'high';

  /**
   * Tagline text to display.
   * @type {string}
   */
  export let tagline = 'Security | Networking | Privacy';
</script>

<!-- BEGIN LOGO AND SITE TITLE -->
<picture>
  <source srcset={logoWbp} type="image/webp" />
  <img
    {decoding}
    {loading}
    class={className}
    src={logoPng}
    {alt}
    {fetchpriority}
    style="width: {width}px; height: {height}px" />
</picture>

{#if showSlogan}
  <div class="index-title1">
    {sloganA},<br />
    {sloganB}
  </div>
{/if}

<div class="spacer"></div>

{#if showTagline}
  <h2 class="index-title2">{tagline}</h2>
{/if}
<!-- END LOGO AND SITE TITLE -->
