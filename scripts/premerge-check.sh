#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "[1/5] Verificando marcadores de conflito..."
if git grep -nE "^(<<<<<<<|=======|>>>>>>>)" -- . ":(exclude)CONTRIBUTING.md" ":(exclude)scripts/premerge-check.sh" >/tmp/conflicts.txt; then
  echo "Conflitos encontrados:"
  cat /tmp/conflicts.txt
  exit 1
fi

echo "[2/5] Validando sintaxe JavaScript..."
for f in js/*.js data/*.js; do
  node -e "new Function(require('fs').readFileSync('$f','utf8'))"
  echo "  OK $f"
done

echo "[3/5] Verificando branch atual..."
current_branch="$(git branch --show-current)"
echo "  Branch: $current_branch"

echo "Pre-merge check concluído com sucesso."


echo "[4/5] Executando smoke check do portal..."
bash scripts/smoke-check.sh


echo "[5/5] Executando accessibility check..."
bash scripts/accessibility-check.sh
