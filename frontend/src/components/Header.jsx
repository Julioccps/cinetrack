const logoCinetrack = "/img/cinetrack_logo.png";

export default function Header({busca, aoBuscar, aoAdicionar, children}) {
    return (
        <header>
            <h1><img src={logoCinetrack} width="50px" alt="Logo do CineTrack"/>CineTrack</h1>

            <section>
                <input type="search"
                    placeholder="&#x1F50D;Buscar Filme" 
                    value={busca}
                    onChange={(e) => aoBuscar(e.target.value)}
                    aria-label="Buscar Filme" />
                <button id="adicionar" onClick={aoAdicionar}>+ Adicionar</button>
            </section>
            {children}
        </header>
    );
}
