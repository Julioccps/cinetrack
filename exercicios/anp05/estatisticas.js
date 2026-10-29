export function mediaNotas(lista) {
    if (lista.length === 0) return 0;
    const soma = lista.reduce((acc, filme) => acc + filme.nota, 0);
    return Number((soma / lista.length).toFixed(1));
}

export function contagemPorStatus(lista) {
    return lista.reduce(
        (acc, filme) => {
            acc[filme.status] = (acc[filme.status] || 0) + 1;
            return acc;
        },
        { assistido: 0, assistindo: 0, quero: 0 }
    );
}

export function ordenarPorNota(lista) {
    return [...lista].sort((a, b) => b.nota - a.nota);
}

