import { useState, useEffect } from "react";
import { listar, criar, atualizar, remover } from "./api.js";
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

export default function App() {
    const [filmes, setFilmes] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);
    const [status, setStatus] = useState(() => lerFiltrosSalvos().status);
    const [busca, setBusca] = useState(() => lerFiltrosSalvos().busca);
    const [editando, setEditando] = useState(null);
    const [salvando, setSalvando] = useState(false);
    const [erroOperacao, setErroOperacao] = useState(null);
    
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

    function abrirModal(filme) {
        setErroOperacao(null);
        setEditando(filme);
    }

    async function salvar(dados) {
        setSalvando(true);
        setErroOperacao(null);

        try {
            if (editando.id) {
                const atualizado = await atualizar(editando.id, dados);
                setFilmes((anteriores) => anteriores.map((filme) =>
                    filme.id === atualizado.id ? atualizado : filme
                ));
            } else {
                const criado = await criar(dados);
                setFilmes((anteriores) => [...anteriores, criado]);
            }
            setEditando(null);
        } catch (erro) {
            setErroOperacao(`Não foi possível salvar o filme: ${erro.message}`);
        } finally {
            setSalvando(false);
        }
    }

    async function removerFilme(id) {
        setErroOperacao(null);

        try {
            await remover(id);
            setFilmes((anteriores) => anteriores.filter((filme) => filme.id !== id));
        } catch (erro) {
            setErroOperacao(`Não foi possível remover o filme: ${erro.message}`);
        }
    }

    let conteudo;
    if (carregando) {
        conteudo = <p>Carregando...</p>;
    } else if (erro) {
        conteudo = <p className="erro">Erro: {erro}</p>;
    } else {
        conteudo = (
            <ListaFilmes
                filmes={visiveis}
                aoEditar={abrirModal}
                aoRemover={removerFilme}
            />
        );
    }

    return (
        <>
            <Header
                busca={busca}
                aoBuscar={setBusca}
                aoAdicionar={() => abrirModal({})}
            >
                <Filtros ativo={status} aoMudar={setStatus}/>
                <p>Exibindo {visiveis.length} de {filmes.length} filmes</p>
            </Header>

            <main>
                {editando === null && erroOperacao && <p role="alert" className="erro">{erroOperacao}</p>}
                {conteudo}
            </main>

            {editando !== null && (
                <ModalFilme
                    filme={editando}
                    aoSalvar={salvar}
                    salvando={salvando}
                    erro={erroOperacao}
                    aoFechar={() => abrirModal(null)}
                />
            )}
            <Footer totalFilmes={filmes.length} />
        </>
    );
}
