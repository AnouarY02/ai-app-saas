#!/usr/bin/env bash
set -euo pipefail

# ---------------------------
# Config (pas alleen BUILD_ID aan als je wil)
# ---------------------------
BUILD_ID="${BUILD_ID:-build-1768843086544}"
REPO_OWNER="${REPO_OWNER:-AnouarY02}"
REPO_NAME="${REPO_NAME:-ai-app-saas}"
BASE_BRANCH="${BASE_BRANCH:-main}"
APP_NAME="${APP_NAME:-AI App}"

# n8n / WF4
N8N_BASE="${N8N_BASE:-http://localhost:5678}"
WF4_EP="${WF4_EP:-$N8N_BASE/webhook/wf4/build}"

# Local repo path (Windows Git Bash)
REPO_DIR="${REPO_DIR:-/c/${REPO_NAME}}"

# Runner container name
RUNNER_CONTAINER="${RUNNER_CONTAINER:-wf4-runner}"

# Polling
POLL_N="${POLL_N:-18}"
POLL_SLEEP="${POLL_SLEEP:-5}"

fail(){ echo "[FAIL] $*" >&2; exit 1; }
ok(){ echo "[OK] $*"; }
need(){ command -v "$1" >/dev/null 2>&1 || fail "Missing dependency: $1"; }

need git
need curl
need docker
need grep
need sed

echo "================================================="
echo "WF4 FIX+RUN"
echo "  BUILD_ID      = $BUILD_ID"
echo "  REPO          = $REPO_OWNER/$REPO_NAME"
echo "  BRANCH        = $BUILD_ID"
echo "  BASE_BRANCH   = $BASE_BRANCH"
echo "  REPO_DIR      = $REPO_DIR"
echo "  WF4_EP        = $WF4_EP"
echo "  RUNNER        = $RUNNER_CONTAINER"
echo "================================================="

# ---------------------------
# Ensure repo exists locally
# ---------------------------
if [[ ! -d "$REPO_DIR/.git" ]]; then
  ok "Local repo missing, cloning into $REPO_DIR"
  rm -rf "$REPO_DIR" 2>/dev/null || true
  git clone "https://github.com/${REPO_OWNER}/${REPO_NAME}.git" "$REPO_DIR"
fi

cd "$REPO_DIR"
ok "Repo ready: $(pwd)"

# ---------------------------
# Ensure branch exists locally
# ---------------------------
git fetch origin --prune

if git show-ref --verify --quiet "refs/remotes/origin/$BUILD_ID"; then
  ok "Remote branch exists: origin/$BUILD_ID"
else
  # If build branch doesn't exist remotely, create from baseBranch
  ok "Remote branch missing, creating $BUILD_ID from origin/$BASE_BRANCH"
  git checkout -B "$BUILD_ID" "origin/$BASE_BRANCH"
  git push -u origin "$BUILD_ID"
fi

git checkout "$BUILD_ID"
ok "Checked out branch: $BUILD_ID"

# ---------------------------
# Ensure public/ exists (frontend expects it)
# ---------------------------
mkdir -p public
: > public/.gitkeep

# ---------------------------
# Fix: replace any COPY public with COPY public (if present anywhere)
# ---------------------------
# (Idempotent; only changes if pattern exists)
FILES_WITH_BAD_COPY="$(grep -RIl --exclude-dir=node_modules --exclude-dir=.git "COPY public" . || true)"
if [[ -n "${FILES_WITH_BAD_COPY}" ]]; then
  ok "Found COPY public in Dockerfiles; patching..."
  while IFS= read -r f; do
    sed -i 's|COPY public|COPY public|g' "$f"
  done <<< "$FILES_WITH_BAD_COPY"
else
  ok "No COPY public found (good)."
fi

# ---------------------------
# Extra sanity: confirm frontend Dockerfile uses relative copy
# ---------------------------
if grep -RIn --exclude-dir=node_modules --exclude-dir=.git "COPY public ./public" ./frontend/Dockerfile >/dev/null 2>&1; then
  ok "frontend/Dockerfile has COPY public ./public"
else
  echo "[WARN] frontend/Dockerfile does not contain 'COPY public ./public' (check if structure changed)."
fi

# ---------------------------
# Commit & push only if changes exist
# ---------------------------
if [[ -n "$(git status --porcelain)" ]]; then
  ok "Changes detected; committing and pushing..."
  git add -A
  git commit -m "WF4 build fix: ensure public exists and normalize Docker COPY paths"
  git push origin "$BUILD_ID"
  ok "Pushed fixes to origin/$BUILD_ID"
else
  ok "No repo changes needed (working tree clean)."
fi

# ---------------------------
# Reset runner /tmp checkout for this buildId
# ---------------------------
if docker ps --format '{{.Names}}' | grep -qx "$RUNNER_CONTAINER"; then
  ok "Clearing runner tmp checkout: /tmp/$BUILD_ID"
  docker exec -i "$RUNNER_CONTAINER" sh -lc "rm -rf /tmp/$BUILD_ID && ls -la /tmp | head" >/dev/null 2>&1 || true

  ok "Restarting runner: $RUNNER_CONTAINER"
  docker restart "$RUNNER_CONTAINER" >/dev/null
else
  echo "[WARN] Runner container not running: $RUNNER_CONTAINER (skipping tmp cleanup/restart)"
fi

# ---------------------------
# Trigger WF4 build
# ---------------------------
BODY="$(cat <<JSON
{
  "meta": {
    "buildId": "$BUILD_ID",
    "repoOwner": "$REPO_OWNER",
    "repoName": "$REPO_NAME",
    "branch": "$BUILD_ID",
    "baseBranch": "$BASE_BRANCH",
    "appName": "$APP_NAME"
  }
}
JSON
)"

ok "Trigger WF4 build..."
curl -sS -X POST "$WF4_EP" -H "Content-Type: application/json" -d "$BODY" | sed 's/^/[WF4] /'
echo

# ---------------------------
# Poll status
# ---------------------------
ok "Polling WF4 status ($POLL_N x every ${POLL_SLEEP}s)..."
STATUS="RUNNING"
LAST=""

for i in $(seq 1 "$POLL_N"); do
  echo "---- poll $i ----"
  LAST="$(curl -sS -X POST "$WF4_EP" -H "Content-Type: application/json" -d "$BODY")"
  echo "$LAST"
  echo

  # quick status parse (no jq dependency)
  if echo "$LAST" | grep -q '"status":"SUCCESS"'; then
    STATUS="SUCCESS"
    break
  fi
  if echo "$LAST" | grep -q '"status":"FAILED"'; then
    STATUS="FAILED"
    break
  fi

  sleep "$POLL_SLEEP"
done

if [[ "$STATUS" == "SUCCESS" ]]; then
  ok "WF4 SUCCESS for $BUILD_ID"
  exit 0
fi

if [[ "$STATUS" == "FAILED" ]]; then
  echo "[FAIL] WF4 FAILED for $BUILD_ID"
  echo "------ runner tail ------"
  docker logs --tail 120 "$RUNNER_CONTAINER" 2>/dev/null || true
  exit 1
fi

echo "[FAIL] WF4 still RUNNING after polling window. Check runner logs:"
docker logs --tail 120 "$RUNNER_CONTAINER" 2>/dev/null || true
exit 1
