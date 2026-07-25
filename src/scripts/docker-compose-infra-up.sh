#!/usr/bin/env bash
set -euo pipefail

# Starts databases, Elasticsearch, and Kafka only — use with host-side dotnet debug.
cd "$(dirname "$0")/.."

if [[ ! -f .env ]]; then
  if [[ -f .env.example ]]; then
    cp .env.example .env
  fi
fi

INFRA_SERVICES=(
  freytz-pg-data
  freytz-mysql-data
  freytz-sql-data
  freytz-elasticsearch
  freytz-kibana
  freytz-zookeeper
  freytz-kafka
  freytz-kafdrop
)

docker compose --env-file .env up -d "${INFRA_SERVICES[@]}" "$@"

echo ""
echo "Infrastructure containers started. Debug a single service on the host via LaunchSettings,"
