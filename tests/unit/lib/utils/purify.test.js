/* ==========================================================================
tests/unit/lib/utils/purify.test.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * @file purify.test.js
 * @description Unit test for src/lib/utils/purify.js
 * @module tests/unit/lib/util
 * @author SunDevil311
 * @updated 2025-06-01
 */

import { describe, expect, it } from "vitest";
import { sanitizeHtml } from "../../../../src/lib/utils/purify.js";

describe("sanitizeHtml", () => {
  it("removes dangerous tags like <script>", async () => {
    const dirty = `<div>Hello <script>alert("XSS")</script> world!</div>`;
    const clean = await sanitizeHtml(dirty);
    expect(clean).toBe("<div>Hello  world!</div>");
  }); // timeout in ms

  it("preserves safe markup like <strong>", async () => {
    const dirty = `<p>This is <strong>important</strong>.</p>`;
    const clean = await sanitizeHtml(dirty);
    expect(clean).toBe("<p>This is <strong>important</strong>.</p>");
  });

  it("removes dangerous attributes like onerror", async () => {
    const dirty = `<img src="x" onerror="alert(1)">`;
    const clean = await sanitizeHtml(dirty);
    expect(clean).toBe("<img>");
  });

  it("keeps valid external links", async () => {
    const dirty = `<a href="https://example.com">Click</a>`;
    const clean = await sanitizeHtml(dirty);
    expect(clean).toBe('<a href="https://example.com">Click</a>');
  });

  it("blocks javascript: URLs", async () => {
    const dirty = `<a href="javascript:alert('XSS')">bad</a>`;
    const clean = await sanitizeHtml(dirty);
    expect(clean).toBe("<a>bad</a>");
  });
});
