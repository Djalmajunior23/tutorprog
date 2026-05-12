window.Portal = (()=>{
const KEY='portalStateV1';
const initial={perfil:{nome:'Aluno',turma:'',avatar:'🧑‍💻'},xp:0,modulosConcluidos:[],desafiosConcluidos:[],trilhasConcluidas:[],conquistas:[],execucoes:0,usouLab:false,ultimaAtividade:'-',ultimoAcesso:new Date().toISOString()};
const load=()=>({...initial,...JSON.parse(localStorage.getItem(KEY)||'{}')});
const save=s=>localStorage.setItem(KEY,JSON.stringify(s));
return {KEY,initial,load,save};
})();
