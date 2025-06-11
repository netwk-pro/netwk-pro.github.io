/* ==========================================================================
src/routes/pgp/[key]/+server.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
 This file is part of Network Pro.
========================================================================== */

import { error } from "@sveltejs/kit";
import fs from "fs/promises";
import path from "path";

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function GET({ params, setHeaders }) {
  const key = params.key;

  if (!key || !key.endsWith(".asc")) {
    throw error(400, "Invalid or missing file name");
  }

  const filePath = path.resolve("static/pgp", key);

  try {
    const file = await fs.readFile(filePath);
    setHeaders({
      "Content-Type": "application/pgp-keys",
      "Content-Disposition": `attachment; filename="${key}"`,
    });
    return new Response(file);
  } catch {
    return new Response("File not found", { status: 404 });
  }
}
