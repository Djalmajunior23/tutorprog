window.Professor = {
 exportar(state){
  const payload={nome:state.perfil.nome,turma:state.perfil.turma,xp:state.xp,modulosConcluidos:state.modulosConcluidos,desafiosConcluidos:state.desafiosConcluidos,conquistas:state.conquistas,dataExportacao:new Date().toISOString()};
  const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='progresso-aluno.json'; a.click();
 },
 copiarDesafios(){ navigator.clipboard?.writeText(DESAFIOS.map(d=>`- ${d.titulo}`).join('\n')); }
};
