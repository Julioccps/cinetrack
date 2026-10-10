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

let filmes = [...filmesIniciais];
const listaElemento = document.getElementById("lista");
const nav = document.querySelector("nav");

function gerarId(lista) {
    return Math.max(0, ...lista.map((f) => f.id)) + 1;
}

function criarCard(filme) {
    const card = document.createElement("article");
    card.classList.add("card");
    card.dataset.id = filme.id;

    const img = document.createElement("img");
    img.src = filme.poster;
    img.alt = `Poster do filme: '${filme.titulo}'`;

    const h2 = document.createElement("h2");
    h2.textContent = filme.titulo;

    const pInfo = document.createElement("p");
    pInfo.textContent = `${filme.ano} · ${filme.genero}`;

    const pNota = document.createElement("p");
    pNota.textContent = `Nota: ${estrelas(filme.nota)}`;

    const section = document.createElement("section");

    const badge = document.createElement("span");
    badge.className = `badge ${filme.status}`;
    badge.textContent = rotuloStatus(filme.status);

    const btnEditar = document.createElement("button");
    btnEditar.className = "btn-editar";
    btnEditar.textContent = "Editar";

    const btnRemover = document.createElement("button");
    btnRemover.className = "btn-remover";
    btnRemover.textContent = "Remover";

    section.append(badge, btnEditar, btnRemover);

    card.append(img, h2, pInfo, pNota, section);

    return card;
}

function renderizarCards(lista) {
    if (!listaElemento) return;

    listaElemento.textContent = "";
    const frag = document.createDocumentFragment();
    lista.forEach(f => {
        const card = criarCard(f);
        frag.appendChild(card);
    }); 
    listaElemento.appendChild(frag);
}

function event_click() {
    listaElemento.addEventListener("click", (event) => {
        const botaoRemover = event.target.closest(".btn-remover");
        if (botaoRemover) {
            if (!confirm("Tem certeza que deseja remover este filme?")) return;
            const card = botaoRemover.closest(".card");
            const idFilme = parseInt(card.dataset.id, 10);
            filmes = filmes.filter(filme => filme.id !== idFilme);
            atualizarTela();
            atualizaRodape();
            return;
        }

        const botaoEditar = event.target.closest(".btn-editar");
        if (botaoEditar) {
            const card = botaoEditar.closest(".card");
            editandoId = Number(card.dataset.id);
            const filme = filmes.find(f => f.id === editandoId);
            form.elements.titulo.value = filme.titulo;
            form.elements.ano.value = filme.ano;
            form.elements.genero.value = filme.genero;
            form.elements.poster.value = filme.poster;
            form.elements.status.value = filme.status;
            form.elements.nota.value = filme.nota;
            form.elements.comentario.value = filme.comentario;
            abrir();
        }
    });
}

function atualizaFiltro() {
    nav.addEventListener("click", (event) => {
        const botaoFiltro = event.target.closest("button");
        if (!botaoFiltro) return;
        nav.querySelector(".ativo").classList.remove("ativo");
        botaoFiltro.classList.add("ativo");
        atualizarTela();
    });
}

function atualizarTela() {
    const statusFiltro = nav.querySelector(".ativo").dataset.status;
    renderizarCards(statusFiltro === "todos" ? filmes : filmes.filter(filme => filme.status === statusFiltro));
}

function validarFilme(filme) {
    const erros = [];
    if (!filme.titulo) {
        erros.push("O título do filme é obrigatório!");
    }
    if (filme.ano < 1888 || filme.ano > 2030) {
        erros.push("Ano inválido!");
    }
    return { valido: erros.length === 0, erros };
}

let editandoId = null;
const modal = document.querySelector("#modal");
const form = document.querySelector("#form-filme");
const adicionar = document.querySelector("#adicionar");
const cancelar = document.querySelector("#cancelar");
const tituloModal = modal.querySelector("h1");

function abrir() {
    tituloModal.textContent = editandoId !== null ? "Editar Filme" : "Adicionar Filme";
    modal.hidden = false;
}

function fechar() {
    modal.hidden = true;
}

function configuraModal() {
    adicionar.addEventListener("click", () => {
        editandoId = null;
        form.reset();
        abrir();
    });

    cancelar.addEventListener("click", () => {
        fechar();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !modal.hidden) {
            fechar();
        }
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const dados = Object.fromEntries(new FormData(form));
        dados.titulo = dados.titulo.trim();
        dados.genero = dados.genero.trim();
        dados.ano = Number(dados.ano);
        dados.nota = Number(dados.nota);

        const validacao = validarFilme(dados);
        if (!validacao.valido) {
            alert(validacao.erros.join("\n"));
            return;
        }

        if (editandoId !== null) {
            filmes = filmes.map(f => f.id === editandoId ? { ...f, ...dados } : f);
        } else {
            filmes = [...filmes, { id: gerarId(filmes), ...dados }];
        }
        atualizarTela();
        atualizaRodape();
        fechar();
    });
}

function atualizaRodape() {
    const rodape = document.querySelector("footer small");
    if (rodape) {
        rodape.textContent = `Cinetrack © 2026 · ${filmes.length} filmes cadastrados`;
    }
}

function init() {
    event_click();
    atualizaFiltro();
    configuraModal();
    renderizarCards(filmes);
    atualizarTela();
    atualizaRodape();
}

init();