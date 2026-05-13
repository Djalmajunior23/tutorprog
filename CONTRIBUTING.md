# Fluxo anti-conflito (recomendado)

## 1) Estratégia de branches
- `main`: somente código estável.
- `dev`: integração contínua.
- `feat/*`: novas funcionalidades.
- `fix/*`: correções rápidas.

### Fluxo padrão
1. Atualize local: `git checkout main && git pull --rebase origin main`
2. Crie branch: `git checkout -b feat/nome-curto`
3. Commits pequenos por assunto (`feat`, `fix`, `docs`, `refactor`).
4. Rebase frequente com main: `git fetch origin && git rebase origin/main`
5. Rode checklist antes do push (script abaixo).
6. Push e PR para `dev` (ou `main` se for hotfix).

## 2) Convenção de ownership por pasta
- `data/*`: conteúdo didático e catálogos.
- `js/*`: regras e comportamento da aplicação.
- `css/*`: tema/estilo.
- `index.html`: estrutura e layout da UI.

Regra: evite dois devs alterarem o mesmo arquivo no mesmo ciclo.

## 3) Checklist de rebase/merge
Execute sempre antes de push:

```bash
bash scripts/premerge-check.sh
```

Checklist manual:
- sem marcadores `<<<<<<<`, `=======`, `>>>>>>>`;
- sintaxe válida dos arquivos JS;
- branch atual atualizada com `origin/main`.

## 4) Resolução padrão de conflitos
1. `git status`
2. resolver arquivos com marcadores
3. validar com `bash scripts/premerge-check.sh`
4. `git add .`
5. `git rebase --continue` (se estiver em rebase)
6. `git push --force-with-lease` (após rebase)
