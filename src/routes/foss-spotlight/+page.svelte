<!-- ==========================================================================
src/lib/pages/FossSpotlightContent.svelte

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== -->

<script>
  import Badges from '$lib/components/Badges.svelte';
  import FullWidthSection from '$lib/components/FullWidthSection.svelte';
  import FossContent from '$lib/pages/FossContent.svelte';
  import LegalNav from '$lib/components/LegalNav.svelte';
  import SocialMedia from '$lib/components/SocialMedia.svelte';
  import MetaTags from '$lib/components/MetaTags.svelte';

  /**
   * @type {string}
   * Style class for the div element.
   */
  const spaceStyle = 'spacer';

  export let data;
</script>

<MetaTags title={data.meta.title} description={data.meta.description} />

<link rel="canonical" href="https://netwk.pro/foss-spotlight" />

<section id="license">
  <FullWidthSection>
    <!-- BEGIN FOSS SPOTLIGHT -->
    <section id="main-content">
      <FossContent />
    </section>
    <!-- END FOSS SPOTLIGHT -->

    <div class={spaceStyle}></div>

    <!-- BEGIN SOCIAL MEDIA -->
    <section id="social-media">
      <SocialMedia />
    </section>
    <!-- END SOCIAL MEDIA -->

    <hr />

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
  </FullWidthSection>
</section>
