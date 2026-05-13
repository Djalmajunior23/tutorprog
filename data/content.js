
const MODULOS = [
  {
    id: 'mod-1',
    titulo: 'Lógica e algoritmos',
    descricao: 'Base para resolver problemas em qualquer linguagem.',
    pseudo: 'ESCREVA("Passo a passo de um problema")',
    comparacao: {
      csharp: 'Console.WriteLine("Passo a passo de um problema");',
      java: 'System.out.println("Passo a passo de um problema");',
      javascript: 'console.log("Passo a passo de um problema");',
      python: 'print("Passo a passo de um problema")'
    },
    atividade: 'Crie um algoritmo para mostrar seu nome e idade.'
  },
  {
    id: 'mod-2',
    titulo: 'Variáveis e tipos',
    descricao: 'Como armazenar dados em diferentes linguagens.',
    pseudo: 'VAR nome:CARACTERE\nVAR idade:INTEIRO',
    comparacao: {
      csharp: 'string nome = "Ana";\nint idade = 16;',
      java: 'String nome = "Ana";\nint idade = 16;',
      javascript: 'let nome = "Ana";\nlet idade = 16;',
      python: 'nome = "Ana"\nidade = 16'
    },
    atividade: 'Declare 3 variáveis: produto, quantidade e preço.'
  },
  {
    id: 'mod-3',
    titulo: 'Condicionais',
    descricao: 'Tomada de decisão com SE/ENTÃO e equivalentes.',
    pseudo: 'SE media >= 6 ENTAO\n  ESCREVA("Aprovado")\nSENAO\n  ESCREVA("Recuperação")\nFIM_SE',
    comparacao: {
      csharp: 'if (media >= 6) Console.WriteLine("Aprovado"); else Console.WriteLine("Recuperação");',
      java: 'if (media >= 6) System.out.println("Aprovado"); else System.out.println("Recuperação");',
      javascript: 'if (media >= 6) console.log("Aprovado"); else console.log("Recuperação");',
      python: 'print("Aprovado") if media >= 6 else print("Recuperação")'
    },
    atividade: 'Faça uma verificação de maioridade.'
  },
  {
    id: 'mod-4',
    titulo: 'Laços de repetição',
    descricao: 'Repita comandos com PARA/ENQUANTO em múltiplas linguagens.',
    pseudo: 'PARA i DE 1 ATE 5 FACA\n  ESCREVA(i)\nFIM_PARA',
    comparacao: {
      csharp: 'for (int i = 1; i <= 5; i++) Console.WriteLine(i);',
      java: 'for (int i = 1; i <= 5; i++) System.out.println(i);',
      javascript: 'for (let i = 1; i <= 5; i++) console.log(i);',
      python: 'for i in range(1, 6):\n    print(i)'
    },
    atividade: 'Mostre os números pares de 2 até 20.'
  },
  {
    id: 'mod-5',
    titulo: 'Funções e reutilização',
    descricao: 'Criando blocos reutilizáveis em diferentes sintaxes.',
    pseudo: 'FUNCAO media(a, b)\n  RETORNE (a+b)/2\nFIM_FUNCAO',
    comparacao: {
      csharp: 'double Media(double a, double b) => (a + b) / 2;',
      java: 'double media(double a, double b) { return (a + b) / 2; }',
      javascript: 'const media = (a, b) => (a + b) / 2;',
      python: 'def media(a, b):\n    return (a + b) / 2'
    },
    atividade: 'Crie uma função para calcular desconto de um produto.'
  }
];

const EXEMPLOS = {
  'Olá mundo': 'ALGORITMO "Olá"\nINICIO\nESCREVA("Olá mundo!")\nFIM',
  'Cadastro de aluno': 'ALGORITMO "Cadastro"\nVAR nome:CARACTERE\nINICIO\nnome <- "Ana"\nESCREVA("Aluno: ", nome)\nFIM',
  'Cálculo de média': 'ALGORITMO "Média"\nVAR n1:INTEIRO\nVAR n2:INTEIRO\nINICIO\nn1 <- 8\nn2 <- 6\nESCREVA((n1+n2)/2)\nFIM',
  'Verificação de aprovação': 'ALGORITMO "Aprovação"\nVAR media:INTEIRO\nINICIO\nmedia <- 7\nSE media >= 6 ENTAO\n  ESCREVA("Aprovado")\nSENAO\n  ESCREVA("Recuperação")\nFIM_SE\nFIM',
  'Tabuada': 'ALGORITMO "Tabuada"\nVAR i:INTEIRO\nINICIO\nPARA i DE 1 ATE 10 FACA\nESCREVA(5*i)\nFIM_PARA\nFIM',
  'Contador': 'ALGORITMO "Contador"\nVAR i:INTEIRO\nINICIO\ni <- 1\nENQUANTO i <= 5 FACA\nESCREVA(i)\ni <- i+1\nFIM_ENQUANTO\nFIM',
  'Vetor de notas': 'ALGORITMO "Notas"\nINICIO\nESCREVA("Vetor[0] = 8")\nFIM',
  'Função de média': 'ALGORITMO "FuncaoMedia"\nINICIO\nESCREVA("Função média simulada")\nFIM',
  'Python: média simples': 'nota1 = 8\nnota2 = 7\nmedia = (nota1 + nota2) / 2\nprint(media)',
  'JavaScript: contador': 'for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}',
  'C#: condição': 'int idade = 18;\nif (idade >= 18) Console.WriteLine("Maior de idade");'
};