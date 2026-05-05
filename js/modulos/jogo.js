console.log("Jogo carregado com sucesso!");

const daddos = JSON.parse(localStorage.getItem("jogador"));

if (!daddos) {
    window.location.href = "index.html";

}

document.getElementById("player").innerText ="Jogador: " + daddos.nome;

const imagens = [
    "imagens/1.png",
    "imagens/2.png",
    "imagens/3.png",
    "imagens/4.png",
    "imagens/5.png",
    "imagens/6.png",
    
];

let cartas = [...imagens, ...imagens];
cartas.sort(() =>0.5 - Math.random());

const tabuleiro =document.getElementById("tabuleiro");

cartas.forEach(img => {
    const carta = document.createElement("div");
    carta.classList.add("carta");

    carta.dataset.img = img;

    carta.onclick = () => {
        carta.innerHTML = `<img src="imagens/${img}">`;

    };

    tabuleiro.appendChild(carta);
});

