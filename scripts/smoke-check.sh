#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "[smoke] validando arquivos essenciais..."
[[ -f index.html ]] || { echo "index.html ausente"; exit 1; }
[[ -f js/app.js ]] || { echo "js/app.js ausente"; exit 1; }
[[ -f css/style.css ]] || { echo "css/style.css ausente"; exit 1; }

echo "[smoke] validando seções principais da interface..."
for id in trilhas modulos laboratorio desafios ranking professor; do
  grep -q "id=\"$id\"" index.html || { echo "Seção '$id' não encontrada em index.html"; exit 1; }
  echo "  OK seção $id"
done

echo "[smoke] validando scripts carregados no HTML..."
for src in "js/pseudo.js" "js/portal.js" "js/app.js"; do
  grep -q "$src" index.html || { echo "Script '$src' não referenciado em index.html"; exit 1; }
  echo "  OK script $src"
done

echo "Smoke check concluído com sucesso."
