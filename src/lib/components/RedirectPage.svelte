<!-- ==========================================================================
src/lib/components/RedirectPage.svelte

Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== -->

<script>
  import { onMount } from 'svelte';
  import { redirectWithBrowserAwareness } from '$lib/utils/redirect.js';
  import { FullWidthSection } from '$lib/components';

  export let to;
  export let rel = ''; // Accepts optional rel value
  export let delay = 3;

  onMount(() => {
    redirectWithBrowserAwareness(to, delay);
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
    <p
      >If nothing happens, <a href={to} rel={rel || undefined}>click here</a
      >.</p>
  </div>
</FullWidthSection>

<!-- END MAIN CONTENT -->
