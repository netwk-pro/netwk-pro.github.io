<!-- ==========================================================================
src/routes/+layout.svelte

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== -->

<script>
  export let data;

  import ContainerSection from "$lib/components/ContainerSection.svelte";
  import Footer from "$lib/components/layout/Footer.svelte";
  import HeaderDefault from "$lib/components/layout/HeaderDefault.svelte";
  import HeaderHome from "$lib/components/layout/HeaderHome.svelte";
  import PWAInstallButton from "$lib/components/PWAInstallButton.svelte";
  import { shouldTrackUser } from "$lib/utils/privacy.js";
  import { onMount } from "svelte";
  import { registerServiceWorker } from "$lib/registerServiceWorker.js";
  import { browser } from "$app/environment";
  import "$lib/styles/global.min.css";
  import "$lib/styles/fa-global.css";

  // Import favicon images
  import logoPng from "$lib/img/logo-web.png";
  import logoWbp from "$lib/img/logo-web.webp";
  import faviconSvg from "$lib/img/favicon.svg";
  import appleTouchIcon from "$lib/img/icon-180x180.png";

  // Declare PostHog as null initially
  /** @type {typeof import('$lib/components/PostHog.svelte').default | null} */
  let PostHog = null;

  if (browser) {
    // Preload core images
    [logoPng, logoWbp, appleTouchIcon].forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    // Run setup when component mounts (only in browser)
    onMount(() => {
      console.log("[APP] onMount triggered in +layout.svelte");
      registerServiceWorker();

      const isDev = import.meta.env.MODE === "development";

      console.log("ENV MODE =", import.meta.env.MODE); // Should be "development"
      console.log("isDev =", isDev);
      console.log("shouldTrackUser =", shouldTrackUser());

      if (isDev || shouldTrackUser()) {
        import("$lib/components/PostHog.svelte").then((module) => {
          PostHog = module.default;

          if (isDev) {
            console.log("[Dev] ✅ PostHog component loaded (tracking enabled)");
          }
        });
      } else {
        console.log(
          "[Privacy] ⛔ Skipping PostHog component due to DNT or GPC signal.",
        );
      }
    });
  }

  // fallback values if data.meta not set
  const metaTitle =
    data?.meta?.title || "Security, Networking, Privacy — Network Pro™";
  const metaDescription =
    data?.meta?.description ||
    "Locking Down Networks, Unlocking Confidence™ | Security, Networking, Privacy — Network Pro™";
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
    {#if data.pathname === "/"}
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

{#if PostHog}
  <PostHog /> <!-- Add PostHog component when it's loaded -->
{/if}

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
