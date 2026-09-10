const TOTAL = 6;
const ASSISTIDOS = 3;
const ASSISTINDO = 1;
const QUERO = 2;

document.querySelector("nav button:nth-child(1)").textContent = `Todos (${TOTAL})`;
document.querySelector("nav button:nth-child(2)").textContent = `Assistidos (${ASSISTIDOS})`;
document.querySelector("nav button:nth-child(3)").textContent = `Assistindo (${ASSISTINDO})`;
document.querySelector("nav button:nth-child(4)").textContent = `Quero assistir (${QUERO})`;

document.querySelector("footer small").textContent = `Cinetrack © 2026 · ${TOTAL} filmes cadastrados`;