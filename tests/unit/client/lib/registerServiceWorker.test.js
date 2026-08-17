/* ==========================================================================
tests/unit/client/lib/registerServiceWorker.test.js

Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

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

/**
 * Install minimal browser lifecycle mocks for registration and reload tests.
 *
 * @param {{ controller?: object | null, installing?: EventTarget | null, waiting?: object | null }} [options]
 * @returns {{ assign: ReturnType<typeof vi.fn>, registration: EventTarget, reload: ReturnType<typeof vi.fn>, serviceWorkerContainer: EventTarget }}
 */
function createServiceWorkerLifecycle(options = {}) {
  const browserWindow = window;
  const assign = vi.fn();
  const reload = vi.fn();
  const registration = new EventTarget();
  Object.assign(registration, {
    installing: options.installing ?? null,
    scope: 'https://netwk.pro/',
    waiting: options.waiting ?? null,
  });

  const serviceWorkerContainer = new EventTarget();
  Object.assign(serviceWorkerContainer, {
    controller: options.controller === undefined ? {} : options.controller,
    register: vi.fn().mockResolvedValue(registration),
  });

  Object.defineProperty(navigator, 'serviceWorker', {
    configurable: true,
    value: serviceWorkerContainer,
  });
  vi.stubGlobal('window', {
    __DISABLE_SW__: false,
    addEventListener: vi.fn(),
    clearTimeout: browserWindow.clearTimeout.bind(browserWindow),
    dispatchEvent: vi.fn(),
    location: {
      assign,
      origin: browserWindow.location.origin,
      reload,
    },
    setTimeout: browserWindow.setTimeout.bind(browserWindow),
  });
  vi.spyOn(document, 'readyState', 'get').mockReturnValue('complete');

  return { assign, registration, reload, serviceWorkerContainer };
}

describe('service worker navigation lifecycle', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.restoreAllMocks();
    window.__DISABLE_SW__ = false;
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.unstubAllGlobals();
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

  it('activates an already-waiting worker after registration', async () => {
    const waitingWorker = {
      postMessage: vi.fn(),
    };
    const { serviceWorkerContainer } = createServiceWorkerLifecycle({
      waiting: waitingWorker,
    });
    const { registerServiceWorker } =
      await import('$lib/registerServiceWorker.js');

    registerServiceWorker();
    await vi.waitFor(() => {
      expect(serviceWorkerContainer.register).toHaveBeenCalled();
    });

    expect(waitingWorker.postMessage).toHaveBeenCalledOnce();
    expect(waitingWorker.postMessage).toHaveBeenCalledWith({
      type: 'ACTIVATE_WAITING_WORKER',
    });
  });

  it('activates a waiting worker before an internal navigation', async () => {
    const waitingWorker = {
      postMessage: vi.fn(),
    };
    const { assign, registration, reload, serviceWorkerContainer } =
      createServiceWorkerLifecycle();
    const { activateWaitingServiceWorkerForNavigation, registerServiceWorker } =
      await import('$lib/registerServiceWorker.js');

    registerServiceWorker();
    await vi.waitFor(() => {
      expect(serviceWorkerContainer.register).toHaveBeenCalled();
    });

    const destination = new URL('/about', window.location.origin);
    registration.waiting = waitingWorker;
    expect(activateWaitingServiceWorkerForNavigation(destination)).toBe(true);
    expect(waitingWorker.postMessage).toHaveBeenCalledOnce();
    expect(waitingWorker.postMessage).toHaveBeenCalledWith({
      type: 'ACTIVATE_WAITING_WORKER',
    });

    serviceWorkerContainer.controller = {};
    serviceWorkerContainer.dispatchEvent(new Event('controllerchange'));

    expect(assign).toHaveBeenCalledWith(destination.href);
    expect(reload).not.toHaveBeenCalled();
  });

  it('does not reload when the first worker claims the page', async () => {
    const { assign, reload, serviceWorkerContainer } =
      createServiceWorkerLifecycle({ controller: null });
    const { registerServiceWorker } =
      await import('$lib/registerServiceWorker.js');

    registerServiceWorker();
    await vi.waitFor(() => {
      expect(serviceWorkerContainer.register).toHaveBeenCalled();
    });

    serviceWorkerContainer.controller = {};
    serviceWorkerContainer.dispatchEvent(new Event('controllerchange'));

    expect(assign).not.toHaveBeenCalled();
    expect(reload).not.toHaveBeenCalled();
  });

  it('reloads an existing controlled tab after controllerchange', async () => {
    const { assign, reload, serviceWorkerContainer } =
      createServiceWorkerLifecycle();
    const { registerServiceWorker } =
      await import('$lib/registerServiceWorker.js');

    registerServiceWorker();
    await vi.waitFor(() => {
      expect(serviceWorkerContainer.register).toHaveBeenCalled();
    });

    serviceWorkerContainer.controller = {};
    serviceWorkerContainer.dispatchEvent(new Event('controllerchange'));

    expect(assign).not.toHaveBeenCalled();
    expect(reload).toHaveBeenCalledOnce();
  });

  it('logs when an updated worker finishes installing and waits', async () => {
    const installingWorker = new EventTarget();
    Object.assign(installingWorker, { state: 'installing' });
    const { registration, serviceWorkerContainer } =
      createServiceWorkerLifecycle();
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});
    const { registerServiceWorker } =
      await import('$lib/registerServiceWorker.js');

    registerServiceWorker();
    await vi.waitFor(() => {
      expect(serviceWorkerContainer.register).toHaveBeenCalled();
    });

    registration.installing = installingWorker;
    registration.dispatchEvent(new Event('updatefound'));
    installingWorker.state = 'installed';
    installingWorker.dispatchEvent(new Event('statechange'));

    expect(log).toHaveBeenCalledWith(
      '[SW-CLIENT] Updated service worker is waiting',
    );
  });
});
