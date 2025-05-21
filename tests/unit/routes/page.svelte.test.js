/* ==========================================================================
src/routes/page.svelte.test.js

SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/svelte";
import { describe, expect, test } from "vitest";
import Page from "../../../src/routes/+page.svelte";

describe("/+page.svelte", () => {
  test("should render the home page section", () => {
    const mockData = {
      pathname: "/", // Required because layout uses it
      meta: {
        title:
          "Locking Down Networks, Unlocking Confidence™ | Security, Networking, Privacy — Network Pro™",
        description:
          "Locking Down Networks, Unlocking Confidence™ | Security, Networking, Privacy — Network Pro™",
      },
    };

    render(Page, { props: { data: mockData } });

    expect(screen.getByTestId("home-page")).toBeInTheDocument();
  });
});
