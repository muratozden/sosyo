#!/usr/bin/env bash
set -euo pipefail

HOST="${DEPLOY_HOST:-root@178.104.131.90}"
REMOTE_DIR="${DEPLOY_DIR:-/opt/sosyo}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

cd "$ROOT"
npm run build
npm run styles

rsync -avz --delete \
  --exclude '.DS_Store' \
  "$ROOT/dist/" "$HOST:$REMOTE_DIR/dist/"

echo "Deployed to $HOST:$REMOTE_DIR/dist"
echo "Kodigen (/opt/kodigen) was not modified."
