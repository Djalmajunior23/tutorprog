# Arquitetura sugerida (evolução do portal)

## Visão de alto nível
- **Frontend estático (atual):** HTML/CSS/JS + LocalStorage.
- **Camada de domínio no browser:** regras de progresso, XP, trilhas, desafios e interpretador.
- **Futuro backend opcional:** Firebase/Supabase para autenticação, sincronização e analytics.

## Princípios arquiteturais
1. **Separação por camadas**
   - `data/`: conteúdo didático e catálogos.
   - `js/core/` (sugerido): regras de negócio puras (XP, missões, conquistas).
   - `js/adapters/` (sugerido): LocalStorage, Clipboard, Download JSON.
   - `js/ui/` (sugerido): renderização e eventos DOM.
2. **Progressive enhancement**
   - Portal funciona 100% offline/local.
   - Recursos de nuvem entram como opt-in, sem quebrar experiência local.
3. **Baixo acoplamento**
   - UI chama serviços estáveis (`ProgressService`, `ChallengeService`).
   - Serviços dependem de interfaces, não de LocalStorage diretamente.
4. **Versionamento de dados do aluno**
   - Incluir `schemaVersion` no estado salvo.
   - Criar função `migrateState(oldState)` para upgrades seguros.

## Roadmap técnico recomendado

### Fase 1 — refactor interno (sem backend)
- Extrair `app.js` em módulos:
  - `ui/dashboard.js`, `ui/lab.js`, `ui/challenges.js`, `ui/profile.js`.
  - `core/xp.js`, `core/missions.js`, `core/achievements.js`.
- Criar `StorageAdapter` com validação e fallback.
- Adicionar logs de erro amigáveis centralizados (`ErrorBus`).

### Fase 2 — qualidade e testes
- Testes unitários para regras de XP/missões (Vitest ou Jest).
- Testes E2E de fluxo básico (Playwright):
  - editar perfil;
  - concluir módulo;
  - resolver desafio;
  - exportar progresso.
- CI no GitHub Actions para lint + testes.

### Fase 3 — multi-linguagem de verdade
- Criar objeto de competências por linguagem:
  - `competencias.javascript`, `competencias.python`, `competencias.csharp`, `competencias.java`.
- Trilhas específicas por stack + trilha transversal de lógica.
- Rubrica de avaliação por habilidade (variáveis, decisão, repetição, funções).

### Fase 4 — nuvem (opcional)
- **Auth:** login de aluno/professor.
- **Sync:** progresso por usuário e turma.
- **Ranking em nuvem:** por turma e período.
- **Relatórios:** tempo por módulo, taxa de acerto, evolução semanal.

## Modelo de domínio (sugestão)
```txt
Student
  id, nome, turma, avatar
Progress
  xpTotal, modulosConcluidos[], desafiosConcluidos[], conquistas[]
Track
  id, titulo, linguagemAlvo, modulos[]
Challenge
  id, nivel, criterios[], xp, linguagemAlvo
```

## Segurança e privacidade
- Sem dados sensíveis no cliente.
- Se houver backend, aplicar:
  - regras por papel (aluno/professor);
  - LGPD: consentimento e minimização de dados;
  - backup/exportação e direito de exclusão.

## Observabilidade pedagógica (futuro)
- Eventos: `module_completed`, `challenge_attempted`, `challenge_passed`, `lab_used`.
- Dashboard do professor com indicadores de engajamento e dificuldade.

## Sugestões imediatas (alto impacto / baixo custo)
1. Criar **trilhas por linguagem** com progresso separado.
2. Melhorar o verificador de desafios com critérios múltiplos por regex.
3. Inserir botão "Comparar em outra linguagem" no laboratório.
4. Adicionar modo "aula" (tela limpa + fonte maior + timer de atividade).
