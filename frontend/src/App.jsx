import { useState } from "react";
import { filmesIniciais } from "./data/filmes.js";
import Header from "./components/Header.jsx";
import ListaFilmes from "./components/ListaFilmes.jsx";
import Filtros from "./components/Filtros.jsx";

export default function App() {
    const [status, setStatus] = useState("todos");
    const [busca, setBusca] = useState("");

    const visiveis = filmesIniciais
        .filter((filme) => status === "todos" || filme.status === status)
        .filter((filme) =>
         filme.titulo.toLowerCase().includes(busca.toLowerCase())
    );
    return (
        <>
            <Header busca={busca} aoBuscar={setBusca}>
                <Filtros ativo={status} aoMudar={setStatus}/>
            </Header>
            <ListaFilmes filmes={visiveis} />
        </>
    );
}