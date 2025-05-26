<!-- ==========================================================================
src/lib/components/PostHog.svelte

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== -->

<script>
  import posthog from "posthog-js";
  import { onMount } from "svelte";
  import { browser } from "$app/environment";

  // cspell:disable
  onMount(() => {
    if (browser) {
      posthog.init("phc_Qshfo6AXzh4pS7aPigfqyeo4qj1qlyh7gDuHDeVMSR0", {
        api_host: "https://us.i.posthog.com",
        person_profiles: "identified_only",
      });
    }
  });
  //cspell:enable
</script>
