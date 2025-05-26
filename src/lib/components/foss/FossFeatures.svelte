<!-- ==========================================================================
src/lib/components/foss/FossFeatures.svelte

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== -->

<script>
  import { sanitizeHTML } from "$lib/utils/sanitize.js";

  /**
   * Array of HTML strings representing FOSS features.
   * @type {string[]}
   */
  export let features = [];

  // Sanitize each feature string
  const safeFeatures = features.map(sanitizeHTML);
</script>

<!-- BEGIN FOSS FEATURES -->
<ul class="feature-list">
  {#each features as feature}
    <li class:feature-intro={feature.isIntro}>
      <span class="emoji">{feature.emoji}</span>
      {#if feature.isIntro}
        {feature.label}
      {:else}
        <strong>{feature.label}</strong> - {feature.description}
      {/if}
    </li>
  {/each}
</ul>

<!-- END FOSS FEATURES -->

<style>
  ul.feature-list {
    margin: 0;
    list-style-type: none;
    padding-left: 0;
  }

  ul.feature-list li.feature-intro {
    font-weight: 600;
    margin-bottom: 0.5em;
  }

  .emoji {
    margin-right: 0.4em;
  }
</style>
