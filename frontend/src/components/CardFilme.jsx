function estrelas(nota) {
    return "★".repeat(nota) + "☆".repeat(5 - nota);
}

const ROTULOS = {
    assistido: "Assistido",
    assistindo: "Assistindo",
    quero: "Quero assistir"
};

export default function cardFilmes({filme}) {
    return (
        <article className="card">
            <img src={filme.poster} alt="" />
            <h2>{filme.titulo}</h2>
            <p>{filme.ano} · {filme.genero}</p>
            <p>Nota: {estrelas(filme.nota)}</p>
            <section>
                <span className={`badge ${filme.status}`}>
                    {ROTULOS[filme.status]}
                </span>
                
                <div id="acoes">
                    <button className="btn-editar">Editar</button>
                    <button className="btn-remover">Remover</button>
                </div>
            </section>

        </article>
    );
}