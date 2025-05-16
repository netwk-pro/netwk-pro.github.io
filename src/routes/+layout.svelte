<!-- ==========================================================================
src/routes/+layout.svelte

SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== -->

<script>
  import ContainerSection from "$lib/components/ContainerSection.svelte";
  import Footer from "$lib/components/layout/Footer.svelte";
  import HeaderDefault from "$lib/components/layout/HeaderDefault.svelte";
  import HeaderHome from "$lib/components/layout/HeaderHome.svelte";

  // Import logo images and favicons and format for preloading
  import { browser } from "$app/environment";
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
    fetch(faviconSvg).then((response) => response.text());

    // Preload Apple Touch icon
    const touchImg = new Image();
    touchImg.src = appleTouchIcon;
  }

  // Import global and FontAwesome styles and web fonts
  import "$lib/styles";

  export let data;

  // Pathname normalization takes place in +layout.js
</script>

<!-- Update the document's metadata dynamically -->
<svelte:head>
  <title>{data?.meta?.title || "Network Pro Strategies (Network Pro™)"}</title>
  <meta
    name="description"
    content={data?.meta?.description ||
      "Locking Down Networks, Unlocking Confidence™ | Security, Networking, Privacy — Network Pro™"} />

  <!-- Standard favicon and Apple Touch icon references -->
  <link rel="icon" href={faviconSvg} type="image/svg+xml" />
  <link rel="apple-touch-icon" href={appleTouchIcon} />

  <!-- Preload links for all four critical assets -->
  {#if browser}
    <link rel="preload" href={logoWbp} as="image" type="image/webp" />
    <link rel="preload" href={logoPng} as="image" type="image/png" />
    <link rel="preload" href={faviconSvg} as="image" type="image/svg+xml" />
    <link rel="preload" href={appleTouchIcon} as="image" type="image/png" />
  {/if}

  <!-- PWA-specific meta tags -->
  <meta name="mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta
    name="apple-mobile-web-app-status-bar-style"
    content="black-translucent" />
  <meta name="theme-color" content="#ffc627" />
</svelte:head>

<!-- BEGIN HEADER -->
<header id="header-nav">
  <ContainerSection>
    {#if data.pathname === "/"}
      <!-- Render the Home Header for the root route -->
      <HeaderHome />
    {:else}
      <!-- Render the Default Header for all other routes -->
      <HeaderDefault />
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
