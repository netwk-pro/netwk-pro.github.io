/*
  test/test.mjs

  SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
  This file is part of Network Pro
*/

import { expect } from "chai";

// The function to be tested
function add(a, b) {
  return a + b;
}

// Describe the test suite
describe("Addition Function", function () {
  it("should return 5 when adding 2 and 3", function () {
    const result = add(2, 3);
    expect(result).to.equal(5);
  });

  it("should return -1 when adding 2 and -3", function () {
    const result = add(2, -3);
    expect(result).to.equal(-1);
  });
});

export { add };
