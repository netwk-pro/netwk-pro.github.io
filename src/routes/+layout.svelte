<!-- ==========================================================================
src/routes/+layout.svelte

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== -->

<script>
  export let data;

  import { onMount } from 'svelte';
  import { initAnalytics } from '$lib/utils/initAnalytics';
  import { showReminder } from '$lib/stores/posthog';
  import { ContainerSection, PWAInstallButton } from '$lib/components';
  import { Footer, HeaderDefault, HeaderHome } from '$lib/components/layout';
  import { appleTouchIcon, faviconSvg, logoPng, logoWbp } from '$lib';

  import '$lib/styles/global.min.css';
  import '$lib/styles/fa-global.css';

  $: shouldShowReminder = $showReminder;

  onMount(() => {
    const cleanup = initAnalytics();
    return cleanup;
  });

  // fallback values if data.meta not set
  const metaTitle =
    data?.meta?.title || 'Security, Networking, Privacy — Network Pro™';
  const metaDescription =
    data?.meta?.description ||
    'Locking Down Networks, Unlocking Confidence™ | Security, Networking, Privacy — Network Pro Strategies';
</script>

<svelte:head>
  <!-- Dynamic preloads only, meta moved to $lib/components/MetaTags.svelte -->
  <link rel="preload" href={logoWbp} as="image" type="image/webp" />
  <link rel="preload" href={logoPng} as="image" type="image/png" />
  <link rel="preload" href={faviconSvg} as="image" type="image/svg+xml" />
  <link rel="preload" href={appleTouchIcon} as="image" type="image/png" />

  <link rel="icon" href={faviconSvg} type="image/svg+xml" />
  <link rel="apple-touch-icon" href={appleTouchIcon} />

  <!-- Static moved to app.html 2025-05-21 -->
  <meta name="theme-color" content="#ffc627" />
</svelte:head>

<!-- BEGIN HEADER -->
<header id="header-nav">
  <ContainerSection>
    {#if data.pathname === '/'}
      <!-- Render the Home Header for the root route -->
      <HeaderHome />
      <PWAInstallButton />
    {:else}
      <!-- Render the Default Header for all other routes -->
      <HeaderDefault />
      <PWAInstallButton />
    {/if}
  </ContainerSection>
</header>
<!-- END HEADER -->

<main>
  <slot />
</main>

<!-- BEGIN FOOTER -->
<footer id="licensing">
  <ContainerSection>
    <Footer />
  </ContainerSection>
</footer>
<!-- END FOOTER -->
