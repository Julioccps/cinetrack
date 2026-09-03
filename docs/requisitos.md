# Requisitos do Sistema - CineTrack

## 1. Descrição Geral
O CineTrack é um gerenciador pessoal de listas de filmes onde o usuário pode listar, cadastrar, editar, remover e filtrar seus filmes.

## 2. Tabela de Ações e Rotas (API / REST)

| Ação | Método HTTP | Rota / Endpoint | Descrição |
| :--- | :--- | :--- | :--- |
| Listar filmes | `GET` | `/filmes` | Retorna todos os filmes cadastrados |
| Buscar filme | `GET` | `/filmes/:id` | Retorna os detalhes de um filme específico |
| Cadastrar filme | `POST` | `/filmes` | Adiciona um novo filme à lista |
| Atualizar filme | `PUT` | `/filmes/:id` | Edita as informações de um filme existente |
| Remover filme | `DELETE` | `/filmes/:id` | Exclui um filme da lista |

## 3. Campos do Filme
- `titulo` (texto)
- `ano` (inteiro)
- `genero` (texto)
- `poster` (URL)
- `nota` (1 a 5)
- `status` (assistido, assistindo, quero)
- `comentario` (texto opcional)