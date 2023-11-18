// Váriaveis para referenciar conteúdo no HTML
gameOver = window.document.getElementById("gameover")
mario = window.document.getElementById("mario")
chamine = window.document.getElementById("chamine")
telaInicio = window.document.getElementById("iniciar")
let botaoReinicio = window.document.getElementById("iniciar")
// Váriaveis globais
let horaInicialAtivada = false
let pontuacao = 0
let tema = new Audio('tema.mp3')

let dificuldade 
setInterval(
    function () {
        // Computar os estilos dos elementos (top e left)
        let estiloComputado = window.getComputedStyle(chamine)
        let chaminePosicao = parseInt(estiloComputado.getPropertyValue('left'))
        let estiloComputado2 = window.getComputedStyle(mario)
        let marioPosicao = parseInt(estiloComputado2.getPropertyValue('top'))
        // Vericar se o usuário perdeu, através dos valores left da chaminé
        if (chaminePosicao < 300 && chaminePosicao > 70 && marioPosicao == 160) {
            tema.pause();
            efeitoperdeu()
            calcularPontuacao()
            telaJogo.style.display = "none"
            gameOver.style.display = "flex"
            window.document.getElementById("pontuacao").innerHTML = pontuacao
            }
        }, 10
)

// Eventos para ação do jogo
window.document.body.addEventListener('keydown', function pular(event) {
    if (event.key == " " || event.key == "ArrowUp") {
        efeitoPulo()
        mario.src = "https://i.pinimg.com/originals/51/5a/8d/515a8da287ae3d77dfbf851515c63734.gif"
        if(dificuldade == "DIFICÍL"){
            mario.style.animation = "descer 0.4s linear"
            setTimeout(
                function () {
                    mario.src = "https://media.tenor.com/UkvleU1dQK4AAAAi/2d-mario-running.gif"
                    mario.style.animation = ""
    
                }, 400
            )

        }
        else{
        mario.style.animation = "descer 0.6s linear"
        setTimeout(
            function () {
                mario.src = "https://media.tenor.com/UkvleU1dQK4AAAAi/2d-mario-running.gif"
                mario.style.animation = ""

            }, 600
        )
        }
    }
})
telaInicio.addEventListener("click", function () {
    tema.play()
    escolhaDeNivel.style.display = "none"
    telaJogo.style.display = "flex"
    inicioDoJogo = tempoInicioDoJogo()
    dificuldade = window.document.getElementById('opcao')
    dificuldade = dificuldade.options[dificuldade.selectedIndex].text;
    definirVelocidade(dificuldade)
}
)
// Calcula a hora que o usuário iniciou o jogo
function tempoInicioDoJogo() {
    if (horaInicialAtivada == false) {
        horaInicioDoJogo = Date.now();
        horaInicialAtivada = true;
    }
    return horaInicioDoJogo;
}
function calcularPontuacao(){
    let horaTerminoDoJogo = Date.now()
    pontuacao = parseInt((horaTerminoDoJogo - inicioDoJogo) / 1000) * 10// Calcula a pontuação: parte inteira do tempo que o usuário ficou no jogo vezes 10
}
function definirVelocidade(dificuldade){
    if(dificuldade == "DIFICÍL"){
         velocidade = 0.8
    }
    if(dificuldade == "FÁCIL"){
         velocidade = 1.5
    } 
    if  (dificuldade == "MÉDIO"){
         velocidade = 1
    }
    chamine.style.animation = "animachamine " + velocidade + "s " +  "infinite linear"
}
function efeitoPulo() {
    let pulo = new Audio('pulo.mp3')
    pulo.currentTime = 1
    pulo.play()
}
function efeitoperdeu() {
    let perdeu = new Audio('perdeu.mp3')
    perdeu.currentTime = 1
    perdeu.play()
}


