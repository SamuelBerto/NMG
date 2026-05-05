function entrar() {
    const nome = document.getElementById('nome').value.trim();

    if (nome === '') {
         alert ("Por favor, digite seu nome para jogar!");
        return;

    }

    localStorage.setItem('jogador', JSON.stringify({ nome }));


    // window precisa ser minúsculo
    window.location.href = 'jogo.html'; 


}

 