window.Pseudo = (() => {
  function normalizeExpr(expr) {
    return String(expr)
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

    const safe = normalized.replace(/[A-Za-z_][\w]*/g, match => {
      return Object.prototype.hasOwnProperty.call(vars, match)
        ? JSON.stringify(vars[match])
        : match;
    });

    return Function(`"use strict"; return (${safe});`)();
  }

  function executeLines(lines, vars, out) {
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (/^(ALGORITMO|VAR|INICIO|INÍCIO|FIM|ENTAO|ENTÃO|FACA|FAÇA|FIM_SE|FIM_PARA|FIM_ENQUANTO)$/i.test(line)) {
        continue;
      }

      if (/^ESCREVA\(/i.test(line)) {
        const inside = line.match(/^ESCREVA\((.*)\)$/i)?.[1] ?? '';
        const values = splitArgs(inside).map(part => evalExpr(part, vars));

        out.push(values.join(' '));
        continue;
      }

      if (/^LEIA\(/i.test(line)) {
        const match = line.match(/^LEIA\((\w+)\s*:\s*(.*)\)$/i);

        if (match) {
          vars[match[1]] = evalExpr(match[2], vars);
        }

        continue;
      }

      if (line.includes('<-')) {
        const [variable, expression] = line.split('<-').map(part => part.trim());

        vars[variable] = evalExpr(expression, vars);
        continue;
      }

      if (/^SE /i.test(line)) {
        const match = line.match(/^SE\s+(.*)\s+ENTAO$|^SE\s+(.*)\s+ENTÃO$/i);
        const condition = match?.[1] || match?.[2];

        if (!condition) {
          throw Error(`Erro de sintaxe na linha ${i + 1}`);
        }

        if (!evalExpr(condition, vars)) {
          while (i < lines.length && !/^SENAO$|^SENÃO$|^FIM_SE$/i.test(lines[i])) {
            i++;
          }
        }

        continue;
      }

      if (/^SENAO$|^SENÃO$/i.test(line)) {
        while (i < lines.length && !/^FIM_SE$/i.test(lines[i])) {
          i++;
        }

        continue;
      }

      if (/^PARA /i.test(line)) {
        const match = line.match(
          /^PARA\s+(\w+)\s+DE\s+(.+)\s+ATE\s+(.+)\s+FACA$|^PARA\s+(\w+)\s+DE\s+(.+)\s+ATÉ\s+(.+)\s+FAÇA$/i
        );

        if (!match) {
          throw Error(`PARA inválido na linha ${i + 1}`);
        }

        const variable = match[1] || match[4];
        const startExpr = match[2] || match[5];
        const endExpr = match[3] || match[6];

        const start = Number(evalExpr(startExpr, vars));
        const end = Number(evalExpr(endExpr, vars));

        const body = [];
        i++;

        while (i < lines.length && !/^FIM_PARA$/i.test(lines[i])) {
          body.push(lines[i]);
          i++;
        }

        for (let k = start; k <= end; k++) {
          vars[variable] = k;
          executeLines(body, vars, out);
        }

        continue;
      }

      if (/^ENQUANTO /i.test(line)) {
        const match = line.match(/^ENQUANTO\s+(.+)\s+FACA$|^ENQUANTO\s+(.+)\s+FAÇA$/i);
        const condition = match?.[1] || match?.[2];

        if (!condition) {
          throw Error(`ENQUANTO inválido na linha ${i + 1}`);
        }

        const body = [];
        i++;

        while (i < lines.length && !/^FIM_ENQUANTO$/i.test(lines[i])) {
          body.push(lines[i]);
          i++;
        }

        let guard = 0;

        while (evalExpr(condition, vars) && guard < 500) {
          guard++;
          executeLines(body, vars, out);
        }

        continue;
      }
    }
  }

  function run(code) {
    const lines = String(code)
      .split(/\n+/)
      .map(line => line.trim())
      .filter(Boolean);

    const out = [];
    const vars = {};

    executeLines(lines, vars, out);

    return {
      out,
      vars
    };
  }

  return {
    run
  };
})();
