<script>
  export let data;

  import { meta, defaultMeta } from "$lib/meta.js"; // Import meta data
  import MetaTags from "$lib/components/MetaTags.svelte"; // Import MetaTags component
  import ContainerSection from "$lib/components/ContainerSection.svelte";
  import Footer from "$lib/components/layout/Footer.svelte";
  import HeaderDefault from "$lib/components/layout/HeaderDefault.svelte";
  import HeaderHome from "$lib/components/layout/HeaderHome.svelte";
  import PWAInstallButton from "$lib/components/PWAInstallButton.svelte";
  import { onMount } from "svelte";
  import { registerServiceWorker } from "$lib/registerServiceWorker.js";
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

    // Preload Apple Touch icon
    const touchImg = new Image();
    touchImg.src = appleTouchIcon;

    // Register the service worker only in the browser
    onMount(() => {
      console.log("[APP] onMount triggered in +layout.svelte");
      registerServiceWorker();
    });
  }

  // Get meta information based on the pathname
  const currentMeta = meta[data?.pathname] || defaultMeta; // Fallback to default if no match

  const metaTitle = currentMeta.title;
  const metaDescription = currentMeta.description;
</script>

<svelte:head>
  <!-- Use MetaTags.svelte to set the title, description, and OpenGraph / Twitter meta tags -->
  <MetaTags title={metaTitle} description={metaDescription} />

  <!-- Preloading assets -->
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
