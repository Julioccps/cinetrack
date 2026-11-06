import { useState, useEffect } from "react";
import { gerarId } from "./data/filmes.js";
import { listar } from "./api.js";
import Header from "./components/Header.jsx";
import ListaFilmes from "./components/ListaFilmes.jsx";
import Filtros from "./components/Filtros.jsx";
import ModalFilme from "./components/ModalFilme.jsx";
import Footer from "./components/Footer.jsx";

const CHAVE_FILTROS = "cinetrack:filtros";

function lerFiltrosSalvos() {
    try {
        const salvo = localStorage.getItem(CHAVE_FILTROS);
        if (!salvo) return { busca: "", status: "todos" };
        const dados = JSON.parse(salvo);
        return {
            busca: typeof dados?.busca === "string" ? dados.busca : "",
            status: typeof dados?.status === "string" ? dados.status : "todos",
        };
    } catch {
        return { busca: "", status: "todos" };
    }
}

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
    const [filmes, setFilmes] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);
    const [status, setStatus] = useState(() => lerFiltrosSalvos().status);
    const [busca, setBusca] = useState(() => lerFiltrosSalvos().busca);
    const [editando, setEditando] = useState(null);
    
    const visiveis = filmes
        .filter((filme) => status === "todos" || filme.status === status)
        .filter((filme) =>
         filme.titulo.toLowerCase().includes(busca.toLowerCase())
    );
    
    useEffect(() => {
        listar()
            .then((dados) => setFilmes(dados))
            .catch((erro) => setErro(erro.message))
            .finally(() => setCarregando(false));
    }, []);

    useEffect(() => {
        document.title = `CineTrack (${filmes.length})`;
    }, [filmes.length]);

    useEffect(() => {
        localStorage.setItem(
            CHAVE_FILTROS,
            JSON.stringify({ busca, status })
        );
    }, [busca, status]);

    let conteudo;
    if (carregando) {
        conteudo = <p>Carregando...</p>;
    } else if (erro) {
        conteudo = <p className="erro">Erro: {erro}</p>;
    } else {
        conteudo = (
            <ListaFilmes
                filmes={visiveis}
                aoEditar={setEditando}
                aoRemover={(id) => remover(setFilmes, id)}
            />
        );
    }

    return (
        <>
            <Header
                busca={busca}
                aoBuscar={setBusca}
                aoAdicionar={() => setEditando({})}
            >
                <Filtros ativo={status} aoMudar={setStatus}/>
                <p>Exibindo {visiveis.length} de {filmes.length} filmes</p>
            </Header>

            <main>{conteudo}</main>

            {editando !== null && (
                <ModalFilme
                filme={editando}
                aoSalvar={(dados) => salvar(editando, setFilmes, setEditando, dados)}
                aoFechar={() => setEditando(null)}
                />
            )}
            <Footer totalFilmes={filmes.length} />
        </>
    );
}