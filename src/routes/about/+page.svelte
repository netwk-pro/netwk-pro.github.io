<!-- ==========================================================================
src/routes/about/+page.svelte

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== -->

<script>
  import AboutContent from "$lib/pages/AboutContent.svelte";
  import Badges from "$lib/components/Badges.svelte";
  import FullWidthSection from "$lib/components/FullWidthSection.svelte";
  import LegalNav from "$lib/components/LegalNav.svelte";
  import SocialMedia from "$lib/components/SocialMedia.svelte";
  import MetaTags from "$lib/components/MetaTags.svelte";

  /**
   * @type {string}
   * Style class for the div element.
   */
  const spaceStyle = "spacer";

  export let data;
</script>

<MetaTags title={data.meta.title} description={data.meta.description} />

<link rel="canonical" href="https://netwk.pro/about" />

<section id="about">
  <FullWidthSection>
    <!-- BEGIN MAIN CONTENT -->
    <section id="main-content">
      <AboutContent />
    </section>
    <!-- END MAIN CONTENT -->

    <div class={spaceStyle}></div>

    <!-- SOCIAL MEDIA -->
    <section id="social-media">
      <SocialMedia />
    </section>

    <hr />

    <div class={spaceStyle}></div>

    <!-- LEGAL NAVIGATION -->
    <section id="legal-nav">
      <LegalNav />
    </section>

    <div class={spaceStyle}></div>

    <!-- BADGES -->
    <section id="badges">
      <Badges />
    </section>
  </FullWidthSection>
</section>
