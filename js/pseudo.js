window.Pseudo = (() => {
  function normalizeExpr(expr) {
    return expr
      .replace(/\bE\b/gi, '&&')
      .replace(/\bOU\b/gi, '||')
      .replace(/\bNAO\b/gi, '!')
      .replace(/\bVERDADEIRO\b/gi, 'true')
      .replace(/\bFALSO\b/gi, 'false')
      .replace(/([^<>!])=([^=])/g, '$1==$2');
  }

  function splitArgs(source) {
    const args = [];
    let cur = '';
    let depth = 0;
    let quote = null;

    for (let i = 0; i < source.length; i++) {
      const ch = source[i];
      if ((ch === '"' || ch === "'") && source[i - 1] !== '\\') {
        if (!quote) quote = ch;
        else if (quote === ch) quote = null;
        cur += ch;
        continue;
      }
      if (!quote) {
        if (ch === '(') depth++;
        if (ch === ')') depth--;
        if (ch === ',' && depth === 0) {
          args.push(cur.trim());
          cur = '';
          continue;
        }
      }
      cur += ch;
    }
    if (cur.trim()) args.push(cur.trim());
    return args;
  }

  function evalExpr(expr, vars) {
    const normalized = normalizeExpr(expr);
    const safe = normalized.replace(/[A-Za-z_][\w]*/g, m => (m in vars ? JSON.stringify(vars[m]) : m));
    return Function(`"use strict"; return (${safe});`)();
  }

  function executeLines(lines, vars, out) {
    for (let i = 0; i < lines.length; i++) {
      const l = lines[i];
      if (/^(ALGORITMO|VAR|INICIO|INÍCIO|FIM|ENTAO|ENTÃO|FACA|FAÇA|FIM_SE|FIM_PARA|FIM_ENQUANTO)/i.test(l)) continue;

      if (/^ESCREVA\(/i.test(l)) {
        const inside = l.match(/^ESCREVA\((.*)\)$/i)?.[1] ?? '';
        const values = splitArgs(inside).map(part => evalExpr(part, vars));
        out.push(values.join(' '));
        continue;
      }

      if (/^LEIA\(/i.test(l)) {
        const m = l.match(/^LEIA\((\w+)\s*:\s*(.*)\)$/i);
        if (m) vars[m[1]] = evalExpr(m[2], vars);
        continue;
      }

      if (l.includes('<-')) {
        const [v, e] = l.split('<-').map(s => s.trim());
        vars[v] = evalExpr(e, vars);
        continue;
      }

      if (/^SE /i.test(l)) {
        const m = l.match(/^SE\s+(.*)\s+ENTAO$|^SE\s+(.*)\s+ENTÃO$/i);
        const condition = m?.[1] || m?.[2];
        if (!condition) throw Error(`Erro de sintaxe na linha ${i + 1}`);
        if (!evalExpr(condition, vars)) {
          while (i < lines.length && !/^SENAO$|^SENÃO$|^FIM_SE$/i.test(lines[i])) i++;
        }
        continue;
      }

      if (/^SENAO$|^SENÃO$/i.test(l)) {
        while (i < lines.length && !/^FIM_SE$/i.test(lines[i])) i++;
        continue;
      }

      if (/^PARA /i.test(l)) {
        const m = l.match(/^PARA\s+(\w+)\s+DE\s+(.+)\s+ATE\s+(.+)\s+FACA$|^PARA\s+(\w+)\s+DE\s+(.+)\s+ATÉ\s+(.+)\s+FAÇA$/i);
        if (!m) throw Error(`PARA inválido na linha ${i + 1}`);
        const v = m[1] || m[4];
        const ini = m[2] || m[5];
        const fim = m[3] || m[6];
        const start = Number(evalExpr(ini, vars));
        const end = Number(evalExpr(fim, vars));
        const body = [];
        i++;
        while (i < lines.length && !/^FIM_PARA$/i.test(lines[i])) body.push(lines[i++]);
        for (let k = start; k <= end; k++) {
          vars[v] = k;
          executeLines(body, vars, out);
        }
        continue;
      }

      if (/^ENQUANTO /i.test(l)) {
        const m = l.match(/^ENQUANTO\s+(.+)\s+FACA$|^ENQUANTO\s+(.+)\s+FAÇA$/i);
        const condition = m?.[1] || m?.[2];
        if (!condition) throw Error(`ENQUANTO inválido na linha ${i + 1}`);
        const body = [];
        i++;
        while (i < lines.length && !/^FIM_ENQUANTO$/i.test(lines[i])) body.push(lines[i++]);
        let guard = 0;
        while (evalExpr(condition, vars) && guard < 500) {
          guard++;
          executeLines(body, vars, out);
        }
      }
    }
  }

  function run(code) {
    const lines = code.split(/\n+/).map(l => l.trim()).filter(Boolean);
    const out = [];
    const vars = {};
    executeLines(lines, vars, out);
    return { out, vars };
  }

  return { run };
})();
