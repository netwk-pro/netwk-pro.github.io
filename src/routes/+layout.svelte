<!-- ==========================================================================
src/routes/+layout.svelte

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
  import { browser } from "$app/environment";
  import "$lib/styles";

  // Import favicon images
  import logoPng from "$lib/img/logo-web.png";
  import logoWbp from "$lib/img/logo-web.webp";
  import faviconSvg from "$lib/img/favicon.svg";
  import appleTouchIcon from "$lib/img/icon-180x180.png";

  if (browser) {
    // Preload logo images
    [logoPng, logoWbp].forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    // Preload favicon SVG
    const touchImg = new Image();
    // Preload Apple Touch icon
    touchImg.src = appleTouchIcon;
  }

  /**
   * @type {string}
   * OpenGraph URL for the website.
   * Company name for the website.
   * Twitter account for the website.
   */
  const ogUrl = "https://netwk.pro";
  const companyName = "Network Pro Strategies";
  const twitterAct = "@NetEng_Pro";

  // fallback values if data.meta not set
  const metaTitle =
    data?.meta?.title || "Security, Networking, Privacy — Network Pro™";
  const metaDescription =
    data?.meta?.description ||
    "Locking Down Networks, Unlocking Confidence™ | Security, Networking, Privacy — Network Pro™";

  // Pathname normalization takes place in +layout.js
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
