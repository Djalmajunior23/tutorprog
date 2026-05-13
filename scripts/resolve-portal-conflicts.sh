#!/usr/bin/env bash
set -euo pipefail

# Resolve conflitos recorrentes do portal durante rebase/merge.
# Uso (durante conflito):
#   bash scripts/resolve-portal-conflicts.sh
# Depois:
#   git rebase --continue   (ou finalize merge)

FILES_CURRENT=(
  "index.html"
  "data/content.js"
  "js/app.js"
  "js/portal.js"
  "js/pseudo.js"
)

FILE_BOTH="README.md"

resolve_if_conflicted() {
  local mode="$1"
  local file="$2"

  if git ls-files -u -- "$file" | grep -q .; then
    echo "- Resolvendo ${file} (${mode})"
    if [[ "$mode" == "current" ]]; then
      git checkout --ours -- "$file"
    elif [[ "$mode" == "incoming" ]]; then
      git checkout --theirs -- "$file"
    else
      # both/manual: mantém versão current como base e concatena incoming no fim.
      ours_file="$(mktemp)"
      theirs_file="$(mktemp)"
      git show ":2:$file" > "$ours_file"
      git show ":3:$file" > "$theirs_file"
      {
        cat "$ours_file"
        echo
        echo "\n---\nTrecho adicional (incoming):\n"
        cat "$theirs_file"
      } > "$file"
      rm -f "$ours_file" "$theirs_file"
    fi
    git add "$file"
  else
    echo "- ${file} sem conflito"
  fi
}

echo "Aplicando resolução padrão de conflitos do portal..."
for f in "${FILES_CURRENT[@]}"; do
  resolve_if_conflicted current "$f"
done
resolve_if_conflicted both "$FILE_BOTH"

echo "Conflitos processados."
echo "Próximo passo: git rebase --continue  (ou commit de merge)"
