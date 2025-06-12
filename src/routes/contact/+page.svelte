<!-- ==========================================================================
src/routes/contact/+page.svelte

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== -->

<script>
  import RedirectPage from '$lib/components/RedirectPage.svelte';
  import { appendUTM } from '$lib/utils/utm.js';
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  /** @type {string | null} */
  let target = null;

  /** @type {boolean} */
  let show = false;

  onMount(() => {
    if (!browser) return;

    target = appendUTM(
      'https://cloud.neteng.pro/index.php/apps/forms/s/nyWEq9fdE7kWAjqMtMySLqJc',
    );
    show = true;
  });
</script>

{#if show && target}
  <RedirectPage to={target} />
{:else}
  <p style="text-align: center; margin-top: 4rem;">Preparing to redirect…</p>
{/if}
