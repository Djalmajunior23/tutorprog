#!/usr/bin/env bash
set -euo pipefail

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Erro: execute dentro de um repositório git."
  exit 1
fi

current_branch="$(git branch --show-current)"
if [[ -z "$current_branch" ]]; then
  echo "Erro: não foi possível identificar a branch atual."
  exit 1
fi

if [[ "$current_branch" == "main" ]]; then
  echo "Erro: troque para a branch do PR antes de sincronizar."
  exit 1
fi

if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "Erro: há alterações locais não commitadas. Faça commit/stash antes."
  exit 1
fi

echo "[1/4] Atualizando referências remotas..."
git fetch origin

echo "[2/4] Rebase de ${current_branch} em origin/main..."
if ! git rebase origin/main; then
  echo
  echo "Conflitos detectados. Resolva os arquivos, depois rode:"
  echo "  git add <arquivos-resolvidos>"
  echo "  git rebase --continue"
  echo
  echo "Para desistir do rebase:"
  echo "  git rebase --abort"
  exit 1
fi

echo "[3/4] Executando validações locais..."
bash scripts/premerge-check.sh

echo "[4/4] Pronto. Faça push da branch atual:"
echo "  git push --force-with-lease"
