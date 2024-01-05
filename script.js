const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const musicaCheckBox = document.querySelector('#alternar-musica');
const pausarOuIniciarBt = document.querySelector('#start-pause span')
const pausarOuIniciarIcon = document.querySelector('#start-pause img')
const timer = document.querySelector('#timer');
const musicaDeFundo = new Audio('./sons/luna-rise-part-one.mp3');
const musicaPlay = new Audio('./sons/play.wav');
const musicaPause = new Audio('./sons/pause.mp3');
const musicaFim = new Audio('./sons/beep.mp3');
musicaDeFundo.loop = true;
const startPauseBt = document.querySelector('#start-pause')
let tempoSegundos = 1500
let intervaloId = null;

musicaCheckBox.addEventListener('change', () =>{
        if(musicaDeFundo.paused){
            musicaDeFundo.play()
        }else{
            musicaDeFundo.pause()
        }
})

focoBt.addEventListener('click', () => {
    tempoSegundos = 1500;
    alterarAtributos('foco');
    focoBt.classList.add('active');
    
})

curtoBt.addEventListener('click', () => {
    tempoSegundos = 300
    alterarAtributos('descanso-curto');
    curtoBt.classList.add('active');
    
})

longoBt.addEventListener('click', () => {
    tempoSegundos = 900
    alterarAtributos('descanso-longo');
    longoBt.classList.add('active');
    
})

function alterarAtributos(contexto){
    mostrarTempo()
    botoes.forEach(function (contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `./imagens/${contexto}.png`);    

    switch(contexto){
        case "foco":
            titulo.innerHTML = 
            `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
        break;

        case "descanso-curto":
            titulo.innerHTML =
            `Que tal dar uma respirada?<br> 
            <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
        break;
        case "descanso-longo":
            titulo.innerHTML =
            `Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
        break;
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoSegundos <= 0){
        musicaFim.play();
        alert("TEMPO ESGOTADO");
        zerar()
        return;
    }
    tempoSegundos -= 1;
    mostrarTempo()
    
}
    startPauseBt.addEventListener('click', iniciar)

    function iniciar(){
        if(intervaloId){
            zerar();
            musicaPause.play()
            return
        }
        intervaloId = setInterval(contagemRegressiva, 1000)
        pausarOuIniciarBt.textContent = "Pausar"
        pausarOuIniciarIcon.innerHTML = `<img class="app__card-primary-butto-icon" src="/imagens/play_arrow.png" display="none">
        <img class="app__card-primary-butto-icon" src="/imagens/pause.png" alt="">`
        musicaPlay.play()

    }

    function zerar() {
        clearInterval(intervaloId)
        pausarOuIniciarBt.textContent = "Começar"
        intervaloId = null;
    }
    function mostrarTempo(){
        const tempo = new Date(tempoSegundos * 1000);
        const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
        timer.innerHTML = `${tempoFormatado}`
    }
    mostrarTempo()