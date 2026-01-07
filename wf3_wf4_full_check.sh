#!/usr/bin/env bash
set -e

echo "=================================================="
echo "WF3 → WF4 FULL VALIDATION SCRIPT"
echo "=================================================="

ROOT="/c/AI-Factory/ai-app-saas"
BRANCH="build-wf3-stable-run-2"

cd "$ROOT"

echo
echo "▶ STEP 0 — Checkout build branch"
git fetch origin
git checkout "$BRANCH"

echo
echo "=================================================="
echo "▶ STEP 1 — VISUAL SNAPSHOT (FILES & STRUCTURE)"
echo "=================================================="

echo
echo "📁 Root:"
ls -la

echo
echo "📁 Frontend:"
ls -la frontend || echo "❌ frontend ontbreekt"

echo
echo "📁 Backend:"
ls -la backend || echo "❌ backend ontbreekt"

echo
echo "📄 docker-compose.yml"
sed -n '1,200p' docker-compose.yml || echo "❌ docker-compose.yml ontbreekt"

echo
echo "📄 .env.example"
sed -n '1,200p' .env.example || echo "❌ .env.example ontbreekt"

echo
echo "=================================================="
echo "▶ STEP 2 — CONTRACT VALIDATION (WF3 → WF4)"
echo "=================================================="

FAIL=0

echo
echo "🔍 Frontend stack check (NO CRA)"
if grep -q "react-scripts" frontend/package.json; then
  echo "❌ react-scripts gevonden (CRA verboden)"
  FAIL=1
else
  echo "✅ Geen react-scripts (Vite OK)"
fi

if grep -q "\"vite\"" frontend/package.json; then
  echo "✅ Vite aanwezig"
else
  echo "❌ Vite ontbreekt"
  FAIL=1
fi

echo
echo "🔍 Frontend verplichte files"
for f in frontend/index.html frontend/vite.config.ts frontend/src/main.tsx frontend/Dockerfile; do
  if [ -f "$f" ]; then
    echo "✅ $f"
  else
    echo "❌ $f ontbreekt"
    FAIL=1
  fi
done

echo
echo "🔍 Backend health endpoint"
if grep -R "health" backend/src >/dev/null 2>&1; then
  echo "✅ /health endpoint gevonden"
else
  echo "❌ /health endpoint ontbreekt"
  FAIL=1
fi

echo
echo "🔍 Dockerfile checks"
if grep -q "npm ci" frontend/Dockerfile backend/Dockerfile 2>/dev/null; then
  echo "❌ npm ci gebruikt (verboden)"
  FAIL=1
else
  echo "✅ npm install gebruikt"
fi

echo
echo "🔍 docker-compose ports"
grep -q "4000:4000" docker-compose.yml && echo "✅ backend port 4000" || FAIL=1
grep -q "3000:80" docker-compose.yml && echo "✅ frontend port 3000" || FAIL=1

grep -q "service_healthy" docker-compose.yml && \
  echo "✅ healthcheck dependency" || \
  echo "⚠️ geen health dependency (optioneel)"

if [ "$FAIL" -eq 1 ]; then
  echo
  echo "❌ CONTRACT VALIDATION FAILED — STOP"
  exit 1
fi

echo
echo "=================================================="
echo "▶ STEP 3 — DOCKER BUILD + RUNTIME CHECK"
echo "=================================================="

echo
echo "🧹 docker compose down"
docker compose down -v || true

echo
echo "🏗️ docker compose build"
docker compose build

echo
echo "🚀 docker compose up"
docker compose up -d

sleep 5

echo
echo "📦 Containers status"
docker compose ps

echo
echo "📜 Backend logs (last 40)"
docker compose logs --tail 40 backend || true

echo
echo "📜 Frontend logs (last 40)"
docker compose logs --tail 40 frontend || true

echo
echo "🌐 Health check"
curl -f http://localhost:4000/health && echo " ✅ backend healthy"

echo
echo "🌐 Frontend check"
curl -I http://localhost:3000 && echo " ✅ frontend reachable"

echo
echo "=================================================="
echo "🎉 RESULT: WF3 BUILD IS WF4-COMPATIBLE"
echo "=================================================="
