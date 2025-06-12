<!-- ==========================================================================
src/lib/components/FullWidthSection.svelte

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== -->

<script>
  /**
   * Optional: Allows vertical centering of the section
   * @type {boolean}
   */
  export let centered = false;

  /**
   * Additional classes for the outer full-width wrapper
   * @type {string}
   */
  export let outerClass = '';

  /**
   * Additional classes for the inner container
   * @type {string}
   */
  export let containerClass = '';
</script>

<div class={`full-width-section ${centered ? 'centered' : ''} ${outerClass}`}>
  <div class={`container ${containerClass}`}>
    <slot></slot>
  </div>
</div>

<style>
  .full-width-section.centered {
    display: flex;
    justify-content: center;
    flex-direction: column;
    min-height: 80vh;
  }
</style>
