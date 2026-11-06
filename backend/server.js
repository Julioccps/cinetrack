const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const ARQUIVO = path.join(__dirname, "data", "filmes.json");

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

function lerFilmes() {
    return JSON.parse(fs.readFileSync(ARQUIVO, "utf8"));
}

function salvarFilmes(lista) {
    fs.writeFileSync(ARQUIVO, JSON.stringify(lista, null, 2), "utf8");
}

function gerarId(lista) {
    return Math.max(0, ...lista.map((filme) => filme.id)) + 1;
}

function dadosValidos(dados) {
    return dados && typeof dados.titulo === "string" &&
        dados.titulo.trim().length > 0 &&
        Number.isInteger(dados.ano) && dados.ano > 0;
}

app.get("/filmes", (req, res) => {
    let lista = lerFilmes();

    if (req.query.status) {
        lista = lista.filter((filme) => filme.status === req.query.status);
    }

    res.json(lista);
});

app.get("/filmes/:id", (req, res) => {
    const id = Number(req.params.id);
    const filme = lerFilmes().find((filme) => filme.id === id);

    if (!filme) {
        return res.status(404).json({ erro: "Filme não encontrado" });
    }

    res.json(filme);
});

app.post("/filmes", (req, res) => {
    if (!dadosValidos(req.body)) {
        return res.status(400).json({ erro: "Título e ano válidos são obrigatórios" });
    }

    const lista = lerFilmes();
    const novo = { ...req.body, id: gerarId(lista) };
    lista.push(novo);
    salvarFilmes(lista);
    res.status(201).json(novo);
});

app.put("/filmes/:id", (req, res) => {
    const id = Number(req.params.id);
    const lista = lerFilmes();
    const indice = lista.findIndex((filme) => filme.id === id);

    if (indice === -1) {
        return res.status(404).json({ erro: "Filme não encontrado" });
    }

    const atualizado = { ...lista[indice], ...req.body, id };
    if (!dadosValidos(atualizado)) {
        return res.status(400).json({ erro: "Título e ano válidos são obrigatórios" });
    }

    lista[indice] = atualizado;
    salvarFilmes(lista);
    res.json(atualizado);
});

app.delete("/filmes/:id", (req, res) => {
    const id = Number(req.params.id);
    const lista = lerFilmes();

    if (!lista.some((filme) => filme.id === id)) {
        return res.status(404).json({ erro: "Filme não encontrado" });
    }

    salvarFilmes(lista.filter((filme) => filme.id !== id));
    res.sendStatus(204);
});

const porta = process.env.PORT || 3000;
app.listen(porta, () => {
    console.log(`API na porta ${porta}`);
});
