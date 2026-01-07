#!/usr/bin/env bash
set -euo pipefail

ROOT="$(pwd)"
OUT="$ROOT/infra_audit"

echo "▶ Infra audit gestart..."
rm -rf "$OUT"
mkdir -p "$OUT/INFRA_FILES"

echo "▶ Repository metadata verzamelen..."
{
  echo "PWD: $(pwd)"
  echo "DATE: $(date -Iseconds)"
  echo "GIT BRANCH:"
  git branch --show-current || true
  echo
  echo "GIT REMOTES:"
  git remote -v || true
  echo
  echo "LAST 5 COMMITS:"
  git --no-pager log -5 --oneline || true
} > "$OUT/META.txt"

echo "▶ Volledige tree (root)..."
tree -a -I '.git|node_modules|dist|build' > "$OUT/TREE.txt" || ls -R > "$OUT/TREE.txt"

echo "▶ docker-compose.yml kopiëren..."
if [ -f docker-compose.yml ]; then
  cp docker-compose.yml "$OUT/DOCKER_COMPOSE.yml"
else
  echo "❌ docker-compose.yml ontbreekt" > "$OUT/DOCKER_COMPOSE.yml"
fi

echo "▶ Backend Dockerfile..."
if [ -f backend/Dockerfile ]; then
  cp backend/Dockerfile "$OUT/BACKEND_Dockerfile"
else
  echo "❌ backend/Dockerfile ontbreekt" > "$OUT/BACKEND_Dockerfile"
fi

echo "▶ Frontend Dockerfile..."
if [ -f frontend/Dockerfile ]; then
  cp frontend/Dockerfile "$OUT/FRONTEND_Dockerfile"
else
  echo "❌ frontend/Dockerfile ontbreekt" > "$OUT/FRONTEND_Dockerfile"
fi

if [ -d infra ]; then
  echo "▶ Infra directory tree..."
  tree -a infra > "$OUT/INFRA_TREE.txt" || ls -R infra > "$OUT/INFRA_TREE.txt"

  echo "▶ Infra bestanden kopiëren..."
  cp -R infra/* "$OUT/INFRA_FILES/" 2>/dev/null || true
else
  echo "ℹ️ Geen infra/ directory aanwezig" > "$OUT/INFRA_TREE.txt"
fi

echo "▶ Audit klaar."
echo
echo "📂 Resultaat:"
echo "   $OUT"
echo
echo "➡️ Stuur deze map (infra_audit/) naar ChatGPT voor volledige infra-validatie."
