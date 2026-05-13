# Portal Interativo de Programação — Prof. Djalma

Portal educacional interativo para ensino de lógica, pseudolinguagem, C# e Java para iniciantes.

## Objetivo pedagógico
Promover aprendizagem prática e gamificada com trilhas, módulos, desafios e laboratório livre.

## Tecnologias
- HTML5
- CSS3
- JavaScript puro
- LocalStorage

## Estrutura
- `index.html`, `404.html`, `.htaccess`
- `css/style.css`
- `js/*.js`
- `data/*.js`
- `assets/`

## Executar localmente
Basta abrir `index.html` no navegador.

## Publicar no GitHub
```bash
git init
git add .
git commit -m "feat: cria portal interativo de programacao"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git
git push -u origin main
```
GitHub Pages: **Settings > Pages > Deploy from a branch > main > /root > Save**.

## Publicar no HostGator
Envie os arquivos diretamente para `public_html/`:

```txt
public_html/
├── index.html
├── 404.html
├── .htaccess
├── css/
├── js/
├── data/
└── assets/
```

## Recursos do sistema
- Perfil local do aluno
- Trilhas e módulos
- Laboratório com interpretador de pseudolinguagem
- Desafios com feedback
- XP, missões, conquistas
- Ranking local
- Área do professor com exportação JSON

## Evoluções futuras
Pontos de extensão preparados para Firebase/Supabase, login, ranking em nuvem, relatórios pedagógicos e IA.

**Autor:** Prof. Djalma Batista Barbosa Junior


## Branch protection (GitHub)

Para impedir merge com build quebrado, configure **Require status checks to pass** usando o check do workflow `Pre-merge Check`.

### Opção 1 (UI)
1. GitHub > Settings > Branches > Add branch protection rule
2. Branch name pattern: `main`
3. Marque:
   - Require a pull request before merging
   - Require approvals (1)
   - Require status checks to pass before merging
4. Em status checks, selecione: **`Pre-merge Check / validate`**

### Opção 2 (CLI automatizado)
```bash
bash scripts/configure-branch-protection.sh SEU_USUARIO/SEU_REPO main
```

> Requer GitHub CLI (`gh`) autenticado (`gh auth login`).


## Resolver conflitos de merge (PR)
Se o GitHub mostrar **"This branch has conflicts that must be resolved"**, siga:

```bash
bash scripts/sync-with-main.sh
```

Se houver conflito durante o rebase:

1. Abra os arquivos com conflito e remova marcadores `<<<<<<<`, `=======`, `>>>>>>>`.
2. Execute:

```bash
git add <arquivos>
git rebase --continue
```

3. Ao terminar, envie a branch:

```bash
git push --force-with-lease
```

Dica: rode `bash scripts/premerge-check.sh` antes de abrir/atualizar PR.


## Atualização substituindo tudo (sem merge)
Se você **realmente** quiser que cada atualização substitua tudo no repositório (apagando histórico da branch), use:

```bash
bash scripts/replace-repository-history.sh origin main
```

Esse script cria um commit snapshot do estado atual e faz `push --force` para a branch de destino.

> ⚠️ Atenção: isso remove o histórico anterior da branch publicada. Use somente se esse for o fluxo desejado.




### Resolver os 6 conflitos recorrentes automaticamente
Durante um rebase/merge com conflito, rode:

```bash
bash scripts/resolve-portal-conflicts.sh
```

Depois finalize:

```bash
git rebase --continue
```

> O script aplica a estratégia padrão do portal: manter `index.html`, `data/content.js`, `js/app.js`, `js/portal.js`, `js/pseudo.js` da branch atual e combinar `README.md`.

## Push para GitHub sem conflito
Use um comando único:

```bash
bash scripts/push-update.sh
```

Esse fluxo faz `fetch + rebase + checks + push` e, se detectar os conflitos recorrentes do portal, tenta `scripts/resolve-portal-conflicts.sh` automaticamente.

Se você quiser ignorar histórico e substituir tudo no remoto:

```bash
bash scripts/push-update.sh --replace
```
