#!/bin/bash
set -e

# Install dependencies in the root
pnpm install

# Install dependencies in the client directory
cd client
pnpm install

# Build the Next.js application
pnpm run build 