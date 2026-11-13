const BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

async function pedir(caminho, opcoes) {
    const resposta = await fetch(BASE + caminho, opcoes);

    if (!resposta.ok) {
        const dados = await resposta.json().catch(() => null);
        throw new Error(dados?.erro || `HTTP ${resposta.status}`);
    }

    return resposta.status === 204 ? null : resposta.json();
}

function enviar(caminho, method, filme) {
    return pedir(caminho, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filme),
    });
}

export const listar = () => pedir("/filmes");
export const criar = (filme) => enviar("/filmes", "POST", filme);
export const atualizar = (id, filme) => enviar(`/filmes/${id}`, "PUT", filme);
export const remover = (id) => pedir(`/filmes/${id}`, { method: "DELETE" });
