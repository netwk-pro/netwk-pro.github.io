<!-- ==========================================================================
src/routes/+error.svelte

Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== -->

<script>
  /**
   * SvelteKit 3 passes the error to error pages as an `error` prop. It is an
   * `App.Error`, which always includes the HTTP `status` (e.g. 404, 500) and a
   * safe `message` that has already passed through the `handleError` hook.
   *
   * @type {{ error: App.Error }}
   */
  let { error } = $props();

  /**
   * The HTTP status code of the error (e.g., 404, 500).
   * @type {number}
   */
  const status = $derived(error.status);

  const centerText = 'center-text';

  // Get the pathname from the URL if available
  const pathname =
    typeof window !== 'undefined' ? window.location.pathname : '/';
</script>

<main>
  <h1 class={centerText}
    >{status} - {status === 404 ? 'Page Not Found' : 'Error'}</h1>
  <p class={centerText}>
    {#if status === 404}
      The page "{pathname}" does not exist.
    {:else}
      {error?.message || 'An error occurred'}
    {/if}
  </p>
</main>
