/* ==========================================================================
tests/unit/cspReport.test.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/** @file Unit tests for netlify-functions/cspReport.js using Vitest */
/** @typedef {import('vitest').TestContext} TestContext */

import { beforeEach, describe, expect, it, vi } from "vitest";
import { handler } from "../../netlify-functions/cspReport.js";

// 🧪 Force test mode
process.env.NODE_ENV = "test";
process.env.MAIL_ENABLED = "true"; // Still ignored due to NODE_ENV === test

// 🧪 Mock nodemailer to prevent real email sending
vi.mock("nodemailer", async () => {
  return {
    default: {
      createTransport: () => ({
        sendMail: vi.fn().mockResolvedValue({}),
      }),
    },
  };
});

describe("cspReport.js", () => {
  beforeEach(() => {
    vi.clearAllMocks(); // reset mocks if needed
  });

  it("should handle valid CSP report", async () => {
    /** @type {import('netlify/functions').HandlerEvent} */
    const event = {
      httpMethod: "POST",
      body: JSON.stringify({
        "csp-report": {
          "document-uri": "https://example.com",
          "violated-directive": "script-src",
        },
      }),
    };

    const response = await handler(event);
    expect(response.statusCode).toBe(204);
  });

  it("should reject GET requests", async () => {
    /** @type {import('netlify/functions').HandlerEvent} */
    const event = { httpMethod: "GET" };
    const response = await handler(event);
    expect(response.statusCode).toBe(405);
    expect(response.body).toContain("Method Not Allowed");
  });

  it("should handle malformed JSON", async () => {
    /** @type {import('netlify/functions').HandlerEvent} */
    const event = {
      httpMethod: "POST",
      body: "{ bad json }",
    };

    const response = await handler(event);
    expect(response.statusCode).toBe(400);
    expect(response.body).toContain("Invalid JSON");
  });

  it("should handle missing body", async () => {
    /** @type {import('netlify/functions').HandlerEvent} */
    const event = {
      httpMethod: "POST",
    };

    const response = await handler(event);
    expect(response.statusCode).toBe(400);
    expect(response.body).toContain("No body provided");
  });
});
