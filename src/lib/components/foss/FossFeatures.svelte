<!-- ==========================================================================
src/lib/components/foss/FossFeatures.svelte

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== -->

<script>
  /**
   * Array of feature objects that describe the FOSS item
   * @type {Array<{ emoji: string, label: string, description: string }>}
   */
  export let features = [];
</script>

<!-- BEGIN FOSS FEATURES -->
{#if features && features.length > 0}
  <ul>
    {#each features as feature, index}
      <li class="emoji">
        {#if index === 0}
          <span class="headline">
            {feature.emoji}
            <span class="label">{feature.label}</span>
            {#if feature.description && feature.description.trim()}
              <span class="description">&mdash; {feature.description}</span>
            {/if}
          </span>
        {:else}
          {feature.emoji}
          <span class="label">{feature.label}</span>
          {#if feature.description && feature.description.trim()}
            <span class="description">&mdash; {feature.description}</span>
          {/if}
        {/if}
      </li>
    {/each}
  </ul>
{/if}

<!-- END FOSS FEATURES -->

<style>
  ul {
    margin: 0;
    list-style-type: none;
    padding-left: 0;
  }

  ul li {
    font-weight: 600;
    margin-bottom: 0.5em;
  }
</style>
