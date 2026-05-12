window.MISSOES = [
 {id:'m1',titulo:'Execute seu primeiro código',check:s=>s.execucoes>=1},
 {id:'m2',titulo:'Conclua 3 módulos',check:s=>s.modulosConcluidos.length>=3},
 {id:'m3',titulo:'Resolva 5 desafios',check:s=>s.desafiosConcluidos.length>=5},
 {id:'m4',titulo:'Alcance 300 XP',check:s=>s.xp>=300},
 {id:'m5',titulo:'Complete a trilha de condicionais',check:s=>s.trilhasConcluidas.includes('trilha-4')},
 {id:'m6',titulo:'Use o laboratório livre',check:s=>s.usouLab}
];
window.CONQUISTAS = [
 {id:'c1',titulo:'Primeiro Algoritmo',check:s=>s.execucoes>=1},
 {id:'c2',titulo:'Mestre das Variáveis',check:s=>s.modulosConcluidos.includes('mod-3')},
 {id:'c3',titulo:'Explorador do Laboratório',check:s=>s.usouLab},
 {id:'c4',titulo:'Campeão dos Desafios',check:s=>s.desafiosConcluidos.length>=5},
 {id:'c5',titulo:'Mestre da Lógica',check:s=>s.modulosConcluidos.length===MODULOS.length}
];
