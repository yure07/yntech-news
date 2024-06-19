# YnTech News

Projeto teste técinco para Desenvolvedor Front-end

## Tecnologias

- React
- Typescript
- Tailwind

## Execução do projeto

Após certficar que possui [Node.js](https://nodejs.org/en/) e [VSCode](https://code.visualstudio.com/) instalados na sua máquina, siga os passos:

## Clone este repositório, usando cmd ou terminal
`git clone <https://github.com/yure07/yntech-news>`

### Acesse a pasta do projeto
`cd yntech-news`

### Instale as dependências
`npm install`

### Execute a aplicação
`npm start`

### O servidor iniciará na porta:3000 - acesse <http://localhost:3000>

## Exemplos de chamadas à API

No local `pages>home>index.tsx` há uma chamada à API usando o fetch, que trará as notícias da categoria Geral em português, usando a url: `https://newsapi.org/v2/everything?q=general&language=pt&pageSize=15&apiKey=${process.env.API_KEY}`.

O parâmetro `q=general` na url configura a requisição para trazer apenas notícias dessa categoria (geral).

Portanto, ele pode ser trocado para qualquer outra categoria existente na aplicação:
- business (negócios)
- entertainment (entretenimento)
- health (saúde)
- science (ciêcncia)
- sports (esportes)
- technology (tecnologia)

Em toda aplicação a url se mantém praticamente a mesma, a única diferença será nesse parâmetro, para obter o tipo certo de notícia.

## Diferencial
O Input presente no cabeçalho é funcional.
Busque por empresas e o site trará notícias sobre essa empresa, possuindo uma vasta gama de empresa, dentre elas:
- Apple
- Samsung
- Amazon
- Coca Cola
- Ambev
