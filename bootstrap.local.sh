#!/usr/bin/env bash
#
# Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
# SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
# This file is part of Network Pro

set -euo pipefail

echo "🛠 Bootstrapping local development environment..."

# Detect OS using uname
OS="$(uname -s)"

# Match OS string to normalized platform label
case "$OS" in
  Linux*)     PLATFORM="linux";;
  Darwin*)    PLATFORM="mac";;
  MINGW*|CYGWIN*|MSYS*) PLATFORM="windows";;  # Git Bash or similar
  *)          PLATFORM="unknown";;
esac

echo "🧭 Detected platform: $PLATFORM"

# Exit early for unsupported environments
if [[ "$PLATFORM" == "unknown" ]]; then
  echo "❌ Unsupported OS. Please use macOS, Linux, WSL, or Git Bash."
  exit 1
fi

# Handle Windows-specific case (Git Bash vs native PowerShell/CMD)
if [[ "$PLATFORM" == "windows" ]]; then
  if [[ -z "${BASH_VERSION:-}" ]]; then
    echo "⚠️  Detected native Windows shell (e.g., CMD or PowerShell)."
    echo "🛈  Please use WSL or Git Bash for full compatibility with this script."
    exit 1
  else
    echo "🪟 Detected Git Bash or compatible shell on Windows."
  fi
fi

# macOS-specific setup logic
if [[ "$PLATFORM" == "mac" ]]; then
  echo "🍎 Running macOS-specific setup..."

  # Check for Homebrew presence
  if ! command -v brew &> /dev/null; then
    echo "🔧 Homebrew not found. You can install it via:"
    echo '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"'
  else
    echo "✅ Homebrew is installed"
  fi

# Linux-specific setup logic
elif [[ "$PLATFORM" == "linux" ]]; then
  echo "🐧 Running Linux-specific setup..."

  # Check for common dev tool dependencies
  REQUIRED_CMDS=("curl" "git" "node" "npm")
  for cmd in "${REQUIRED_CMDS[@]}"; do
    if ! command -v "$cmd" &> /dev/null; then
      echo "⚠️ Missing required command: $cmd"
    fi
  done
fi

# Log current Node.js and npm versions
echo "🔍 Checking Node.js and npm versions..."
node -v
npm -v

# Ensure .env file exists
if [ ! -f .env ]; then
  echo "📋 Copying .env.template to .env..."
  cp .env.template .env
else
  echo "✅ .env already exists"
fi

# Install Node.js packages
echo "📦 Installing Node.js packages..."
npm install

# Install browser binaries for Playwright testing
echo "🧪 Installing Playwright dependencies..."
npx playwright install

echo "✅ Setup complete!"
echo "Next: run 'npm run dev' to start the development server."
