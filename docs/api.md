# API CineTrack

A URL padrão é `http://localhost:3000`. Envie corpos em JSON com `Content-Type: application/json`. As respostas de sucesso com conteúdo também são JSON.

| Método | Caminho | Parâmetros ou corpo | Respostas |
| --- | --- | --- | --- |
| GET | `/filmes` | Query opcional `status` (comparação exata) e `q` (trecho do título, sem distinção de maiúsculas). Podem ser combinados. | 200: lista de filmes, inclusive vazia |
| GET | `/filmes/:id` | `id` numérico do filme. | 200: filme; 404: não encontrado |
| GET | `/stats` | Nenhum. | 200: objeto com `total`, `porStatus` e `mediaNotas` |
| POST | `/filmes` | Corpo com `titulo`, `ano`, `genero`, `nota` e `status`; `poster` e `comentario` são opcionais. | 201: filme criado; 400: dados inválidos |
| PUT | `/filmes/:id` | `id` numérico e corpo com campos a atualizar. Os campos omitidos mantêm seus valores anteriores; o resultado completo é validado. | 200: filme atualizado; 400: dados inválidos; 404: não encontrado |
| DELETE | `/filmes/:id` | `id` numérico do filme. | 204: removido, sem corpo; 404: não encontrado |

Título e gênero devem ser textos não vazios; ano deve ser inteiro entre 1888 e 2030; nota deve ser inteira de 1 a 5; status deve ser `assistido`, `assistindo` ou `quero`. O servidor atribui o ID. Um erro de validação retorna todos os problemas em `{"erros": ["..."]}`. Um ID inexistente retorna `{"erro": "Filme não encontrado"}`. JSON malformado também retorna 400, no formato padrão do Express.
