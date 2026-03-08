let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio(); 
let tentativas = 1;


function exibitTextoNaTela(tag, texto) {
    let campo  = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}
 
function exibirTextoInicial() {
    exibitTextoNaTela('h1', 'Jogo do número secreto');
    exibitTextoNaTela('p', 'Escolha um número de 1 e 10');
}

exibirTextoInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        exibitTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativa = `Voce descobriu o numero secreto com ${tentativas} ${palavraTentativa}!`;
        exibitTextoNaTela('p', mensagemTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if ( chute > numeroSecreto) {
            exibitTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibitTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
    console.log(chute == numeroSecreto);
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirTextoInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}