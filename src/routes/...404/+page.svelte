<!-- ==========================================================================
src/routes/...404/+page.svelte

SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== -->

<script>
  /**
   * @type {string}
   * Style class for the h1 and p elements.
   */
  const centerText = "center-text";

  /** @type {{ pathname: string } | undefined} */
  export let url;

  // Use a fallback pathname if `url` is undefined
  const pathname = url?.pathname ?? "/";
</script>

<main>
  <h1 class={centerText}>404 - Page Not Found</h1>
  <p class={centerText}>The page "{pathname}" does not exist.</p>
</main>
