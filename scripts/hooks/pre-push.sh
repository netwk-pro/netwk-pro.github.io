#!/usr/bin/env bash
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
