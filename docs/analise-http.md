# Análise do Tráfego HTTP (DevTools)

## 1. Requisição Principal (HTML)
- **Site:** Mozilla Developer Network (MDN)
- **URL:** https://developer.mozilla.org/pt-BR/
- **Método:** GET
- **Status:** 200 OK
- **Content-Type:** text/html; charset=utf-8

## 2. Recursos Estáticos

### 2.1 Requisição JavaScript (.js)
- **URL:** https://developer.mozilla.org/static/js/main.js *(substitua pela URL real do MDN se tiver pego outra)*
- **Método:** GET
- **Status:** 200 OK
- **Content-Type:** text/javascript (ou application/javascript)

### 2.2 Requisição CSS (.css)
- **URL:** https://developer.mozilla.org/static/client/styles-global.fc3371218d35b72f.css
- **Método:** GET
- **Status:** 200 OK
- **Content-Type:** text/css; charset=utf-8

### 2.3 Requisição de Imagem (.png)
- **URL:** https://developer.mozilla.org/static/ssr/mdn_contributor.9e2a105f50828d5a.png
- **Método:** GET
- **Status:** 200 OK
- **Content-Type:** image/png

## 3. Erro 404 (Recurso Não Encontrado)
- **Site:** Mozilla Developer Network (MDN)
- **URL provocada:** https://developer.mozilla.org/pt-BR/aula
- **Método:** GET
- **Status:** 404 Not Found
- **O que mudou:** Em vez de retornar o código `200 OK` indicando sucesso no carregamento do recurso solicitado, o servidor respondeu com `404 Not Found`, informando que a rota/documento não existe no servidor, retornando a página padrão de erro 404 do MDN.

## 4. Requisição de API (Fetch / XHR)
- **Site:** YouTube
- **URL / Caminho:** https://www.youtube.com/api/jnn/v1/GenerateIT
- **Método:** GET
- **Status:** 200 OK
- **Content-Type:** application/json (ou o tipo observado no Headers)
- **Comparação com docs/requisitos.md:** No YouTube, a requisição Fetch/XHR envia/busca dados no backend em segundo plano de forma assíncrona, sem precisar recarregar a interface inteira. Esse comportamento reflete diretamente o fluxo planejado na tabela de rotas do `docs/requisitos.md` do CineTrack, onde o frontend consumirá endpoints do servidor para enviar e receber dados via API.

---

## 5. Listagem de Filmes no CineTrack (Parte 2)
Na Parte 2 do CineTrack, a listagem dos filmes cadastrados utilizará o método HTTP **GET** na rota **/filmes** (ou `/api/filmes`). No corpo da resposta (*body*), o servidor responderá com o cabeçalho `Content-Type: application/json` e retornará uma lista/array JSON contendo os objetos de filmes cadastrados, cada um com seus respectivos atributos: `id`, `titulo`, `ano`, `genero`, `poster`, `nota`, `status` e `comentario`.