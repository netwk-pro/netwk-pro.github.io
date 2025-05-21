/* ==========================================================================
tests/checkEnv.test.js

SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * Unit test for scripts/checkEnv.js
 */

import { afterEach, describe, expect, it } from "vitest";
import { checkEnv } from "../scripts/checkEnv.js";

describe("checkEnv()", () => {
  const originalEnv = process.env.ENV_MODE;

  afterEach(() => {
    if (originalEnv === undefined) {
      delete process.env.ENV_MODE;
    } else {
      process.env.ENV_MODE = originalEnv;
    }
  });

  it("should default to 'dev' if ENV_MODE is not set", () => {
    delete process.env.ENV_MODE;
    const result = checkEnv();
    expect(result.mode).toBe("dev");
    expect(result.valid).toBe(true);
    expect(result.wasDefaulted).toBe(true);
  });

  it("should validate a correct ENV_MODE", () => {
    process.env.ENV_MODE = "ci";
    const result = checkEnv();
    expect(result.mode).toBe("ci");
    expect(result.valid).toBe(true);
    expect(result.wasDefaulted).toBe(false);
  });

  it("should return invalid for an unknown ENV_MODE", () => {
    process.env.ENV_MODE = "banana";
    const result = checkEnv();
    expect(result.valid).toBe(false);
    expect(result.allowed).toContain("dev");
  });
});
