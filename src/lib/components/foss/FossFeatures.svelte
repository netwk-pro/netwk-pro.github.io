<!-- ==========================================================================
src/lib/components/foss/FossFeatures.svelte

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== -->

<script>
  import { fossData } from "$lib/data/fossData.js"; // Import fossData
  import { sanitizeHTML } from "$lib/utils/sanitize.js"; // Import sanitize function

  /**
   * Sanitize and prepare features for display
   */
  const safeFeatures = fossData.map((item) => ({
    ...item, // Spread all properties
    headlineDescription: sanitizeHTML(item.headlineDescription), // Sanitize HTML content
    features: item.features.map(sanitizeHTML), // Sanitize each feature description
  }));
</script>

<!-- BEGIN FOSS FEATURES -->
{#each safeFeatures as feature}
  <ul class="feature-list">
    <li class:feature-intro={feature.isIntro}>
      <span class="emoji">{feature.emoji}</span>
      {#if feature.isIntro}
        {feature.label}
      {:else}
        <strong>{feature.label}</strong> - {feature.description}
      {/if}
    </li>
  </ul>
{/each}

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
