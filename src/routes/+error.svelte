<!-- ==========================================================================
src/routes/+error.svelte

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== -->

<script>
  /**
   * @typedef {Object} Error
   * @property {string} [message] - The message explaining the error.
   */

  /**
   * The HTTP status code of the error (e.g., 404, 500).
   * @type {number}
   */
  export let status;

  /**
   * The error object, containing details about what went wrong.
   * @type {Error}
   */
  export let error;

  const centerText = "center-text";

  // Get the pathname from the URL if available
  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "/";
</script>

<main>
  <h1 class={centerText}
    >{status} - {status === 404 ? "Page Not Found" : "Error"}</h1>
  <p class={centerText}>
    {#if status === 404}
      The page "{pathname}" does not exist.
    {:else}
      {error?.message || "An error occurred"}
    {/if}
  </p>
</main>
