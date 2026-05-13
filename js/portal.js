window.Portal = (() => {
  const KEY = 'portalStateV1';

  const initial = {
    schemaVersion: 1,
    perfil: {
      nome: 'Aluno',
      turma: '',
      avatar: '🧑‍💻'
    },
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
    try {
      return JSON.parse(raw);
    } catch {
      return {};
    }
  }

  function asArray(value) {
    return Array.isArray(value) ? value : [];
  }

  function asNumber(value, fallback = 0) {
    const n = Number(value);
    return Number.isFinite(n) ? n : fallback;
  }

  function asBool(value, fallback = false) {
    return typeof value === 'boolean' ? value : fallback;
  }

  function normalize(state = {}) {
    return {
      ...initial,
      ...state,
      schemaVersion: 1,
      perfil: {
        ...initial.perfil,
        ...(state.perfil || {})
      },
      xp: asNumber(state.xp, 0),
      execucoes: asNumber(state.execucoes, 0),
      usouLab: asBool(state.usouLab, false),
      modulosConcluidos: asArray(state.modulosConcluidos),
      desafiosConcluidos: asArray(state.desafiosConcluidos),
      trilhasConcluidas: asArray(state.trilhasConcluidas),
      conquistas: asArray(state.conquistas)
    };
  }

  function load() {
    const saved = safeParse(localStorage.getItem(KEY) || '{}');
    return normalize(saved);
  }

  function save(state) {
    localStorage.setItem(KEY, JSON.stringify(normalize(state)));
  }

  return {
    KEY,
    initial,
    load,
    save
  };
})();