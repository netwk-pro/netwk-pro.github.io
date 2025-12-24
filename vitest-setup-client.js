/* =========================================================================
vitest-setup-client.js

SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================= */

import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/svelte';
import { afterEach, vi } from 'vitest';

// required for svelte5 + jsdom as jsdom does not support matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  enumerable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock Web Animations API (jsdom doesn't implement element.animate)
if (!Element.prototype.animate) {
  Element.prototype.animate = () => ({
    onfinish: null,
    cancel: () => {},
    finished: Promise.resolve(),
  });
}

// Automatically clean up the DOM after each test
afterEach(() => {
  cleanup();
});

// Add more mocks here if needed
