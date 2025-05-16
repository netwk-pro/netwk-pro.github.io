<!-- ==========================================================================
src/lib/components/ContainerSection.svelte

SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== -->

<script>
  /**
   * Optional: Allows passing additional classes to the container.
   * @type {string}
   */
  export let className = "";
</script>

<div class={`container ${className}`}>
  <slot></slot>
  <!-- Slot to allow child content -->
</div>
