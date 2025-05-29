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
  import { shouldTrackUser } from "$lib/utils/privacy.js";

  onMount(() => {
    if (!browser) return;

    const allowTracking = shouldTrackUser();

    // cspell:disable-next-line
    posthog.init("phc_Qshfo6AXzh4pS7aPigfqyeo4qj1qlyh7gDuHDeVMSR0", {
      api_host: "https://us.i.posthog.com",
      loaded: (ph) => {
        if (!allowTracking) {
          console.log("[PostHog] ⛔ User opted out — disabling tracking");
          ph.opt_out_capturing(); // Fully disable any tracking
        } else {
          console.log("[PostHog] ✅ Tracking enabled");
        }
      },
      autocapture: allowTracking, // Optional: Disable autocapture
      capture_pageview: allowTracking, // Optional: Disable initial pageview
      person_profiles: "identified_only",
    });
  });
</script>
