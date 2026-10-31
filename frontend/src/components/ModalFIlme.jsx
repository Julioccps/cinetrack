import { useState } from "react";

const VAZIO = {
    titulo: "",
    ano: "",
    genero: "",
    poster: "",
    status: "quero",
    nota: 1,
    comentario: ""
};

function atualizar(setDados, campo, valor) {
  setDados((anteriores) => ({
    ...anteriores,
    [campo]: valor,
  }));
}

function submeter(evento, dados, aoSalvar) {
  evento.preventDefault();
  aoSalvar({
    ...dados,
    ano: Number(dados.ano),
    nota: Number(dados.nota),
  });
}

export default function ModalFilme({filme, aoSalvar, aoFechar}) {
    const [dados, setDados] = useState({
        ...VAZIO,
        ...filme,
    });

    return(
        <div id="modal">
            <div className="modal-conteudo">
                <form id="form-filme" onSubmit={(e) => submeter(e, dados, aoSalvar)} style={{ margin: 0 }}>
                    <div>
                        <h2>{filme.id ? "Editar filme" : "Adicionar filme"}</h2>

                        <div className="campo">
                            <label>
                            Título
                            <input
                                required
                                value={dados.titulo}
                                onChange={(e) => atualizar(setDados, "titulo", e.target.value)}
                            />
                            </label>
                        </div>

                        <div className="campo">
                            <label>
                            Ano
                            <input
                                type="number"
                                required
                                value={dados.ano}
                                max={2030}
                                min={1888}
                                onChange={(e) => atualizar(setDados, "ano", e.target.value)}
                            />
                            </label>
                        </div>

                        <div className="campo">
                            <label>
                            Gênero
                            <input
                                required
                                value={dados.genero}
                                onChange={(e) => atualizar(setDados, "genero", e.target.value)}
                            />
                            </label>
                        </div>

                        <div className="campo">
                            <label>
                            URL do pôster
                            <input
                                type="url"
                                value={dados.poster || ""}
                                onChange={(e) => atualizar(setDados, "poster", e.target.value)}
                            />
                            </label>
                        </div>

                        <div className="campo">
                            <label>
                            Status
                            <select
                                value={dados.status}
                                onChange={(e) => atualizar(setDados, "status", e.target.value)}
                            >
                                <option value="quero">Quero assistir</option>
                                <option value="assistindo">Assistindo</option>
                                <option value="assistido">Assistido</option>
                            </select>
                            </label>
                        </div>

                        <div className="campo">
                            <label>
                            Nota (1 a 5)
                            <select
                                value={dados.nota}
                                onChange={(e) => atualizar(setDados, "nota", e.target.value)}
                            >
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                            </select>
                            </label>
                        </div>

                        <div className="campo">
                            <label>
                            Comentário
                            <textarea
                                value={dados.comentario || ""}
                                rows="4" cols="25"
                                onChange={(e) => atualizar(setDados, "comentario", e.target.value)}
                            />
                            </label>
                        </div>

                        <div className="acoes">
                            <button type="button" id="cancelar" onClick={aoFechar}>
                            Cancelar
                            </button>
                            <button type="submit">Salvar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
