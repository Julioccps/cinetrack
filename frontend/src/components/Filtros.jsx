function Filtros() {
    return (
        <nav aria-label="Filtros de Status">
            <button class="ativo" data-status="todos" aria-pressed="true">Todos</button>
            <button data-status="assistido" aria-pressed="false">Assistido</button>
            <button data-status="assistindo" aria-pressed="false">Assistindo</button>
            <button data-status="quero" aria-pressed="false">Quero assistir</button>
        </nav>
    );
}

export default Filtros;
