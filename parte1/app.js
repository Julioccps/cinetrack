function rotuloStatus(status) {
    if (status === 'assistido') {
        return 'Assistido';
    }
    if (status === 'assistindo') {
        return 'Assistindo';
    }
    if (status === 'quero') {
        return 'Quero assistir';
    }
    return '';
}

const estrelas = (nota) => {
    let resultado = ""; 
    for (let i = 1; i <= 5; i++) {
        resultado += (i <= nota) ? "★" : "☆";
    }
    return resultado;
};
const estrela = estrelas;

const filmesIniciais = [
    {
        id: 1,
        titulo: "A Origem",
        ano: 2010,
        genero: "Ficção científica",
        poster: "https://media.themoviedb.org/t/p/w600_and_h900_face/9e3Dz7aCANy5aRUQF745IlNloJ1.jpg",
        nota: 5,
        status: "assistido",
        comentario: "Revejo sempre."
    },
    {
        id: 2,
        titulo: "Parasita",
        ano: 2019,
        genero: "Suspense",
        poster: "https://media.themoviedb.org/t/p/w600_and_h900_face/igw938inb6Fy0YVcwIyxQ7Lu5FO.jpg",
        nota: 4,
        status: "assistido",
        comentario: ""
    },
    {
        id: 3,
        titulo: "O Auto da Compadecida",
        ano: 2000,
        genero: "Comédia",
        poster: "https://media.themoviedb.org/t/p/w600_and_h900_face/imcOp1kJsCsAFCoOtY5OnPrFbAf.jpg",
        nota: 5,
        status: "assistido",
        comentario: "Classico nacional."
    },
    {
        id: 4,
        titulo: "Duna: Parte Dois",
        ano: 2024,
        genero: "Ficção científica",
        poster: "https://media.themoviedb.org/t/p/w600_and_h900_face/8LJJjLjAzAwXS40S5mx79PJ2jSs.jpg",
        nota: 4,
        status: "assistindo",
        comentario: ""
    },
    {
        id: 5,
        titulo: "Interestelar",
        ano: 2014,
        genero: "Ficção científica",
        poster: "https://media.themoviedb.org/t/p/w600_and_h900_face/6ricSDD83BClJsFdGB6x7cM0MFQ.jpg",
        nota: 5,
        status: "quero",
        comentario: ""
    },
    {
        id: 6,
        titulo: "Cidade de Deus",
        ano: 2002,
        genero: "Drama",
        poster: "https://media.themoviedb.org/t/p/w600_and_h900_face/gfnXixcGC060QcG6JPxN6AMdVsq.jpg",
        nota: 4,
        status: "quero",
        comentario: ""
    }
];

function renderizarCards(lista) {
    const listaElemento = document.getElementById("lista");
    if (!listaElemento) return;

    listaElemento.innerHTML = lista.map((filme) => `
        <article class="card" data-id="${filme.id}">
            <img src="${filme.poster}" width="200px" alt="Poster do filme: '${filme.titulo}'">
            <h2>${filme.titulo}</h2>
            <p>${filme.ano} · ${filme.genero}</p>
            <p>Nota: ${estrelas(filme.nota)}</p>
            <section>
                <span class="badge ${filme.status}">${rotuloStatus(filme.status)}</span>
                <button>Editar</button>
                <button>Remover</button>
            </section>
        </article>
    `).join("");
}

renderizarCards(filmesIniciais);

const rodape = document.querySelector("footer small");
if (rodape) {
    rodape.textContent = `Cinetrack © 2026 · ${filmesIniciais.length} filmes cadastrados`;
}