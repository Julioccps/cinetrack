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
}

const estrela = (nota) => {
    let resultado = ""; 
    for (let i = 1; i <= 5; i++) {
        resultado += (i <= nota) ? "★" : "☆";
    }
    return resultado;
};

const primeiroCard = document.querySelector('.card');
if (primeiroCard) {
    primeiroCard.querySelector(".badge").textContent = rotuloStatus("assistido");
    primeiroCard.querySelector("#nota").innerHTML = `Nota: ${estrela(4)}`;
}