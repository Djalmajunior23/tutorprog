#!/usr/bin/env bash
set -euo pipefail

# Uso:
#   bash scripts/replace-repository-history.sh origin main
#
# Efeito:
# - cria um commit "limpo" com o estado ATUAL do diretório
# - remove histórico da branch de destino (força substituição total)
# - envia com --force

remote="${1:-origin}"
branch="${2:-main}"

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Erro: execute dentro de um repositório git."
  exit 1
fi

if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "Erro: há alterações locais não commitadas. Commit/stash antes de continuar."
  exit 1
fi

tmp_branch="replace-all-$(date +%Y%m%d%H%M%S)"
current_branch="$(git branch --show-current)"

echo "ATENÇÃO: este processo reescreve TODO o histórico de ${remote}/${branch}."

git checkout --orphan "$tmp_branch"

# Limpa índice/worktree e restaura conteúdo do diretório de trabalho atual.
git reset --hard

# Garante que não haverá lixo de execução.
find . -name '.DS_Store' -delete

git add -A

git commit -m "chore: replace repository content snapshot $(date -u +%Y-%m-%dT%H:%M:%SZ)"

echo "Executando validações antes do push forçado..."
bash scripts/premerge-check.sh

echo "Enviando snapshot para ${remote}/${branch} com force..."
git push "$remote" "$tmp_branch:$branch" --force

git checkout "$current_branch"
git branch -D "$tmp_branch"

echo "Concluído: ${remote}/${branch} foi substituída pelo snapshot atual."
