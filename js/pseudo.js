window.Pseudo = (() => {
  function evalExpr(expr, vars) {
    const safe = expr.replace(/[A-Za-z_][\w]*/g, m => (m in vars ? JSON.stringify(vars[m]) : m));
    return Function(`"use strict"; return (${safe});`)();
  }
  function run(code) {
    const lines = code.split(/\n+/).map(l=>l.trim()).filter(Boolean);
    const out=[]; const vars={};
    for (let i=0;i<lines.length;i++) {
      const l = lines[i];
      if (/^(ALGORITMO|VAR|INICIO|FIM|ENTAO|FACA|FIM_SE|FIM_PARA|FIM_ENQUANTO)/i.test(l)) continue;
      if (/^ESCREVA\(/i.test(l)) { const inside=l.match(/^ESCREVA\((.*)\)$/i)?.[1] ?? ''; out.push(String(evalExpr(inside,vars))); continue; }
      if (/^LEIA\(/i.test(l)) { const m=l.match(/^LEIA\((\w+)\s*:\s*(.*)\)$/i); if(m) vars[m[1]]=evalExpr(m[2],vars); continue; }
      if (l.includes('<-')) { const [v,e]=l.split('<-').map(s=>s.trim()); vars[v]=evalExpr(e,vars); continue; }
      if (/^SE /i.test(l)) { const m=l.match(/^SE\s+(.*)\s+ENTAO$/i); if(!m) throw Error(`Erro de sintaxe na linha ${i+1}`); if(!evalExpr(m[1],vars)) { while(i<lines.length && !/^SENAO$|^FIM_SE$/i.test(lines[i])) i++; } continue; }
      if (/^SENAO$/i.test(l)) { while(i<lines.length && !/^FIM_SE$/i.test(lines[i])) i++; continue; }
      if (/^PARA /i.test(l)) { const m=l.match(/^PARA\s+(\w+)\s+DE\s+(.+)\s+ATE\s+(.+)\s+FACA$/i); if(!m) throw Error(`PARA inválido na linha ${i+1}`); const [_,v,ini,fim]=m; const start=evalExpr(ini,vars), end=evalExpr(fim,vars); const body=[]; i++; while(i<lines.length&&!/^FIM_PARA$/i.test(lines[i])) body.push(lines[i++]); for(let k=start;k<=end;k++){vars[v]=k; out.push(...run(body.join('\n')).out);} continue; }
      if (/^ENQUANTO /i.test(l)) { const m=l.match(/^ENQUANTO\s+(.+)\s+FACA$/i); const body=[]; i++; while(i<lines.length&&!/^FIM_ENQUANTO$/i.test(lines[i])) body.push(lines[i++]); let g=0; while(evalExpr(m[1],vars)&&g<100){g++; out.push(...run(body.join('\n')).out);} continue; }
    }
    return { out, vars };
  }
  return { run };
})();
