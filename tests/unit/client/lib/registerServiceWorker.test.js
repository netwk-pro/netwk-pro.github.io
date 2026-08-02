/* ==========================================================================
tests/unit/client/lib/registerServiceWorker.test.js

Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

import { goto } from '$app/navigation';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('$app/navigation', () => ({
  goto: vi.fn().mockResolvedValue(undefined),
}));

/**
 * Build a minimal SvelteKit navigation object for eligibility tests.
 *
 * @param {Record<string, unknown>} [overrides]
 * @returns {Record<string, unknown>}
 */
function createNavigation(overrides = {}) {
  return {
    cancel: vi.fn(),
    from: {
      params: {},
      route: { id: '/' },
      url: new URL('https://netwk.pro/'),
    },
    to: {
      params: {},
      route: { id: '/about' },
      url: new URL('https://netwk.pro/about'),
    },
    type: 'link',
    willUnload: false,
    ...overrides,
  };
}

describe('service worker navigation lifecycle', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.restoreAllMocks();
    window.__DISABLE_SW__ = false;
    vi.mocked(goto).mockResolvedValue(undefined);
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('intercepts only owned link and goto route navigations', async () => {
    const { shouldInterceptServiceWorkerNavigation } =
      await import('$lib/registerServiceWorker.js');

    expect(shouldInterceptServiceWorkerNavigation(createNavigation())).toBe(
      true,
    );
    expect(
      shouldInterceptServiceWorkerNavigation(
        createNavigation({ type: 'goto' }),
      ),
    ).toBe(true);

    const excludedNavigations = [
      createNavigation({ type: 'form' }),
      createNavigation({ type: 'popstate' }),
      createNavigation({ type: 'leave', willUnload: true }),
      createNavigation({
        to: {
          params: {},
          route: { id: null },
          url: new URL('https://example.com/'),
        },
        willUnload: true,
      }),
      createNavigation({
        from: {
          params: {},
          route: { id: '/' },
          url: new URL('https://netwk.pro/#first'),
        },
        to: {
          params: {},
          route: { id: '/' },
          url: new URL('https://netwk.pro/#second'),
        },
      }),
    ];

    excludedNavigations.forEach((navigation) => {
      expect(shouldInterceptServiceWorkerNavigation(navigation)).toBe(false);
    });
  });

  it('requests activation only when an update is waiting', async () => {
    const waitingWorker = {
      postMessage: vi.fn((_message, transferredPorts) => {
        transferredPorts[0].postMessage({
          type: 'SOLE_CLIENT_ACTIVATION_RESULT',
          willActivate: false,
        });
      }),
    };
    const registration = new EventTarget();
    Object.assign(registration, {
      installing: null,
      scope: 'https://netwk.pro/',
      waiting: waitingWorker,
    });

    const serviceWorkerContainer = new EventTarget();
    Object.assign(serviceWorkerContainer, {
      controller: {},
      register: vi.fn().mockResolvedValue(registration),
    });

    Object.defineProperty(navigator, 'serviceWorker', {
      configurable: true,
      value: serviceWorkerContainer,
    });
    vi.spyOn(document, 'readyState', 'get').mockReturnValue('complete');

    const {
      activateWaitingServiceWorkerForNavigation,
      registerServiceWorker,
      shouldInterceptServiceWorkerNavigation,
    } = await import('$lib/registerServiceWorker.js');

    registerServiceWorker();
    await vi.waitFor(() => {
      expect(serviceWorkerContainer.register).toHaveBeenCalled();
    });

    const destination = new URL('/about', window.location.origin);

    registration.waiting = null;
    expect(activateWaitingServiceWorkerForNavigation(destination)).toBe(false);

    registration.waiting = waitingWorker;
    expect(activateWaitingServiceWorkerForNavigation(destination)).toBe(true);
    const [message, transferredPorts] = waitingWorker.postMessage.mock.calls[0];
    expect(message).toEqual({ type: 'ACTIVATE_IF_SOLE_CLIENT' });
    expect(transferredPorts).toHaveLength(1);

    await vi.waitFor(() => {
      expect(goto).toHaveBeenCalledWith(destination.href);
    });

    expect(
      shouldInterceptServiceWorkerNavigation(
        createNavigation({
          from: {
            params: {},
            route: { id: '/' },
            url: new URL('/', window.location.origin),
          },
          to: {
            params: {},
            route: { id: '/about' },
            url: destination,
          },
        }),
      ),
    ).toBe(false);
  });
});
