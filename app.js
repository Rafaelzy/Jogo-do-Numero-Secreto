let numerosSorteados = [];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroSecreto();
console.log(numeroSecreto);
let tentativa = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroLimite}` );
}
exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
        
    if(numeroSecreto == chute) {
        palavraTentativa = tentativa > 1? 'tentativas' : 'tentativa';
        mensagemTentativa = `Você acertou qual era o número secreto em ${tentativa} ${palavraTentativa}!`;
        exibirTextoNaTela('h1', `Parabéns!`);
        exibirTextoNaTela('p', mensagemTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled');  
        
        }else {
            if(numeroSecreto < chute) {
                exibirTextoNaTela('p', `O número secreto é menor que ${chute}`);
            }else {
                exibirTextoNaTela('p', `O número secreto é maior que ${chute}`);
            }
            tentativa++;
            limparInput();
        }
    }

function gerarNumeroSecreto() {
    let numeroAleatorio = parseInt(Math.random() * numeroLimite +1);
    let quantidadeDeNumerosNaLista = numerosSorteados.length;

    if(quantidadeDeNumerosNaLista == numeroLimite) {
        numerosSorteados = [];
    }

    if(numerosSorteados.includes(numeroAleatorio)) {
        return gerarNumeroSecreto();
    }else {
        numerosSorteados.push(numeroAleatorio);
        console.log(numerosSorteados);
        return numeroAleatorio;
    }
}

function limparInput() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroSecreto();
    limparInput();
    tentativa = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}