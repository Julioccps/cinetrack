# CineTrack

Gerenciador pessoal de listas de filmes desenvolvido para a disciplina de **Programação de Sistemas Web**.

- **Instituição:** Universidade Estadual de Maringá (UEM)
- **Departamento:** Departamento de Informática (DIN)
- **Professor:** Lucas de Oliveira Teixeira

## Alunos e RAs

- **Guilherme Mayer Chamse Ddine** - RA: `140656`
- **Julio Cesar Carvalho de Paula Souza** - RA: `138288`

## Sobre o Projeto (Parte 1)

O **CineTrack** é uma aplicação web focada no catálogo e gerenciamento pessoal de filmes. Na Parte 1 do trabalho, utilizamos apenas tecnologias web nativas.

### Tecnologias Utilizadas
- **HTML5**
- **CSS3**
- **JavaScript**

## Estrutura do Repositório

```text
cinetrack/
├── docs/               # Documentações, especificações (PDFs) e requisitos
├── img/                # Recursos visuais (logo CineTrack)
├── parte1/
│   ├── index.html      # Página principal da aplicação
│   ├── adicionar.html  # Formulário dedicado para cadastro de filmes
│   ├── sobre.html      # Página institucional e catálogo canônico
│   ├── style.css       # Folha de estilos centralizada
│   └── app.js          # Lógica JavaScript e renderização dinâmica dos dados
├── README.md           # Identificação e instruções de execução
└── LICENSE             # Licença do projeto
```

## Instruções para Executar o Projeto

Como a aplicação da Parte 1 é estática e executada inteiramente no navegador, não há necessidade de instalar dependências (Node/npm) ou configurar bancos de dados.

### Método: Acesso direto pelo navegador
1. Abra a pasta `parte1/` no explorador de arquivos do seu computador.
2. Dê um duplo clique no arquivo `index.html` (ou clique com o botão direito e selecione "Abrir com" seguido pelo seu navegador de preferência, como Chrome, Edge ou Firefox).

## Sobre o Projeto (Parte 2)
Na Parte 2 do trabalho, o CineTrack evolui de um frontend estático para uma aplicação full stack. A interface foi reescrita em React utilizando componentes reutilizáveis, consumindo uma API REST desenvolvida em Node.js com persistência de dados em arquivo JSON no servidor.

### Tecnologias Utilizadas
- **Frontend**: React (Vite), HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express.js / mini-Express.js
- **Persistência**: Arquivo JSON

## Estrutura do Repositório
```text
cinetrack/
├── docs/                   # Documentações, especificações (PDFs) e requisitos
├── img/                    # Recursos visuais (logo CineTrack)
├── parte1/                 # Versão estática original (HTML, CSS e JS puro)
├── backend/                # Servidor Node.js e API REST (Parte 2)
│   ├── data/
│   │   └── filmes.json     # Persistência dos filmes em JSON
│   ├── server.js           # Rotas e configuração do servidor
│   ├── seed.js             # Script para popular os 6 filmes iniciais
│   ├── .env.example        # Exemplo de variáveis de ambiente
│   └── package.json
├── frontend/               # Interface em React + Vite (Parte 2)
│   ├── src/
│   │   ├── components/     # Componentes reutilizáveis da interface
│   │   ├── App.jsx         # Componente principal
│   │   └── main.jsx        # Ponto de entrada do React
│   ├── index.html
│   └── package.json
├── .gitignore              # Arquivos ignorados pelo Git (node_modules, .env, etc.)
├── README.md               # Identificação e instruções de execução
└── LICENSE                 # Licença do projeto
```

## Instruções para Executar o Projeto
Para executar a Parte 2, é necessário ter o Node.js (e o npm) instalado na máquina e rodar o servidor backend e a aplicação frontend em terminais separados.


### 1. Backend

### 2. Frontend
1. Abra um novo terminal e acesse a pasta do frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento do Vite:
```bash
npm run dev
```

4. Nesta tela no terminal clique em h + enter
```bash
  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```
  
5. Nesta tela no terminal clique no que desejar (Para entrar no browser o + enter):
```bash
Shortcuts
  press r + enter to restart the server
  press u + enter to show server url
  press o + enter to open in browser
  press c + enter to clear console
  press q + enter to quit
```

6. Caso queira sair clique q + enter