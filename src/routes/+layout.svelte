<script>
  export let data;

  import ContainerSection from "$lib/components/ContainerSection.svelte";
  import Footer from "$lib/components/layout/Footer.svelte";
  import HeaderDefault from "$lib/components/layout/HeaderDefault.svelte";
  import HeaderHome from "$lib/components/layout/HeaderHome.svelte";
  import { browser } from "$app/environment";
  // TODO: Testing in progress
  import { registerServiceWorker } from "$lib/registerServiceWorker.js";
  import "$lib/styles";

  // Import favicon images
  import logoPng from "$lib/img/logo-web.png";
  import logoWbp from "$lib/img/logo-web.webp";
  import faviconSvg from "$lib/img/favicon.svg";
  import appleTouchIcon from "$lib/img/icon-180x180.png";

  const webApp = "mobile-web-app-capable";
  const ogUrl = "https://netwk.pro";
  const companyName = "Network Pro Strategies";
  const twitterAct = "@NetEng_Pro";

  if (browser) {
    [logoPng, logoWbp].forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    const touchImg = new Image();
    touchImg.src = appleTouchIcon;

    // TODO: Testing in progress
    registerServiceWorker();
  }

  // fallback values if data.meta not set
  const metaTitle =
    data?.meta?.title || "Security, Networking, Privacy — Network Pro™";
  const metaDescription =
    data?.meta?.description ||
    "Locking Down Networks, Unlocking Confidence™ | Security, Networking, Privacy — Network Pro™";
</script>

<svelte:head>
  <!-- Static only, dynamic content moved to src/lib/MetaTags.svelte -->
  <link rel="preload" href={logoWbp} as="image" type="image/webp" />
  <link rel="preload" href={logoPng} as="image" type="image/png" />
  <link rel="preload" href={faviconSvg} as="image" type="image/svg+xml" />
  <link rel="preload" href={appleTouchIcon} as="image" type="image/png" />

  <link rel="icon" href={faviconSvg} type="image/svg+xml" />
  <link rel="apple-touch-icon" href={appleTouchIcon} />

  <!-- PWA -->
  <link rel="manifest" href="/manifest.json" />
  <meta name={webApp} content="yes" />
  <meta name={"apple-" + webApp} content="yes" />
  <meta
    name="apple-mobile-web-app-status-bar-style"
    content="black-translucent" />
  <meta name="theme-color" content="#ffc627" />

  <meta
    name="facebook-domain-verification"
    content="bx4ham0zkpvzztzu213bhpt76m9siq" />
</svelte:head>

<header id="header-nav">
  <ContainerSection>
    {#if data.pathname === "/"}
      <HeaderHome />
    {:else}
      <HeaderDefault />
    {/if}
  </ContainerSection>
</header>

<main>
  <slot />
</main>

<footer id="licensing">
  <ContainerSection>
    <Footer />
  </ContainerSection>
</footer>
