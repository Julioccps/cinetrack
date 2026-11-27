# Testes da Parte 2

Execução em 27/11/2026, Node v26.13.1 e npm 12.2.3. Foi criado um clone local limpo do repositório e copiadas para ele as alterações ainda não commitadas de `backend/server.js` e `frontend/src/api.js`; portanto, este teste não comprova um clone da versão final publicada.

1. No clone, `npm ci` em `backend/` e `frontend/`: instalações concluídas. A instalação do backend exigiu acesso à rede fora do sandbox.
2. Em `backend/`, `node seed.js`: seis filmes gravados no arquivo JSON do clone.
3. Em `backend/`, `node server.js`: API iniciada na porta 3000. Em `frontend/`, `npm run dev -- --host 127.0.0.1`: Vite iniciado na porta 5173.
4. O navegador de teste estava indisponível (“browser access host is unavailable”). **CRUD pela interface e apresentação visual da mensagem de erro não foram verificados.** Como verificação parcial, foram feitas as requisições HTTP abaixo; não substituem o teste pela interface.
5. `POST /filmes` com título, ano e gênero válidos, nota 7 e status `inventado`: 400 e `{"erros":["nota deve estar entre 1 e 5","status deve ser assistido, assistindo ou quero"]}`.
6. `POST /filmes` com título `Teste ANP`, ano 2020, gênero `Drama`, nota 4 e status `quero`: 201, filme criado com ID 7.
7. `PUT /filmes/7` com nota 7 e status `inventado`: 400 com os mesmos dois erros. Outro PUT com título `Teste ANP editado` e status `assistido`: 200.
8. Após parar e reiniciar o backend, `GET /filmes/7`: 200 com título editado e status `assistido`, comprovando persistência no JSON.
9. `DELETE /filmes/7`: 204. `GET /filmes/7` em seguida: 404.
10. Em `frontend/`, `npm run build` e `npm run lint`: concluídos sem erros.

## Teste manual ainda pendente

Em um clone da versão final, siga o README, abra o frontend, crie um filme, localize-o, edite-o e remova-o pela interface. Crie ou edite outro registro, reinicie o backend e recarregue a página para verificar a persistência. Verifique também a mensagem visual de erro quando uma operação for rejeitada pelo servidor. Registre os resultados observados antes de considerar o teste ponta a ponta concluído.
