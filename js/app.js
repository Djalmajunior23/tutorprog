(() => {
  const $ = (s, root = document) => root.querySelector(s);

  function on(selector, event, handler) {
    const el = $(selector);
    if (el) el.addEventListener(event, handler);
  }

  function escapeHtml(text) {
    return String(text)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  const state = Portal.load();
  const editor = $('#editor');
  const saida = $('#saida');

  function persist() {
    state.ultimoAcesso = new Date().toISOString();
    Portal.save(state);
    render();
  }

  function grantXP(value) {
    state.xp += Number(value) || 0;
  }

  function progressoTexto(total, done) {
    if (!total) return '0%';
    return `${Math.round((done / total) * 100)}%`;
  }

  function renderAvisos() {
    const el = $('#lista-avisos');
    if (!el || !Array.isArray(window.AVISOS)) return;

    el.innerHTML = AVISOS.map(a => `
      <article class="card aviso ${escapeHtml(a.tipo || 'geral')}">
        <h4>${escapeHtml(a.titulo)}</h4>
        <p>${escapeHtml(a.mensagem)}</p>
        <small>${escapeHtml(a.data)}</small>
      </article>
    `).join('');
  }

  function renderTrilhas() {
    const el = $('#lista-trilhas');
    if (!el || !Array.isArray(window.TRILHAS)) return;

    el.innerHTML = TRILHAS.map(t => {
      const done = state.trilhasConcluidas.includes(t.id);

      return `
        <article class="card">
          <h4>${escapeHtml(t.titulo)}</h4>
          <p>${escapeHtml(t.descricao)}</p>
          <small>${escapeHtml(t.dificuldade)} • ${Number(t.xp) || 0} XP</small>
          <p>Status: ${done ? '✅ concluída' : '🔄 pendente'}</p>
          <button class="btn" data-trilha="${escapeHtml(t.id)}">
            ${done ? 'Revisar' : 'Iniciar'}
          </button>
        </article>
      `;
    }).join('');

    el.querySelectorAll('button[data-trilha]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.trilha;

        if (id && !state.trilhasConcluidas.includes(id)) {
          state.trilhasConcluidas.push(id);
          grantXP(150);
          persist();
        }
      });
    });
  }

  function renderModulos() {
    const el = $('#lista-modulos');
    if (!el || !Array.isArray(window.MODULOS)) return;

    el.innerHTML = MODULOS.map(m => {
      const done = state.modulosConcluidos.includes(m.id);

      return `
        <article class="card">
          <h4>${escapeHtml(m.titulo)}</h4>
          <p>${escapeHtml(m.descricao)}</p>
          <pre>${escapeHtml(m.pseudo || '')}</pre>

          <details>
            <summary>Comparar linguagens</summary>
            <code>
<strong>C#</strong>
${escapeHtml(m.comparacao?.csharp || m.csharp || '-')}

<strong>Java</strong>
${escapeHtml(m.comparacao?.java || m.java || '-')}

<strong>JavaScript</strong>
${escapeHtml(m.comparacao?.javascript || m.javascript || '-')}

<strong>Python</strong>
${escapeHtml(m.comparacao?.python || m.python || '-')}
            </code>
          </details>

          <p><em>Atividade:</em> ${escapeHtml(m.atividade || 'Pratique com um exemplo próprio.')}</p>

          <button class="btn" data-mod="${escapeHtml(m.id)}">
            ${done ? 'Concluído ✅' : 'Concluir (+50 XP)'}
          </button>
        </article>
      `;
    }).join('');

    el.querySelectorAll('button[data-mod]').forEach(btn => {
      btn.addEventListener('click', () => {
        const modId = btn.dataset.mod;

        if (modId && !state.modulosConcluidos.includes(modId)) {
          state.modulosConcluidos.push(modId);
          grantXP(50);

          if (state.modulosConcluidos.length === MODULOS.length) {
            grantXP(500);
          }

          persist();
        }
      });
    });
  }

  function renderDesafios() {
    const el = $('#lista-desafios');
    if (!el || !Array.isArray(window.DESAFIOS) || !editor) return;

    el.innerHTML = DESAFIOS.map(d => `
      <article class="card">
        <h4>${escapeHtml(d.titulo)}</h4>
        <p>${escapeHtml(d.comando)}</p>
        <small>${escapeHtml(d.nivel)} • ${Number(d.xp) || 0} XP</small>
        <button class="btn" data-load="${escapeHtml(d.id)}">Carregar</button>
      </article>
    `).join('');

    el.querySelectorAll('button[data-load]').forEach(btn => {
      btn.addEventListener('click', () => {
        const d = DESAFIOS.find(x => x.id === btn.dataset.load);
        editor.value = d?.codigoInicial || '';
      });
    });
  }

  function renderGamificacao() {
    if (!Array.isArray(window.CONQUISTAS) || !Array.isArray(window.MISSOES)) return;

    state.conquistas = CONQUISTAS
      .filter(c => typeof c.check === 'function' && c.check(state))
      .map(c => c.id);

    const lc = $('#lista-conquistas');
    const lm = $('#lista-missoes');

    if (lc) {
      lc.innerHTML = CONQUISTAS.map(c => `
        <article class="card ${state.conquistas.includes(c.id) ? 'ok' : ''}">
          ${escapeHtml(c.titulo)}
        </article>
      `).join('');
    }

    if (lm) {
      lm.innerHTML = MISSOES.map(m => `
        <article class="card ${typeof m.check === 'function' && m.check(state) ? 'ok' : ''}">
          ${escapeHtml(m.titulo)}
        </article>
      `).join('');
    }

    const next = $('#proxima-missao');

    if (next) {
      next.textContent =
        MISSOES.find(m => typeof m.check === 'function' && !m.check(state))?.titulo ||
        'Todas concluídas!';
    }
  }

  function renderRanking() {
    const el = $('#lista-ranking');
    if (!el || !window.Ranking) return;

    el.innerHTML = Ranking.get()
      .map(r => `<li>${escapeHtml(r.nome)} — ${Number(r.xp) || 0} XP</li>`)
      .join('');
  }

  function renderPerfilResumo() {
    const trigger = $('#btn-editar-perfil');
    if (!trigger) return;

    trigger.textContent = `${state.perfil.avatar || '🧑‍💻'} ${state.perfil.nome || 'Aluno'}`;
  }

  function render() {
    const xp = $('#xp-total');
    const mods = $('#modulos-concluidos');

    if (xp) xp.textContent = String(state.xp);

    if (mods) {
      mods.textContent = `${state.modulosConcluidos.length} (${progressoTexto(
        window.MODULOS?.length || 0,
        state.modulosConcluidos.length
      )})`;
    }

    renderPerfilResumo();
    renderGamificacao();
    renderRanking();
  }

  on('#btn-executar', 'click', () => {
    if (!editor || !saida || !window.Pseudo) return;

    try {
      const result = Pseudo.run(editor.value);

      saida.textContent = result.out.join('\n') || 'Execução concluída sem saída.';

      state.execucoes += 1;

      if (!state.usouLab) {
        state.usouLab = true;
        grantXP(20);
      }

      persist();
    } catch (err) {
      saida.textContent = `Erro amigável: ${err.message}`;
    }
  });

  on('#btn-verificar', 'click', () => {
    if (!editor || !saida || !Array.isArray(window.DESAFIOS)) return;

    const txt = editor.value.toUpperCase();

    const d = DESAFIOS.find(x =>
      (x.criterios || []).every(c =>
        txt.includes(String(c).toUpperCase())
      )
    );

    if (d) {
      if (!state.desafiosConcluidos.includes(d.id)) {
        state.desafiosConcluidos.push(d.id);
        grantXP(d.xp);
      }

      saida.textContent = 'Muito bem! Seu algoritmo executou corretamente. Continue praticando.';
    } else {
      saida.textContent = 'Seu código executou, mas faltam critérios do desafio. Use a dica e tente novamente.';
    }

    persist();
  });

  on('#btn-limpar', 'click', () => {
    if (editor) editor.value = '';
  });

  on('#btn-copiar', 'click', () => {
    if (editor) navigator.clipboard?.writeText(editor.value);
  });

  on('#btn-salvar', 'click', () => {
    if (editor) localStorage.setItem('portalEditor', editor.value);
  });

  on('#btn-restaurar', 'click', () => {
    if (editor) editor.value = localStorage.getItem('portalEditor') || '';
  });

  const sel = $('#exemplo-select');

  if (sel && window.EXEMPLOS) {
    Object.keys(EXEMPLOS).forEach(k => {
      const o = document.createElement('option');
      o.value = k;
      o.textContent = k;
      sel.appendChild(o);
    });

    on('#btn-carregar-exemplo', 'click', () => {
      if (editor) editor.value = EXEMPLOS[sel.value] || '';
    });
  }

  on('#btn-ranking-salvar', 'click', () => {
    if (!window.Ranking) return;

    Ranking.update(state.perfil.nome, state.xp);
    renderRanking();
  });

  on('#btn-ranking-limpar', 'click', () => {
    if (!window.Ranking) return;

    Ranking.clear();
    renderRanking();
  });

  on('#btn-exportar', 'click', () => {
    if (window.Professor) Professor.exportar(state);
  });

  on('#btn-copiar-desafios', 'click', () => {
    if (window.Professor) Professor.copiarDesafios();
  });

  on('#btn-resetar', 'click', () => {
    localStorage.removeItem(Portal.KEY);
    location.reload();
  });

  const modal = $('#modal-perfil');

  on('#btn-editar-perfil', 'click', () => {
    if (!modal) return;

    const nome = $('#perfil-nome');
    const turma = $('#perfil-turma');
    const avatar = $('#perfil-avatar');

    if (nome) nome.value = state.perfil.nome || '';
    if (turma) turma.value = state.perfil.turma || '';
    if (avatar) avatar.value = state.perfil.avatar || '🧑‍💻';

    modal.showModal();
  });

  const form = $('#form-perfil');

  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();

      state.perfil = {
        nome: $('#perfil-nome')?.value || 'Aluno',
        turma: $('#perfil-turma')?.value || '',
        avatar: $('#perfil-avatar')?.value || '🧑‍💻'
      };

      modal?.close();
      persist();
    });
  }

  renderAvisos();
  renderTrilhas();
  renderModulos();
  renderDesafios();
  render();
})();