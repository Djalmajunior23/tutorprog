const MODULOS = [
 'Lógica e algoritmos','Pseudolinguagem','Variáveis','Tipos de dados','Entrada e saída','Operadores aritméticos','Operadores relacionais','Condicionais','Laços PARA','Laços ENQUANTO','Vetores','Funções e procedimentos'
].map((titulo,i)=>({id:`mod-${i+1}`,titulo,descricao:`Conceitos essenciais de ${titulo.toLowerCase()}.`,pseudo:'ESCREVA("Exemplo")',csharp:'Console.WriteLine("Exemplo");',java:'System.out.println("Exemplo");',atividade:'Pratique com um exemplo próprio.'}));

const EXEMPLOS = {
  'Olá mundo': 'ALGORITMO "Olá"\nINICIO\nESCREVA("Olá mundo!")\nFIM',
  'Cadastro de aluno': 'ALGORITMO "Cadastro"\nVAR nome:CARACTERE\nINICIO\nnome <- "Ana"\nESCREVA("Aluno: ", nome)\nFIM',
  'Cálculo de média': 'ALGORITMO "Média"\nVAR n1:INTEIRO\nVAR n2:INTEIRO\nINICIO\nn1 <- 8\nn2 <- 6\nESCREVA((n1+n2)/2)\nFIM',
  'Verificação de aprovação': 'ALGORITMO "Aprovação"\nVAR media:INTEIRO\nINICIO\nmedia <- 7\nSE media >= 6 ENTAO\n  ESCREVA("Aprovado")\nSENAO\n  ESCREVA("Recuperação")\nFIM_SE\nFIM',
  'Tabuada': 'ALGORITMO "Tabuada"\nVAR i:INTEIRO\nINICIO\nPARA i DE 1 ATE 10 FACA\nESCREVA(5*i)\nFIM_PARA\nFIM',
  'Contador': 'ALGORITMO "Contador"\nVAR i:INTEIRO\nINICIO\ni <- 1\nENQUANTO i <= 5 FACA\nESCREVA(i)\ni <- i+1\nFIM_ENQUANTO\nFIM',
  'Vetor de notas': 'ALGORITMO "Notas"\nINICIO\nESCREVA("Vetor[0] = 8")\nFIM',
  'Função de média': 'ALGORITMO "FuncaoMedia"\nINICIO\nESCREVA("Função média simulada")\nFIM'
};
