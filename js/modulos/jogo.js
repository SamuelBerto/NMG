document.addEventListener("DOMContentLoaded", () => {

    const dados = JSON.parse(localStorage.getItem("jogador"));

    if (!dados) {
        window.location.href = "index.html";
        return;
    }

    document.getElementById("player").innerText = "Jogador: " + dados.nome;

    const imagens = ["1.png","2.png","3.png","4.png","5.png","6.png"];

    let cartas = [...imagens, ...imagens];
    cartas.sort(() => 0.5 - Math.random());

    const tabuleiro = document.getElementById("tabuleiro");
    const status = document.getElementById("status");
    const rankingDiv = document.getElementById("ranking");

    let primeiraCarta = null;
    let segundaCarta = null;
    let bloqueado = false;

    let jogadas = 0;
    let paresEncontrados = 0;

    cartas.forEach(img => {
        const carta = document.createElement("div");
        carta.classList.add("carta");
        carta.dataset.img = img;
        carta.dataset.virada = "false";
        carta.innerHTML = `<img src="imagens/back.png" width="64">`;
        
        carta.onclick =() => {
            if (bloqueado) return;
            if (carta.dataset.virada === "true") return;
            if (carta === primeiraCarta) return;

            carta.innerHTML = `<img src="imagens/${img}" width="64">`;

            carta.dataset.virada = "true";

            if (!primeiraCarta) {
                primeiraCarta = carta;
            } else {
                segundaCarta = carta;
                bloqueado = true;
                jogadas++;
                status.innerText = `Jogadas: ${jogadas}`;

                verificarPar();
            }
        };

        tabuleiro.appendChild(carta);

    
    });

function mostrarRanking() {
    let rankings = JSON.parse(localStorage.getItem("ranking")) || [];
    
    rankings.sort((a, b) => a.jogadas - b.jogadas);
    
    rankingDiv.innerHTML = "<h3>🏆Ranking</h3>";
    
    rankings.slice(0, 5).forEach((player, index) => {
        rankingDiv.innerHTML += `<p>${index + 1}. ${player.nome} - ${player.jogadas} jogadas</p>`;
    });
}

function verificarPar() {
    if (primeiraCarta.dataset.img === segundaCarta.dataset.img) {

    paresEncontrados++;

    if (paresEncontrados === imagens.length) {

        let rankings = JSON.parse(localStorage.getItem("ranking")) || [];

        rankings.push({ nome: dados.nome, jogadas: jogadas });
        
        localStorage.setItem("ranking", JSON.stringify(rankings));

        mostrarRanking();

        setTimeout(() => {
            alert(`Parabéns ${dados.nome}! Você venceu em ${jogadas} jogadas!`);
        }, 300);

    }

    resetar();

    
    } else {
        setTimeout(() => {
            primeiraCarta.innerHTML = `<img src="imagens/back.png" width="64">`;
            segundaCarta.innerHTML = `<img src="imagens/back.png" width="64">`;
            
            primeiraCarta.dataset.virada = "false";
            segundaCarta.dataset.virada = "false";
            
            resetar();

        }, 800);
    }
}

function resetar() {
    primeiraCarta = null;
    segundaCarta = null;
    bloqueado = false;
}

mostrarRanking();

});





