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


## Solução rápida para quando o GitHub Pages abre só o título/repositório

Se ao abrir a URL aparecer apenas algo como **"tutorprog"** (ou uma página simples), normalmente o Pages está apontando para a pasta/branch errada.

1. No GitHub, acesse **Settings > Pages**.
2. Em **Build and deployment**, selecione **Deploy from a branch**.
3. Em **Branch**, escolha **main** e pasta **/(root)** (não use `/docs` neste projeto).
4. Clique em **Save**.
5. Aguarde de 1 a 5 minutos e abra: `https://SEU_USUARIO.github.io/tutorprog/`

Checklist:
- O arquivo `index.html` deve estar na raiz do repositório.
- A URL de projeto deve incluir o nome do repositório no final (`/tutorprog/`).
- Faça um hard refresh no navegador (`Ctrl + F5`).

Este projeto também inclui `.nojekyll` para evitar processamento desnecessário do Jekyll no GitHub Pages.


## Evitar conflitos de merge

- Sempre sincronize antes de começar: `git pull --rebase origin main`.
- Evite editar os mesmos blocos em paralelo (principalmente `js/app.js`).
- Faça commits menores por tema (`feat`, `fix`, `docs`) para facilitar resolução.
- Em caso de conflito:
  1. `git status` para ver arquivos em conflito.
  2. Resolver marcadores `<<<<<<<`, `=======`, `>>>>>>>`.
  3. Validar com `node -e "new Function(require('fs').readFileSync('js/app.js','utf8'))"`.
  4. `git add . && git rebase --continue` (ou `git commit` se não estiver em rebase).
