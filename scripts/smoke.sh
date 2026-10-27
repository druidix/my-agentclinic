#!/usr/bin/env bash
# Start the compiled app and check that it serves /health and the Pico stylesheet.
set -euo pipefail

port="${PORT:-3100}"
PORT="$port" node dist/index.js &
pid=$!
trap 'kill "$pid" 2>/dev/null || true' EXIT

for _ in $(seq 1 20); do
  curl --silent --fail "http://localhost:$port/health" >/dev/null && break
  sleep 0.5
done

curl --silent --fail "http://localhost:$port/health" | grep -q '"status":"ok"'
curl --silent --fail --output /dev/null "http://localhost:$port/vendor/pico/pico.min.css"
echo "Smoke test passed"
