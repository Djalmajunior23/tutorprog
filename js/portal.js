window.Portal = (() => {
  const KEY = 'portalStateV1';
  const initial = {
    schemaVersion: 1,
    perfil: { nome: 'Aluno', turma: '', avatar: '🧑‍💻' },
    xp: 0,
    modulosConcluidos: [],
    desafiosConcluidos: [],
    trilhasConcluidas: [],
    conquistas: [],
    execucoes: 0,
    usouLab: false,
    ultimaAtividade: '-',
    ultimoAcesso: new Date().toISOString()
  };

  function safeParse(raw) {
    try { return JSON.parse(raw); } catch { return {}; }
  }

  function load() {
    const saved = safeParse(localStorage.getItem(KEY) || '{}');
    return { ...initial, ...saved, perfil: { ...initial.perfil, ...(saved.perfil || {}) } };
  }

  function save(state) {
    localStorage.setItem(KEY, JSON.stringify({ ...state, schemaVersion: 1 }));
  }

  return { KEY, initial, load, save };
})();
