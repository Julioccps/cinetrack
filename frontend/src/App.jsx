import { useState } from "react";
import { filmesIniciais, gerarId } from "./data/filmes.js";
import Header from "./components/Header.jsx";
import ListaFilmes from "./components/ListaFilmes.jsx";
import Filtros from "./components/Filtros.jsx";
import ModalFilme from "./components/ModalFIlme.jsx";

function adicionar(setFilmes, novoFilme) {
    setFilmes((anteriores) => [
        ...anteriores,
        { ...novoFilme, id: gerarId(anteriores) },
    ]);
}

function remover(setFilmes, id) {
    setFilmes((anteriores) => anteriores.filter((f) => f.id !== id));
}

function editar(setFilmes, id, alteracoes) {
    setFilmes((anteriores) =>
        anteriores.map((f) => (f.id === id ? { ...f, ...alteracoes, id } : f))
    );
}

function salvar(editando, setFilmes, setEditando, dados) {
    if (editando.id) {
        editar(setFilmes, editando.id, dados);
    } else {
        adicionar(setFilmes, dados);
    }
    setEditando(null);
}

export default function App() {
    const [filmes, setFilmes] = useState(filmesIniciais);
    const [status, setStatus] = useState("todos");
    const [busca, setBusca] = useState("");
    const [editando, setEditando] = useState(null);

    const visiveis = filmes
        .filter((filme) => status === "todos" || filme.status === status)
        .filter((filme) =>
         filme.titulo.toLowerCase().includes(busca.toLowerCase())
    );
    return (
        <>
            <Header
                busca={busca}
                aoBuscar={setBusca}
                aoAdicionar={() => setEditando({})}
            >
                <Filtros ativo={status} aoMudar={setStatus}/>
            </Header>
            <ListaFilmes
                filmes={visiveis}
                aoEditar={setEditando}
                aoRemover={(id) => remover(setFilmes, id)}
            />

            {editando !== null && (
                <ModalFilme
                filme={editando}
                aoSalvar={(dados) => salvar(editando, setFilmes, setEditando, dados)}
                aoFechar={() => setEditando(null)}
                />
            )}
        </>
    );
}
