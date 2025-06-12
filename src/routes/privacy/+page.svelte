<!-- ==========================================================================
src/routes/privacy/+page.svelte

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== -->

<script>
  import Badges from '$lib/components/Badges.svelte';
  import FullWidthSection from '$lib/components/FullWidthSection.svelte';
  import PrivacyContent from '$lib/pages/PrivacyContent.svelte';
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

<link rel="canonical" href="https://netwk.pro/privacy" />

<section id="privacy">
  <FullWidthSection containerClass="readable">
    <!-- BEGIN PRIVACY POLICY -->
    <section id="main-content">
      <PrivacyContent />
    </section>
    <!-- END PRIVACY POLICY -->

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
