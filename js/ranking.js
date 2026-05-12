window.Ranking = (() => {
 const KEY='portalRanking';
 const get=()=>JSON.parse(localStorage.getItem(KEY)||'[]');
 const set=v=>localStorage.setItem(KEY,JSON.stringify(v));
 function update(nome,xp){ if(!nome) return; const r=get(); const i=r.findIndex(x=>x.nome===nome); if(i>=0) r[i].xp=Math.max(r[i].xp,xp); else r.push({nome,xp}); r.sort((a,b)=>b.xp-a.xp); set(r); }
 return { get, update, clear:()=>set([]) };
})();
