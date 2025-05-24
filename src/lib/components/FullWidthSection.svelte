<!-- ==========================================================================
src/lib/components/FullWidthSection.svelte

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== -->

<script>
  export let centered = false; // this prop lets us control vertical centering
</script>

<div class="full-width-section {centered ? 'centered' : ''}">
  <div class="container">
    <slot></slot>
    <!-- Slot to allow child content -->
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
