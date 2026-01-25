#!/usr/bin/env bash
#
# Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
# SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
# This file is part of Network Pro
set -e

# Don't run local hooks in CI
[ "${CI:-}" = "true" ] && exit 0

branch="$(git rev-parse --abbrev-ref HEAD)"
if [[ "$branch" == "master" || "$branch" == "main" ]]; then
  echo "❌ Refusing to push directly to $branch (use a PR)."
  exit 1
fi

# Existing behavior
npm run checkout
