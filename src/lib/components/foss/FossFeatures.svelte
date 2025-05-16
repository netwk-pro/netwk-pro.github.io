<!-- ==========================================================================
src/lib/components/foss/FossFeatures.svelte

SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== -->

<script>
  /**
   * Array of feature strings that describe the FOSS item
   * @type {string[]}
   */
  export let features = [];
</script>

<!-- BEGIN FOSS FEATURES -->
{#if features && features.length > 0}
  <ul>
    {#each features as feature}
      <li>{feature}</li>
    {/each}
  </ul>
{/if}
<!-- END FOSS FEATURES -->
