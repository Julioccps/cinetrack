import Estrelas from "./Estrelas.jsx";
import Badge from "./Badge.jsx";

export default function CardFilme({filme, aoEditar, aoRemover}) {
    const posterUrl =
        filme.poster ||
        `https://placehold.co/200x300?text=${encodeURIComponent(filme.titulo)}`;

    return (
        <article className="card">
            <img src={posterUrl} alt={`Poster do filme: '${filme.titulo}'`} />
            <h2>{filme.titulo}</h2>
            <p>{filme.ano} · {filme.genero}</p>
            <p>Nota: <Estrelas nota={filme.nota} /></p>
            <section>
                <Badge status={filme.status} />
                
                <div className="acoes">
                    <button className="btn-editar" onClick={() => aoEditar(filme)}>Editar</button>
                    <button className="btn-remover" onClick={() => aoRemover(filme.id)}>Remover</button>
                </div>
            </section>
        </article>
    );
}