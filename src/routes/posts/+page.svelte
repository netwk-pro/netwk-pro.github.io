<!-- ==========================================================================
src/routes/posts/+page.svelte

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== -->

<script>
  import { RedirectPage } from '$lib/components';
  import { appendUTM } from '$lib/utils/utm.js';
  import { getUTMParams } from '$lib/utils/getUTMParams.js';
  import { trackingEnabled } from '$lib/stores/trackingPreferences';
  import posthog from 'posthog-js';
  import { get } from 'svelte/store';
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { CONSTANTS } from '$lib';

  //console.log(CONSTANTS.COMPANY_INFO.APP_NAME);

  const { PAGE } = CONSTANTS;

  /** @type {string | null} */
  let target = null;

  /** @type {boolean} */
  let show = false;

  onMount(() => {
    if (!browser) return;

    const url = appendUTM('https://pal.bio/netwk-pro');

    if (get(trackingEnabled)) {
      const utm = getUTMParams(url);
      posthog.capture('redirect_to_pallyy', {
        target_url: url,
        ...utm,
      });
    }

    target = url;
    show = true; // Immediately show RedirectPage
  });
</script>

<svelte:head>
  <a
    rel="me"
    href="https://noc.social/@neteng_pro"
    aria-label="Mastodon profile"></a>
</svelte:head>

{#if show && target}
  <RedirectPage to={target} rel={PAGE.REL} />
{:else}
  <p class="redirect-text">Preparing to redirect…</p>
{/if}
