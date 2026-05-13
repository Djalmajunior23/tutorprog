#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

# Verificações simples e estáticas de acessibilidade

echo "[a11y] verificando atributo lang no HTML..."
grep -q '<html lang="pt-BR">' index.html || { echo "index.html sem lang=pt-BR"; exit 1; }

echo "[a11y] verificando textarea com aria-label..."
grep -q 'id="editor"' index.html && grep -q 'aria-label="Editor de pseudolinguagem"' index.html || { echo "Editor sem aria-label"; exit 1; }

echo "[a11y] verificando botões com texto..."
if grep -n '<button[^>]*></button>' index.html; then
  echo "Há botões vazios em index.html"
  exit 1
fi

echo "Accessibility check concluído com sucesso."
