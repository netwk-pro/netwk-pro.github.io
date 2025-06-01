/* ==========================================================================
tests/unit/csp-report.test.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * Tests the edge-functions/csp-report.js CSP reporting endpoint
 *
 * @module tests/unit
 * @author SunDevil311
 * @updated 2025-05-31
 */

/** @file Unit tests for edge-functions/csp-report.js using Vitest */
/** @typedef {import('vitest').TestContext} TestContext */

import { beforeEach, describe, expect, it, vi } from "vitest";
import handler from "../../edge-functions/csp-report.js";

// 🧪 Mock fetch used by sendToNtfy inside the Edge Function
global.fetch = vi.fn(() =>
  Promise.resolve({ ok: true, status: 200, text: () => "OK" }),
);

describe("csp-report.js", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should handle a valid CSP report", async () => {
    const req = new Request("http://localhost/api/csp-report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "csp-report": {
          "document-uri": "https://example.com",
          "violated-directive": "script-src",
          "blocked-uri": "https://malicious.site",
        },
      }),
    });

    const res = await handler(req, {});
    expect(res.status).toBe(204);
  });

  it("should reject non-POST requests", async () => {
    const req = new Request("http://localhost/api/csp-report", {
      method: "GET",
    });

    const res = await handler(req, {});
    const text = await res.text();
    expect(res.status).toBe(405);
    expect(text).toContain("Method Not Allowed");
  });

  it("should handle malformed JSON", async () => {
    const badJson = "{ invalid json }";
    const req = new Request("http://localhost/api/csp-report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: badJson,
    });

    const res = await handler(req, {});
    expect(res.status).toBe(204); // The current handler swallows errors silently
  });

  it("should handle missing body", async () => {
    const req = new Request("http://localhost/api/csp-report", {
      method: "POST",
    });

    const res = await handler(req, {});
    expect(res.status).toBe(204); // No body is also treated silently
  });
});
