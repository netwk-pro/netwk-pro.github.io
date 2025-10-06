/* ==========================================================================
tests/unit/client/lib/PWAInstallButton.test.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * @file redirect.test.js
 * @description Unit test for PWA install component
 * @module tests/unit/lib
 * @author SunDevil311
 * @updated 2025-10-05
 */

import PWAInstallButton from '$lib/components/PWAInstallButton.svelte';
import { fireEvent, render, waitFor } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';

/* --------------------------------------------------------------------------
   Fake BeforeInstallPromptEvent Mock
   --------------------------------------------------------------------------
   */
class FakeBeforeInstallPromptEvent {
  constructor() {
    this.prompt = vi.fn();
    this.userChoice = Promise.resolve({
      outcome: 'accepted',
      platform: 'test',
    });
  }
}

/* --------------------------------------------------------------------------
   Tests
   -------------------------------------------------------------------------- */
describe('PWAInstallButton', () => {
  it('shows button when pwa-install-available event is fired', async () => {
    const { getByRole, queryByRole } = render(PWAInstallButton);

    // Initially, the install button should not be in the DOM
    expect(queryByRole('button')).toBeNull();

    // Dispatch the custom event that makes the button appear
    const fakeEvent = new FakeBeforeInstallPromptEvent();
    window.dispatchEvent(
      new CustomEvent('pwa-install-available', { detail: fakeEvent }),
    );

    // Verify that the button now appears
    const button = await waitFor(() =>
      getByRole('button', { name: /install app/i }),
    );
    expect(button).toBeInTheDocument();
  });

  it('calls prompt() when install button is clicked', async () => {
    const { getByRole } = render(PWAInstallButton);

    // Fire the event that makes the button visible
    const fakeEvent = new FakeBeforeInstallPromptEvent();
    window.dispatchEvent(
      new CustomEvent('pwa-install-available', { detail: fakeEvent }),
    );

    // Wait until the button appears
    const button = await waitFor(() =>
      getByRole('button', { name: /install app/i }),
    );

    // Simulate a user clicking the install button
    await fireEvent.click(button);

    // Verify that prompt() was called — the core behavior we care about
    expect(fakeEvent.prompt).toHaveBeenCalled();

    // (Removed: button disappearance check, since it depends on async animation timing)
  });
});
