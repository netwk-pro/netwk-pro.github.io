<!-- ==========================================================================
src/lib/components/MetaTags.svelte

Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== -->

<script>
  export let title;
  export let description;
  export let url = 'https://netwk.pro';
  export let image = `${url}/img/banner-og-1200x630.png`;
  export let pathname = '';

  import { CONSTANTS } from '$lib';

  //console.log(CONSTANTS.COMPANY_INFO.APP_NAME);

  const { COMPANY_INFO, LINKS } = CONSTANTS;

  // Default fallbacks (for missing or undefined props)
  const defaultTitle = 'Security, Networking, Privacy';
  const defaultDescription = 'Locking Down Networks, Unlocking Confidence™';

  // computed title/description with fallback
  $: metaTitle = title
    ? `${title}${title.includes(COMPANY_INFO.APP_NAME) ? '' : ` — ${COMPANY_INFO.APP_NAME}`}`
    : defaultTitle;

  $: metaDescription = description
    ? `${description}${description.includes(COMPANY_INFO.NAME) ? '' : ` | Security, Networking, Privacy — ${COMPANY_INFO.NAME}`}`
    : defaultDescription;

  // Compute canonical URL
  $: canonicalUrl = pathname
    ? `${url.replace(/\/$/, '')}${pathname.startsWith('/') ? pathname : `/${pathname}`}`
    : url;

  // Static shared values
  const twitterAct = '@NetEng_Pro';
</script>

<svelte:head>
  <title>{metaTitle}</title>
  <meta name="description" content={metaDescription} />

  <!-- OpenGraph -->
  <meta property="og:title" content={metaTitle} />
  <meta property="og:description" content={metaDescription} />
  <meta property="og:url" content={url} />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content={COMPANY_INFO.APP_NAME} />
  <meta property="og:image" content={image} />
  <meta property="og:image:alt" content={COMPANY_INFO.NAME} />
  <meta property="og:locale" content="en_US" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={metaTitle} />
  <meta name="twitter:description" content={metaDescription} />
  <meta name="twitter:site" content={twitterAct} />
  <meta name="twitter:creator" content={twitterAct} />
  <meta property="twitter:domain" content={url} />
  <meta property="twitter:url" content={url} />
  <meta name="twitter:image" content={image} />
  <meta name="twitter:image:alt" content={COMPANY_INFO.NAME} />

  <!-- Canonical URL -->
  <link rel="canonical" href={canonicalUrl} />

  <!-- Basic SEO -->
  <meta name="author" content="Scott Lopez" />
</svelte:head>
