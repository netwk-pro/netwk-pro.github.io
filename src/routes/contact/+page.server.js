/* ==========================================================================
src/routes/contact/+page.server.js

SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

import { redirect } from "@sveltejs/kit";

export const prerender = false;

/** @type {import('./$types').PageServerLoad} */
export function load({ url }) {
  const utmSource = url.searchParams.get("utm_source");

  // Set target to your actual contact page path
  const target =
    "https://cloud.neteng.pro/index.php/apps/forms/s/nyWEq9fdE7kWAjqMtMySLqJc";

  // Preserve the tracking parameter
  const redirectTo = utmSource ? `${target}?utm_source=${utmSource}` : target;

  throw redirect(302, redirectTo);
}
