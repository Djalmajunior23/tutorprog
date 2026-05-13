#!/usr/bin/env bash
set -euo pipefail

# Uso:
#   bash scripts/push-update.sh           # modo seguro (rebase + push)
#   bash scripts/push-update.sh --replace # substitui tudo no remoto (force)

mode="safe"
if [[ "${1:-}" == "--replace" ]]; then
  mode="replace"
fi

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

if [[ "$mode" == "replace" ]]; then
  echo "Modo replace: sobrescrevendo origin/${branch}..."
  bash scripts/replace-repository-history.sh origin "$branch"
  exit 0
fi

echo "Modo safe: sincronizando com origin/${branch} via rebase..."
git fetch origin
if ! git rebase "origin/${branch}"; then
  echo
  echo "Conflito detectado no rebase. Tentando resolvedor automático..."
  if bash scripts/resolve-portal-conflicts.sh; then
    if git rebase --continue; then
      echo "Conflitos recorrentes resolvidos automaticamente."
    else
      echo "Ainda há conflitos manuais. Resolva e rode: git rebase --continue"
      exit 1
    fi
  else
    echo "Falha no resolvedor automático."
    echo "Opção A: resolver manualmente e rodar: git rebase --continue"
    echo "Opção B: sobrescrever remoto: bash scripts/push-update.sh --replace"
    exit 1
  fi
fi

echo "Rodando validações..."
bash scripts/premerge-check.sh

echo "Enviando para GitHub..."
git push origin "$branch"

echo "Push concluído sem conflito."
