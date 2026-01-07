#!/bin/bash

# Kleuren voor output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

BUILD_ID="todo-$(date +%s)"
REPO_OWNER="AnouarY02"
REPO_NAME="ai-todo-app"

echo -e "${BLUE}════════════════════════════════════════${NC}"
echo -e "${BLUE}  AI-FABRIEK: PROMPT → RUNNING APP${NC}"
echo -e "${BLUE}════════════════════════════════════════${NC}"
echo ""
echo "📦 Build ID: $BUILD_ID"
echo "👤 Repo: $REPO_OWNER/$REPO_NAME"
echo ""

# ========================================
# STAP 1: WF3 - CODE GENERATIE
# ========================================
echo -e "${GREEN}🔨 STAP 1: Generating code...${NC}"

WF3_RESPONSE=$(curl -s -X POST http://localhost:5678/webhook/wf3/build2 \
  -H "Content-Type: application/json" \
  -d "{
    \"meta\": {
      \"buildId\": \"$BUILD_ID\",
      \"repoOwner\": \"$REPO_OWNER\",
      \"repoName\": \"$REPO_NAME\",
      \"appName\": \"Simple Todo\"
    },
    \"devplan\": {
      \"description\": \"A simple todo list application\",
      \"features\": [
        \"Create, read, update, delete todos\",
        \"Mark todos as complete/incomplete\",
        \"Filter by status (all/active/completed)\",
        \"Clean and simple UI\"
      ],
      \"files\": []
    },
    \"blueprint\": {
      \"entities\": [
        {
          \"name\": \"Todo\",
          \"fields\": [\"id\", \"title\", \"completed\", \"createdAt\", \"updatedAt\"]
        }
      ]
    }
  }")

echo "$WF3_RESPONSE" | jq '.'

COMMIT_SHA=$(echo "$WF3_RESPONSE" | jq -r '.commit.sha // empty')

if [ -z "$COMMIT_SHA" ]; then
  echo "❌ WF3 failed - no commit SHA"
  exit 1
fi

echo ""
echo "✅ Code generated and pushed to GitHub"
echo "   Commit: $COMMIT_SHA"
echo "   Branch: build-$BUILD_ID"
echo ""

# ========================================
# STAP 2: WACHT 5 SECONDEN
# ========================================
echo -e "${GREEN}⏳ Waiting 5 seconds before build...${NC}"
sleep 5

# ========================================
# STAP 3: WF4 - BUILD & DEPLOY
# ========================================
echo -e "${GREEN}🏗️  STAP 2: Building and deploying...${NC}"

WF4_RESPONSE=$(curl -s -X POST http://localhost:5678/webhook/wf4/build \
  -H "Content-Type: application/json" \
  -d "{
    \"meta\": {
      \"buildId\": \"$BUILD_ID\",
      \"repoOwner\": \"$REPO_OWNER\",
      \"repoName\": \"$REPO_NAME\",
      \"branch\": \"build-$BUILD_ID\",
      \"mode\": \"rebuild\"
    }
  }")

echo "$WF4_RESPONSE" | jq '.'

# ========================================
# RESULTAAT
# ========================================
echo ""
echo -e "${BLUE}════════════════════════════════════════${NC}"

STATUS=$(echo "$WF4_RESPONSE" | jq -r '.status // "UNKNOWN"')

if [ "$STATUS" = "PASS" ]; then
  FRONTEND_URL=$(echo "$WF4_RESPONSE" | jq -r '.frontendUrl')
  BACKEND_URL=$(echo "$WF4_RESPONSE" | jq -r '.backendUrl')
  
  echo -e "${GREEN}✅ SUCCESS!${NC}"
  echo ""
  echo "🌐 Frontend: $FRONTEND_URL"
  echo "🔌 Backend:  $BACKEND_URL"
  echo ""
  echo "Try it now:"
  echo "  open $FRONTEND_URL"
else
  echo -e "❌ BUILD FAILED"
  echo "   Status: $STATUS"
  echo "   Check n8n logs for details"
fi

echo -e "${BLUE}════════════════════════════════════════${NC}"
