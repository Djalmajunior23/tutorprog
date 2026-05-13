#!/usr/bin/env bash
set -euo pipefail

# Fluxo enxuto para atualizar branch sem "lixo" de automações destrutivas.
# Uso:
#   bash scripts/push-update.sh

branch="$(git branch --show-current)"
if [[ -z "$branch" ]]; then
  echo "Erro: branch atual não encontrada."
  exit 1
fi

if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "Erro: há mudanças locais não commitadas."
  echo "Faça commit antes de executar este script."
  exit 1
fi

echo "[1/4] Atualizando refs remotas..."
git fetch origin

echo "[2/4] Rebase em origin/${branch}..."
if ! git rebase "origin/${branch}"; then
  echo "Conflito detectado. Resolva manualmente, depois rode:"
  echo "  git add <arquivos>"
  echo "  git rebase --continue"
  echo "Depois execute novamente: bash scripts/push-update.sh"
  exit 1
fi

echo "[3/4] Executando checks..."
bash scripts/premerge-check.sh

echo "[4/4] Enviando para GitHub..."
git push origin "$branch"

echo "Push concluído sem conflito."
