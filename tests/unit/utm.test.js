/* ==========================================================================
tests/unit/utm.test.js

SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

import { appendUTM } from "$lib/utils/utm.js";
import { afterEach, describe, expect, it } from "vitest";

describe("appendUTM", () => {
  const originalWindow = globalThis.window;

  afterEach(() => {
    globalThis.window = originalWindow;
  });

  it("should return null when not in a browser environment", () => {
    // @ts-expect-error – simulating SSR
    delete globalThis.window;

    const url = "https://example.com";
    const result = appendUTM(url);
    expect(result).toBe(null);
  });

  it("should return URL with utm_source appended", () => {
    globalThis.window = {
      // @ts-expect-error – mock minimal window for test
      location: { search: "?utm_source=linkedin" },
    };

    const url = "https://example.com";
    const result = appendUTM(url);
    expect(result).toBe("https://example.com?utm_source=linkedin");
  });

  it("should return original URL if no utm_source is present", () => {
    globalThis.window = {
      // @ts-expect-error – mock minimal window for test
      location: { search: "" },
    };

    const url = "https://example.com";
    const result = appendUTM(url);
    expect(result).toBe("https://example.com");
  });
});
