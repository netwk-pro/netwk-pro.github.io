<!-- ==========================================================================
src/lib/components/RedirectPage.svelte

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== -->

<script>
  import { onMount } from 'svelte';
  import FullWidthSection from '$lib/components/FullWidthSection.svelte';

  export let to;
  export let delay = 3;

  onMount(() => {
    if (!to) {
      console.warn('⛔ No redirect target provided');
      return;
    }

    console.log('✅ Starting redirect to:', to);

    setTimeout(() => {
      window.location.href = to;
    }, delay * 1000);
  });
</script>

<svelte:head>
  <title>Redirecting…</title>
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<!-- MAIN CONTENT -->

<FullWidthSection centered>
  <div class="redirect-content">
    <h1>Redirecting…</h1>
    <p>You'll be taken to the destination in just a moment.</p>
    <div class="loading-spinner" aria-hidden="true"></div>
    <p>If nothing happens, <a href={to}>click here</a>.</p>
  </div>
</FullWidthSection>

<!-- END MAIN CONTENT -->

<style>
  .redirect-content {
    text-align: center;
    font-family: system-ui, sans-serif;
    margin-top: 2rem; /* adjust as needed */
  }

  .loading-spinner {
    width: 48px;
    height: 48px;
    margin: 2rem auto;
    border: 4px solid #ddd;
    animation: spin 1s linear infinite;
    border-radius: 50%;
    border-top: 4px solid #ffc627;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>
