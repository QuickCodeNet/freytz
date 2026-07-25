#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

if [[ ! -f .env ]]; then
  if [[ -f .env.example ]]; then
    cp .env.example .env
    echo "Created .env from .env.example — regenerate the project if JWT keys are missing."
  fi
fi

docker compose --env-file .env up -d --build "$@"

echo ""
echo "QuickCode stack (see .env for ports):"
echo "  Portal:  http://localhost:${PORTAL_PORT:-6020}"
echo "  Gateway: http://localhost:${GATEWAY_PORT:-6060}"
