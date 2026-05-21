#!/usr/bin/env bash
# Sunucuda çalıştır: /opt/sosyo/deploy-server.sh
# Kodigen (/opt/kodigen) ile ilgisi yoktur.
set -euo pipefail

REPO_DIR="${SOSYO_REPO_DIR:-/opt/sosyo/repo}"
DIST_DIR="${SOSYO_DIST_DIR:-/opt/sosyo/dist}"
REPO_URL="${SOSYO_REPO_URL:-https://github.com/muratozden/sosyo.git}"
BRANCH="${SOSYO_BRANCH:-main}"
NODE_BIN="${NODE_BIN:-/root/.nvm/versions/node/v24.15.0/bin}"

export PATH="$NODE_BIN:$PATH"

mkdir -p "$(dirname "$REPO_DIR")"

if [[ ! -d "$REPO_DIR/.git" ]]; then
	git clone --branch "$BRANCH" --depth 1 "$REPO_URL" "$REPO_DIR"
fi

cd "$REPO_DIR"
git fetch origin "$BRANCH"
git reset --hard "origin/$BRANCH"

# CodeKit bazen src/utils/seo.js üretir; Astro build'i kırar
rm -f src/utils/seo.js

npm ci
npm run build
npm run styles

mkdir -p "$DIST_DIR"
rsync -a --delete --exclude '.DS_Store' dist/ "$DIST_DIR/"

echo "OK: $(date -Is) — deployed to $DIST_DIR from origin/$BRANCH"
