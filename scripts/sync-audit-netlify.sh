#!/usr/bin/env bash
set -e

open_repo_in_editor() {
  # Prefer explicit editor if user set it
  if [ -n "${EDITOR:-}" ]; then
    "$EDITOR" .
    return
  fi

  # VSCodium
  if command -v codium >/dev/null 2>&1; then
    codium .
    return
  fi

  # VS Code
  if command -v code >/dev/null 2>&1; then
    code .
    return
  fi

  echo "⚠️  Could not find 'codium' or 'code'. Open this repo in your editor manually."
}

# Fail fast if you have local changes
if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "❌ Working tree is not clean. Commit or stash changes first."
  exit 1
fi

start_branch="$(git rev-parse --abbrev-ref HEAD)"
trap 'git switch "$start_branch" >/dev/null 2>&1 || true' EXIT

echo "Syncing audit-netlify with master..."

# Ensure we start from the exact remote state of audit-netlify
git switch audit-netlify
git fetch origin audit-netlify
git reset --hard origin/audit-netlify

# Fetch latest master, then merge it into audit-netlify
git fetch origin master
if ! git merge --no-edit origin/master; then
  echo "❌ Merge conflict detected. Opening editor..."
  open_repo_in_editor
  echo "🛠 Resolve conflicts, stage changes, and run:"
  echo "   git commit && git push origin audit-netlify"
  exit 1
fi

# Push explicitly
git push origin audit-netlify
echo "✅ audit-netlify is now up to date with origin/master."
