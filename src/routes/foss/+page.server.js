/* ==========================================================================
src/routes/foss/+page.server.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

import { defaultMeta, meta } from '$lib/meta.js';

export const prerender = false;

/** @type {import('./$types').PageServerLoad} */
export function load() {
  return {
    meta: meta['/foss'] || defaultMeta,
  };
}
