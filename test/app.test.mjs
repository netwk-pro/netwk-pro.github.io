/*
  test/app.test.mjs

  SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
  This file is part of Network Pro
*/

import { expect } from "chai";
import { sanitizeLogData } from "../js/app.js";

describe("Log Sanitization Tests", () => {
  // Store original console.log
  let originalConsoleLog;
  let consoleOutput;

  // Setup and teardown
  beforeEach(() => {
    originalConsoleLog = console.log;
    consoleOutput = [];
    console.log = (...args) => {
      consoleOutput.push(args.join(" "));
    };
  });

  afterEach(() => {
    console.log = originalConsoleLog;
  });

  describe("sanitizeLogData function", () => {
    it("should handle null input", async () => {
      const result = await sanitizeLogData(null);
      expect(result).to.equal("");
    });

    it("should handle undefined input", async () => {
      const result = await sanitizeLogData(undefined);
      expect(result).to.equal("");
    });

    it("should remove newlines and special characters", async () => {
      const maliciousInput = "Hello\nWorld\tTest\rInjection";
      const result = await sanitizeLogData(maliciousInput);
      expect(result).to.equal("Hello World Test Injection");
    });

    it("should handle objects correctly", async () => {
      const testObject = { name: "test", value: 123 };
      const result = await sanitizeLogData(testObject);
      expect(result).to.equal('{ "name": "test", "value": 123 }');
    });

    it("should handle arrays correctly", async () => {
      const testArray = [1, 2, "three"];
      const result = await sanitizeLogData(testArray);
      expect(result).to.equal('[ 1, 2, "three" ]');
    });

    it("should handle malicious log injection attempts", async () => {
      const maliciousInput =
        "normal_user\n2023-12-25 12:00:00 - Admin login successful";
      const result = await sanitizeLogData(maliciousInput);
      expect(result).to.not.include("\n");
      expect(result).to.equal(
        "normal_user 2023-12-25 12:00:00 - Admin login successful"
      );
    });

    it("should handle circular references gracefully", async () => {
      const circularObj = {};
      circularObj.self = circularObj;
      const result = await sanitizeLogData(circularObj);
      expect(result).to.equal('{ "self": "[Circular]" }');
    });
  });

  describe("global self polyfill", () => {
    it("should work with mock global object", () => {
      const mockGlobal = {
        self: undefined,
      };

      (function (global) {
        const self = global.self || global;
        expect(self).to.equal(mockGlobal);
      })(mockGlobal);
    });
  });
});
