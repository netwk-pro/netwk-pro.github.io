/* ==========================================================================
src/lib/page.svelte.test.js

SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/svelte";
import { describe, expect, test } from "vitest";
import Page from "./+page.svelte";

describe("/+page.svelte", () => {
  test("should render the home page section", () => {
    render(Page);
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
  });
});
