<!-- ==========================================================================
src/lib/components/MetaTags.svelte

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== -->

<script>
  export let title;
  export let description;

  import { CONSTANTS } from '$lib';

  //console.log(CONSTANTS.COMPANY_INFO.APP_NAME);

  const { COMPANY_INFO, LINKS } = CONSTANTS;

  // Static shared values
  const ogUrl = LINKS.HOME;
  const ogImg = '/img/banner-og-1200x630.png';
  const companyName = COMPANY_INFO.NAME;
  const twitterAct = '@NetEng_Pro';
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />

  <!-- OpenGraph -->
  <meta property="og:title" content={title} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={ogUrl} />
  <meta property="og:image" content={ogImg} />
  <meta property="og:image:alt" content={companyName} />
  <meta property="og:description" content={description} />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content={twitterAct} />
  <meta name="twitter:creator" content={twitterAct} />
  <meta property="twitter:domain" content={ogUrl} />
  <meta property="twitter:url" content={ogUrl} />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={ogImg} />
  <meta name="twitter:image:alt" content={companyName} />
</svelte:head>
