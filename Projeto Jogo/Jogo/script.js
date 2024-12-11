let palavraSecreta = "";
let tentativas = 0;
const tentativasMaximas = 5;
let estadoAtual = [];

// Lista de palavras embutida no código
const palavras = [
    "celso"
];

function carregarPalavras() {
    escolherPalavraAleatoria(palavras);
}

function escolherPalavraAleatoria(palavras) {
    palavraSecreta = palavras[Math.floor(Math.random() * palavras.length)];
    estadoAtual = Array(palavraSecreta.length).fill("_");
    atualizarEstado();
}

function atualizarEstado() {
    document.getElementById("estado-palavra").textContent = estadoAtual.join(" ");
}

function processarPalpite() {
    const palpite = document.getElementById("input-palavra").value.trim().toLowerCase();

    if (palpite.length !== palavraSecreta.length) {
        alert(`A palavra precisa ter ${palavraSecreta.length} letras.`);
        return;
    }

    if (palpite === palavraSecreta) {
        alert(`Parabéns! Você acertou a palavra "${palavraSecreta}" em ${tentativas + 1} tentativas.`);
        reiniciarJogo();
        return;
    }

    tentativas++;
    if (tentativas >= tentativasMaximas) {
        alert(`Fim de jogo! A palavra correta era "${palavraSecreta}".`);
        reiniciarJogo();
        return;
    }

    for (let i = 0; i < palavraSecreta.length; i++) {
        if (palpite[i] === palavraSecreta[i]) {
            estadoAtual[i] = palpite[i];
        }
    }

    atualizarEstado();

    if (!estadoAtual.includes("_")) {
        alert(`Parabéns! Você acertou a palavra "${palavraSecreta}" em ${tentativas} tentativas.`);
        reiniciarJogo();
    } else {
        alert(`Tentativa ${tentativas}/${tentativasMaximas} - Continue tentando!`);
    }

    document.getElementById("input-palavra").value = "";
}

function reiniciarJogo() {
    tentativas = 0;
    carregarPalavras();
    document.getElementById("input-palavra").disabled = false;
    document.getElementById("input-palavra").value = "";
    alert("O jogo foi reiniciado! Tente adivinhar a nova palavra.");
}

// Inicializar o jogo
carregarPalavras();

document.getElementById("botao-enviar").addEventListener("click", processarPalpite);
document.getElementById("reiniciar-btn").addEventListener("click", reiniciarJogo);
