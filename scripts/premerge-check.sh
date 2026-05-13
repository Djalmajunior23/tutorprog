#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "[1/3] Verificando marcadores de conflito..."
if git grep -nE "^(<<<<<<<|=======|>>>>>>>)" -- . ":(exclude)CONTRIBUTING.md" ":(exclude)scripts/premerge-check.sh" >/tmp/conflicts.txt; then
  echo "Conflitos encontrados:"
  cat /tmp/conflicts.txt
  exit 1
fi

echo "[2/3] Validando sintaxe JavaScript..."
for f in js/*.js data/*.js; do
  node -e "new Function(require('fs').readFileSync('$f','utf8'))"
  echo "  OK $f"
done

echo "[3/3] Verificando branch atual..."
current_branch="$(git branch --show-current)"
echo "  Branch: $current_branch"

echo "Pre-merge check concluído com sucesso."
