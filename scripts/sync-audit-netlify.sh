#!/bin/bash
set -e

echo "Syncing audit-netlify with master..."

git checkout audit-netlify
git pull origin audit-netlify
git fetch origin master

if ! git merge origin/master --no-edit; then
  echo "❌ Merge conflict detected. Opening VS Code..."
  code .
  echo "🛠 Resolve conflicts, stage changes, and run: git commit && git push"
  exit 1
fi

git push origin audit-netlify
echo "✅ audit-netlify is now up to date with master."
