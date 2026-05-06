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

    cartas.forEach(img => {
        const carta = document.createElement("div");
        carta.classList.add("carta");

        carta.onclick =() => {
            carta.innerHTML =  `<img src="imagens/${img}"  width="64">`;

        };

        tabuleiro.appendChild(carta);
    });

});

