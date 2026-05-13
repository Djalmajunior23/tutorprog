#!/usr/bin/env bash
set -euo pipefail

if ! command -v gh >/dev/null 2>&1; then
  echo "GitHub CLI (gh) não encontrado. Instale: https://cli.github.com/"
  exit 1
fi

REPO="${1:-}"
BRANCH="${2:-main}"

if [[ -z "$REPO" ]]; then
  echo "Uso: bash scripts/configure-branch-protection.sh <owner/repo> [branch]"
  echo "Exemplo: bash scripts/configure-branch-protection.sh djalmajunior23/tutorprog main"
  exit 1
fi

# Exige check do workflow de pre-merge
CHECK_NAME="Pre-merge Check / validate"

gh api \
  --method PUT \
  -H "Accept: application/vnd.github+json" \
  "/repos/$REPO/branches/$BRANCH/protection" \
  -f required_status_checks.strict=true \
  -F required_status_checks.contexts[]="$CHECK_NAME" \
  -f enforce_admins=true \
  -f required_pull_request_reviews.dismiss_stale_reviews=true \
  -f required_pull_request_reviews.required_approving_review_count=1 \
  -f restrictions=

echo "Proteção aplicada em $REPO:$BRANCH com check obrigatório: $CHECK_NAME"
