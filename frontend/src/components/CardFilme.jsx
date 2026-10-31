function estrelas(nota) {
    return "★".repeat(nota) + "☆".repeat(5 - nota);
}

const ROTULOS = {
    assistido: "Assistido",
    assistindo: "Assistindo",
    quero: "Quero assistir"
};

export default function CardFilme({filme, aoEditar, aoRemover}) {
    const posterUrl =
        filme.poster ||
        `https://placehold.co/200x300?text=${encodeURIComponent(filme.titulo)}`;

    return (
        <article className="card">
            <img src={posterUrl} alt={`Poster do filme: '${filme.titulo}'`} />
            <h2>{filme.titulo}</h2>
            <p>{filme.ano} · {filme.genero}</p>
            <p>Nota: {estrelas(filme.nota)}</p>
            <section>
                <span className={`badge ${filme.status}`}>
                    {ROTULOS[filme.status]}
                </span>
                
                <div className="acoes">
                    <button className="btn-editar" onClick={() => aoEditar(filme)}>Editar</button>
                    <button className="btn-remover" onClick={() => aoRemover(filme.id)}>Remover</button>
                </div>
            </section>
        </article>
    );
}
