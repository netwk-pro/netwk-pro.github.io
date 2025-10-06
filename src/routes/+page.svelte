<!-- ==========================================================================
src/routes/+page.svelte

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== -->

<script>
  import {
    Badges,
    FullWidthSection,
    LegalNav,
    Logo,
    SocialMedia,
    MetaTags,
  } from '$lib/components';
  import { HomeContent } from '$lib/pages';

  /**
   * @type {string}
   * Style class for the horizontal rule element.
   */
  const hrStyle = 'hr-styled';

  /**
   * @type {string}
   * Style class for the div element.
   */
  const spaceStyle = 'spacer';

  export let data;
</script>

<MetaTags title={data.meta.title} description={data.meta.description} />

<link rel="canonical" href="https://netwk.pro" />

<section id="home-page" data-testid="home-page">
  <FullWidthSection>
    <!-- BEGIN TITLE -->
    <section id="page-title">
      <Logo />
    </section>
    <!-- END TITLE -->

    <div class={spaceStyle}></div>

    <hr class={hrStyle} />

    <div class={spaceStyle}></div>

    <!-- BEGIN MAIN CONTENT -->
    <section id="main-content">
      <HomeContent />
    </section>
    <!-- END MAIN CONTENT -->

    <div class={spaceStyle}></div>

    <!-- BEGIN SOCIAL MEDIA -->
    <section id="social-media">
      <SocialMedia />
    </section>
    <!-- END SOCIAL MEDIA -->

    <hr class={hrStyle} />

    <div class={spaceStyle}></div>

    <!-- BEGIN LEGAL -->
    <section id="legal-nav">
      <LegalNav />
    </section>
    <!-- END LEGAL -->

    <div class={spaceStyle}></div>

    <!-- BEGIN BADGES -->
    <section id="badges">
      <Badges />
    </section>
    <!-- END BADGES -->
  </FullWidthSection>
</section>
