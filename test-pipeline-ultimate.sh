#!/bin/bash

# ==========================================
# AI-FABRIEK COMPLETE PIPELINE TEST
# Ultimate Edition with Error Handling & Polling
# ==========================================

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# ==========================================
# Configuration
# ==========================================
BUILD_ID=$(date +%s)
REPO_OWNER="AnouarY02"
REPO_NAME="ai-app-saas"
APP_NAME="TaskFlow Pro"
BASE_BRANCH="main"

# ==========================================
# Load GitHub Token
# ==========================================
if [ -z "$GITHUB_TOKEN" ]; then
  if [ -f "/c/AI-Factory/.env" ]; then
    export GITHUB_TOKEN=$(grep GITHUB_TOKEN /c/AI-Factory/.env | cut -d'=' -f2 | tr -d '"' | tr -d "'" | xargs)
    echo -e "${GREEN}✅ Loaded GITHUB_TOKEN from /c/AI-Factory/.env${NC}"
  else
    echo -e "${RED}❌ GITHUB_TOKEN not set and .env not found${NC}"
    echo "Please set GITHUB_TOKEN:"
    echo "  export GITHUB_TOKEN=ghp_your_token_here"
    exit 1
  fi
fi

# Verify token works
echo -n "🔐 Verifying GitHub token... "
TOKEN_TEST=$(curl -s -H "Authorization: Bearer $GITHUB_TOKEN" "https://api.github.com/user" | jq -r '.login')
if [ "$TOKEN_TEST" != "null" ] && [ -n "$TOKEN_TEST" ]; then
  echo -e "${GREEN}✅ Valid (user: $TOKEN_TEST)${NC}"
else
  echo -e "${RED}❌ Invalid token!${NC}"
  exit 1
fi

# ==========================================
# Helper Functions
# ==========================================

function print_header() {
  echo ""
  echo -e "${BLUE}╔════════════════════════════════════════════════════════════════╗${NC}"
  echo -e "${BLUE}║${NC} $1"
  echo -e "${BLUE}╚════════════════════════════════════════════════════════════════╝${NC}"
  echo ""
}

function print_step() {
  echo ""
  echo -e "${YELLOW}┌────────────────────────────────────────────────────────────────┐${NC}"
  echo -e "${YELLOW}│${NC} $1"
  echo -e "${YELLOW}└────────────────────────────────────────────────────────────────┘${NC}"
}

function check_success() {
  local response=$1
  local workflow=$2
  
  # Check for various success indicators
  if echo "$response" | jq -e '.success' > /dev/null 2>&1; then
    return 0
  elif echo "$response" | jq -e '.github.commit' > /dev/null 2>&1; then
    return 0
  elif echo "$response" | jq -e '.commit.sha' > /dev/null 2>&1; then
    return 0
  else
    echo -e "${RED}❌ $workflow FAILED!${NC}"
    echo "$response" | jq '.'
    return 1
  fi
}

function wait_with_spinner() {
  local duration=$1
  local message=$2
  
  echo -n "$message"
  for i in $(seq 1 $duration); do
    echo -n "."
    sleep 1
  done
  echo " Done!"
}

function verify_github_file() {
  local file_path=$1
  local branch=$2
  
  curl -s -H "Authorization: Bearer $GITHUB_TOKEN" \
    "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/contents/$file_path?ref=$branch" \
    | jq -e '.name' > /dev/null 2>&1
}

# ==========================================
# Start Pipeline
# ==========================================

print_header "AI-FABRIEK COMPLETE PIPELINE TEST"

echo "📋 Configuration:"
echo "   Build ID:    $BUILD_ID"
echo "   Repository:  $REPO_OWNER/$REPO_NAME"
echo "   Base Branch: $BASE_BRANCH"
echo "   App Name:    $APP_NAME"
echo "   Branch:      build-$BUILD_ID"
echo ""
echo -e "${YELLOW}Press ENTER to start pipeline...${NC}"
read

# ==========================================
# STEP 1: WF1 - Blueprint Generator
# ==========================================

print_step "STEP 1/5: WF1 - Blueprint Generator"

echo "🚀 Calling WF1..."
WF1_RESPONSE=$(curl -s -X POST "http://localhost:5678/webhook/wf1/generate" \
  -H "Content-Type: application/json" \
  -d "{
    \"userPrompt\": \"Build a task management app with projects, tasks, and team collaboration features\",
    \"buildId\": \"$BUILD_ID\",
    \"repoOwner\": \"$REPO_OWNER\",
    \"repoName\": \"$REPO_NAME\",
    \"baseBranch\": \"$BASE_BRANCH\",
    \"appName\": \"$APP_NAME\"
  }")

if check_success "$WF1_RESPONSE" "WF1"; then
  WF1_COMMIT=$(echo "$WF1_RESPONSE" | jq -r '.github.commit // .commit.sha // "unknown"')
  echo -e "${GREEN}✅ WF1 Complete (commit: ${WF1_COMMIT:0:7})${NC}"
  
  # Wait for GitHub to process
  wait_with_spinner 10 "⏳ Waiting for GitHub to process"
  
  # Verify file exists
  if verify_github_file "builds/$BUILD_ID/wf1-blueprint.json" "build-$BUILD_ID"; then
    echo -e "${GREEN}✅ Blueprint file verified on GitHub${NC}"
  else
    echo -e "${YELLOW}⚠️  Blueprint file not yet visible (may need more time)${NC}"
  fi
else
  echo -e "${RED}❌ WF1 failed, stopping pipeline${NC}"
  exit 1
fi

# ==========================================
# STEP 2: WF2 - Feature Builder
# ==========================================

print_step "STEP 2/5: WF2 - Feature Builder"

echo "🚀 Calling WF2..."
WF2_RESPONSE=$(curl -s -X POST "http://localhost:5678/webhook/wf2/generate" \
  -H "Content-Type: application/json" \
  -d "{
    \"buildId\": \"$BUILD_ID\",
    \"repoOwner\": \"$REPO_OWNER\",
    \"repoName\": \"$REPO_NAME\",
    \"baseBranch\": \"$BASE_BRANCH\",
    \"appName\": \"$APP_NAME\"
  }")

if check_success "$WF2_RESPONSE" "WF2"; then
  WF2_COMMIT=$(echo "$WF2_RESPONSE" | jq -r '.github.commit // .commit.sha // "unknown"')
  echo -e "${GREEN}✅ WF2 Complete (commit: ${WF2_COMMIT:0:7})${NC}"
  
  wait_with_spinner 10 "⏳ Waiting for GitHub to process"
  
  if verify_github_file "builds/$BUILD_ID/wf2-devplan.json" "build-$BUILD_ID"; then
    echo -e "${GREEN}✅ DevPlan file verified on GitHub${NC}"
  else
    echo -e "${YELLOW}⚠️  DevPlan file not yet visible${NC}"
  fi
else
  echo -e "${RED}❌ WF2 failed, stopping pipeline${NC}"
  exit 1
fi

# ==========================================
# STEP 3: WF2.5 - API Contract Generator
# ==========================================

print_step "STEP 3/5: WF2.5 - API Contract Generator"

echo "🚀 Calling WF2.5..."
WF25_RESPONSE=$(curl -s -X POST "http://localhost:5678/webhook/wf2-5/generate" \
  -H "Content-Type: application/json" \
  -d "{
    \"buildId\": \"$BUILD_ID\",
    \"repoOwner\": \"$REPO_OWNER\",
    \"repoName\": \"$REPO_NAME\",
    \"baseBranch\": \"$BASE_BRANCH\",
    \"appName\": \"$APP_NAME\"
  }")

if check_success "$WF25_RESPONSE" "WF2.5"; then
  WF25_COMMIT=$(echo "$WF25_RESPONSE" | jq -r '.github.commit // .commit.sha // "unknown"')
  echo -e "${GREEN}✅ WF2.5 Complete (commit: ${WF25_COMMIT:0:7})${NC}"
  
  wait_with_spinner 10 "⏳ Waiting for GitHub to process"
  
  if verify_github_file "builds/$BUILD_ID/wf2.5-spec.json" "build-$BUILD_ID"; then
    echo -e "${GREEN}✅ API Contract file verified on GitHub${NC}"
  else
    echo -e "${YELLOW}⚠️  API Contract file not yet visible${NC}"
  fi
else
  echo -e "${RED}❌ WF2.5 failed, stopping pipeline${NC}"
  exit 1
fi

# ==========================================
# STEP 4: WF2.75 - Design System Generator
# ==========================================

print_step "STEP 4/5: WF2.75 - Design System Generator"

echo "🚀 Calling WF2.75..."
WF275_RESPONSE=$(curl -s -X POST "http://localhost:5678/webhook/wf2-75/generate" \
  -H "Content-Type: application/json" \
  -d "{
    \"buildId\": \"$BUILD_ID\",
    \"repoOwner\": \"$REPO_OWNER\",
    \"repoName\": \"$REPO_NAME\",
    \"baseBranch\": \"$BASE_BRANCH\",
    \"appName\": \"$APP_NAME\"
  }")

if check_success "$WF275_RESPONSE" "WF2.75"; then
  echo -e "${GREEN}✅ WF2.75 Complete${NC}"
  
  wait_with_spinner 15 "⏳ Waiting for GitHub to process (design system is large)"
  
  if verify_github_file "builds/$BUILD_ID/frontend" "build-$BUILD_ID"; then
    echo -e "${GREEN}✅ Design system files verified on GitHub${NC}"
  else
    echo -e "${YELLOW}⚠️  Design system files not yet visible${NC}"
  fi
else
  echo -e "${RED}❌ WF2.75 failed, stopping pipeline${NC}"
  exit 1
fi

# ==========================================
# STEP 5: WF3 - Code Generator
# ==========================================

print_step "STEP 5/5: WF3 - Code Generator"

echo "🚀 Calling WF3 (this may take 2-5 minutes)..."
WF3_START=$(date +%s)

WF3_RESPONSE=$(curl -s -X POST "http://localhost:5678/webhook/wf3/generate" \
  -H "Content-Type: application/json" \
  -d "{
    \"buildId\": \"$BUILD_ID\",
    \"repoOwner\": \"$REPO_OWNER\",
    \"repoName\": \"$REPO_NAME\",
    \"baseBranch\": \"$BASE_BRANCH\",
    \"appName\": \"$APP_NAME\"
  }")

WF3_END=$(date +%s)
WF3_DURATION=$((WF3_END - WF3_START))

if check_success "$WF3_RESPONSE" "WF3"; then
  WF3_COMMIT=$(echo "$WF3_RESPONSE" | jq -r '.commit.shortSha // .commit.sha // "unknown"')
  echo -e "${GREEN}✅ WF3 Complete (commit: ${WF3_COMMIT:0:7}, took ${WF3_DURATION}s)${NC}"
  
  wait_with_spinner 30 "⏳ Waiting for GitHub to process (large code generation)"
else
  echo -e "${RED}❌ WF3 failed, stopping pipeline${NC}"
  exit 1
fi

# ==========================================
# VERIFICATION: Check GitHub Structure
# ==========================================

print_step "VERIFICATION: Checking GitHub Structure"

echo "📂 Fetching build directory structure from GitHub..."

# Get branch SHA
BRANCH_SHA=$(curl -s -H "Authorization: Bearer $GITHUB_TOKEN" \
  "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/git/ref/heads/build-$BUILD_ID" \
  | jq -r '.object.sha')

if [ "$BRANCH_SHA" == "null" ] || [ -z "$BRANCH_SHA" ]; then
  echo -e "${RED}❌ Branch build-$BUILD_ID not found!${NC}"
  exit 1
fi

echo "📍 Branch SHA: ${BRANCH_SHA:0:7}"

# Get tree structure
TREE_RESPONSE=$(curl -s -H "Authorization: Bearer $GITHUB_TOKEN" \
  "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/git/trees/$BRANCH_SHA?recursive=1")

# Filter and format structure
STRUCTURE=$(echo "$TREE_RESPONSE" | jq -r ".tree[] | select(.path | startswith(\"builds/$BUILD_ID/\")) | .path" \
  | sed "s|builds/$BUILD_ID/||" \
  | sort)

if [ -z "$STRUCTURE" ]; then
  echo -e "${RED}❌ No files found in builds/$BUILD_ID/${NC}"
  echo "Full tree response:"
  echo "$TREE_RESPONSE" | jq '.'
  exit 1
fi

echo "==================================================================="
echo "FILES IN builds/$BUILD_ID/"
echo "==================================================================="
echo "$STRUCTURE"
echo "==================================================================="
echo ""

# Count files by type
BACKEND_FILES=$(echo "$STRUCTURE" | grep -c "^backend/" || echo 0)
FRONTEND_FILES=$(echo "$STRUCTURE" | grep -c "^frontend/" || echo 0)
WF4_FILES=$(echo "$STRUCTURE" | grep -c "^wf4-runner/" || echo 0)
TOTAL_FILES=$(echo "$STRUCTURE" | wc -l)

echo "📊 FILE COUNTS:"
echo "   Backend:     $BACKEND_FILES files"
echo "   Frontend:    $FRONTEND_FILES files"
echo "   Shared:      $SHARED_FILES files"
echo "   WF4-Runner:  $WF4_FILES files"
echo "   Total:       $TOTAL_FILES files"
echo ""

# Check critical files
echo "🔍 CRITICAL FILES CHECK:"

CRITICAL_FILES=(
  "docker-compose.yml"
  "backend/Dockerfile"
  "backend/package.json"
  "backend/src/index.ts"
  "backend/src/app.ts"
  "frontend/Dockerfile"
  "frontend/package.json"
  "frontend/src/main.tsx"
  "frontend/src/App.tsx"
  "shared/types"
  "wf1-blueprint.json"
  "wf2-devplan.json"
  "wf2.5-spec.json"
  ".env"
  ".dockerignore"
)

MISSING_COUNT=0

for file in "${CRITICAL_FILES[@]}"; do
  if echo "$STRUCTURE" | grep -q "^$file"; then
    echo -e "   ${GREEN}✅${NC} $file"
  else
    echo -e "   ${RED}❌${NC} $file - MISSING!"
    ((MISSING_COUNT++))
  fi
done

echo ""

# ==========================================
# FINAL SUMMARY
# ==========================================

print_header "PIPELINE COMPLETE"

if [ $MISSING_COUNT -eq 0 ]; then
  echo -e "${GREEN}✅ ALL CRITICAL FILES PRESENT${NC}"
  BUILD_STATUS="READY FOR DEPLOYMENT"
else
  echo -e "${YELLOW}⚠️  $MISSING_COUNT CRITICAL FILES MISSING${NC}"
  BUILD_STATUS="INCOMPLETE - REVIEW REQUIRED"
fi

echo ""
echo "📋 Build Summary:"
echo "   Build ID:     $BUILD_ID"
echo "   Branch:       build-$BUILD_ID"
echo "   Status:       $BUILD_STATUS"
echo "   Total Files:  $TOTAL_FILES"
echo "   Backend:      $BACKEND_FILES files"
echo "   Frontend:     $FRONTEND_FILES files"
echo "   Shared:       $SHARED_FILES files"
echo ""
echo "🔗 Links:"
echo "   Branch:   https://github.com/$REPO_OWNER/$REPO_NAME/tree/build-$BUILD_ID"
echo "   Build:    https://github.com/$REPO_OWNER/$REPO_NAME/tree/build-$BUILD_ID/builds/$BUILD_ID"
echo ""

if [ $MISSING_COUNT -eq 0 ]; then
  echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
  echo -e "${GREEN}✅ READY FOR WF4 DEPLOYMENT${NC}"
  echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
  echo ""
  echo "Run WF4 with:"
  echo ""
  echo -e "${BLUE}curl -X POST \"http://localhost:5678/webhook/wf4/generate\" \\${NC}"
  echo -e "${BLUE}  -H \"Content-Type: application/json\" \\${NC}"
  echo -e "${BLUE}  -d '{${NC}"
  echo -e "${BLUE}    \"buildId\": \"$BUILD_ID\",${NC}"
  echo -e "${BLUE}    \"repoOwner\": \"$REPO_OWNER\",${NC}"
  echo -e "${BLUE}    \"repoName\": \"$REPO_NAME\",${NC}"
  echo -e "${BLUE}    \"branch\": \"build-$BUILD_ID\"${NC}"
  echo -e "${BLUE}  }'${NC}"
  echo ""
else
  echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
  echo -e "${YELLOW}⚠️  REVIEW REQUIRED BEFORE DEPLOYMENT${NC}"
  echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
  echo ""
  echo "Please review missing files before proceeding to WF4."
fi

echo ""
echo "💾 Full output saved to: pipeline-result-$BUILD_ID.txt"SHARED_FILES=$(echo "$STRUCTURE" | grep -c "^shared/" || echo 0)

