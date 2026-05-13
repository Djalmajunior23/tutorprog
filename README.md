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
