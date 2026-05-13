const TRILHAS = [
  ['Fundamentos da lógica','Iniciante',100],['Variáveis e tipos','Iniciante',120],['Entrada e saída','Iniciante',120],['Condicionais','Intermediário',150],['Laços de repetição','Intermediário',150],['Vetores','Intermediário',170],['Funções','Avançado',180],['Revisão geral','Intermediário',130],['Desafios estilo SAEP','Avançado',220],['Laboratório livre','Livre',80]
].map((t,i)=>({id:`trilha-${i+1}`,titulo:t[0],descricao:`Trilha sobre ${t[0].toLowerCase()}.`,dificuldade:t[1],xp:t[2]}));
