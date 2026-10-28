import logoCinetrack from "../../../img/cinetrack_logo.png"
import Filtros from "./Filtros";

export default function Header() {
    return (
        <header>
            <h1><img src={logoCinetrack} width="50px" alt="Logo do CineTrack"/>CineTrack</h1>

            <section>
                <input type="search" placeholder="&#x1F50D;Buscar Filme" aria-label="Buscar Filme" />
                <button id="adicionar">+ Adicionar</button>
            </section>

            <Filtros />
        </header>
    );
}
