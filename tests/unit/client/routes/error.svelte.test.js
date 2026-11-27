/* ==========================================================================
tests/unit/client/routes/error.svelte.test.js

Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * @file error.svelte.test.js
 * @description Verifies +error.svelte renders the SvelteKit 3 `error` prop,
 * whose `status` replaces the former separate `status` prop.
 * @module tests/unit/client/routes
 * @author Scott Lopez
 * @updated 2026-11-26
 */

import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/svelte';
import { describe, expect, test } from 'vitest';
import ErrorPage from '../../../../src/routes/+error.svelte';

describe('/+error.svelte', () => {
  test('renders the not-found presentation for a 404 error', () => {
    render(ErrorPage, {
      props: { error: { status: 404, message: 'Not Found' } },
    });

    expect(
      screen.getByRole('heading', { level: 1, name: '404 - Page Not Found' }),
    ).toBeInTheDocument();
    expect(screen.getByText(/does not exist\./)).toBeInTheDocument();
    expect(screen.queryByText('Not Found')).not.toBeInTheDocument();
  });

  test('renders the generic presentation and safe message for a 500 error', () => {
    render(ErrorPage, {
      props: {
        error: { status: 500, message: 'A server-side error occurred' },
      },
    });

    expect(
      screen.getByRole('heading', { level: 1, name: '500 - Error' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('A server-side error occurred'),
    ).toBeInTheDocument();
  });

  test('falls back to a default message when none is provided', () => {
    render(ErrorPage, {
      props: { error: { status: 503, message: '' } },
    });

    expect(
      screen.getByRole('heading', { level: 1, name: '503 - Error' }),
    ).toBeInTheDocument();
    expect(screen.getByText('An error occurred')).toBeInTheDocument();
  });
});
