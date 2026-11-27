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

function validarFilme(dados = {}) {
    const erros = [];
    if (typeof dados.titulo !== "string" || !dados.titulo.trim()) erros.push("título é obrigatório");
    if (!Number.isInteger(dados.ano) || dados.ano < 1888 || dados.ano > 2030) erros.push("ano deve estar entre 1888 e 2030");
    if (typeof dados.genero !== "string" || !dados.genero.trim()) erros.push("gênero é obrigatório");
    if (!Number.isInteger(dados.nota) || dados.nota < 1 || dados.nota > 5) erros.push("nota deve estar entre 1 e 5");
    if (!["assistido", "assistindo", "quero"].includes(dados.status)) erros.push("status deve ser assistido, assistindo ou quero");
    return erros;
}

app.get("/filmes", (req, res) => {
    let lista = lerFilmes();

    if (req.query.status) {
        lista = lista.filter((filme) => filme.status === req.query.status);
    }

    if (typeof req.query.q === "string" && req.query.q) {
        const busca = req.query.q.toLowerCase();
        lista = lista.filter((filme) => filme.titulo.toLowerCase().includes(busca));
    }

    res.json(lista);
});

app.get("/stats", (req, res) => {
    const filmes = lerFilmes();
    const porStatus = filmes.reduce((contagem, filme) => {
        contagem[filme.status] = (contagem[filme.status] || 0) + 1;
        return contagem;
    }, { assistido: 0, assistindo: 0, quero: 0 });
    const somaNotas = filmes.reduce((soma, filme) => soma + filme.nota, 0);
    const mediaNotas = filmes.length ? Number((somaNotas / filmes.length).toFixed(1)) : 0;

    res.json({ total: filmes.length, porStatus, mediaNotas });
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
    const erros = validarFilme(req.body || {});
    if (erros.length) return res.status(400).json({ erros });

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
    const erros = validarFilme(atualizado);
    if (erros.length) return res.status(400).json({ erros });

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
