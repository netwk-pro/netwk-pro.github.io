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
  } from '$lib/components';
  import { HomeContent } from '$lib/pages';
</script>

<section id="home-page" data-testid="home-page">
  <FullWidthSection>
    <!-- BEGIN TITLE -->
    <section id="page-title">
      <Logo />
    </section>
    <!-- END TITLE -->

    <div class="spacer"></div>

    <hr class="hr-styled" />

    <div class="spacer"></div>

    <!-- BEGIN MAIN CONTENT -->
    <section id="main-content">
      <HomeContent />
    </section>
    <!-- END MAIN CONTENT -->

    <div class="spacer"></div>

    <!-- BEGIN SOCIAL MEDIA -->
    <section id="social-media">
      <SocialMedia />
    </section>
    <!-- END SOCIAL MEDIA -->

    <hr class="hr-styled" />

    <div class="spacer"></div>

    <!-- BEGIN LEGAL -->
    <section id="legal-nav">
      <LegalNav />
    </section>
    <!-- END LEGAL -->

    <div class="spacer"></div>

    <!-- BEGIN BADGES -->
    <section id="badges">
      <Badges />
    </section>
    <!-- END BADGES -->
  </FullWidthSection>
</section>
