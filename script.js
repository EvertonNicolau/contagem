// 1. CONFIGURAÇÕES INICIAIS
const DATA_EVENTO = new Date("Sep 13, 2026 18:00:00").getTime();

// Mapeamento dos elementos (garantindo que o DOM existe)
const elementos = {
    dias: document.getElementById('days'),
    horas: document.getElementById('hours'),
    minutos: document.getElementById('minutes'),
    segundos: document.getElementById('seconds'),
    timerContainer: document.getElementById('timer'),
    modal: document.getElementById("modal-rsvp"),
    btnConfirmar: document.getElementById("btn-confirmar"),
    closeBtn: document.querySelector(".close-button")
};

// 2. LÓGICA DO CONTADOR
function calcularTempoRestante(ms) {
    return {
        d: Math.floor(ms / (1000 * 60 * 60 * 24)),
        h: Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        m: Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60)),
        s: Math.floor((ms % (1000 * 60)) / 1000)
    };
}

function atualizarDisplay(tempo) {
    const formatar = (num) => num < 10 ? `0${num}` : num;
    if (elementos.dias) {
        elementos.dias.innerText = formatar(tempo.d);
        elementos.horas.innerText = formatar(tempo.h);
        elementos.minutos.innerText = formatar(tempo.m);
        elementos.segundos.innerText = formatar(tempo.s);
    }
}

const contagemRegressiva = setInterval(() => {
    const agora = new Date().getTime();
    const diferenca = DATA_EVENTO - agora;

    if (diferenca <= 0) {
        clearInterval(contagemRegressiva);
        if (elementos.timerContainer) {
            elementos.timerContainer.innerHTML = "<h2>É hoje! ❤️</h2>";
        }
        return;
    }

    const tempo = calcularTempoRestante(diferenca);
    atualizarDisplay(tempo);
}, 1000);

// 3. LÓGICA DO MODAL (RSVP)
if (elementos.btnConfirmar) {
    elementos.btnConfirmar.onclick = () => elementos.modal.style.display = "block";
    elementos.closeBtn.onclick = () => elementos.modal.style.display = "none";
    
    window.onclick = (event) => {
        if (event.target == elementos.modal) {
            elementos.modal.style.display = "none";
        }
    };
}

// 4. CARROSSEL DE BACKGROUND (Nova Estrutura de Pastas)
const imagensPreWedding = [
    'assets/background/foto-1.jpg',
    'assets/background/foto-2.jpg',
    'assets/background/foto-3.jpg',
    'assets/background/foto-4.jpg',
    'assets/background/foto-5.jpg',
    'assets/background/foto-6.jpg'
];

let indiceAtual = 0;

function trocarFotoFundo() {
    const gradiente = 'linear-gradient(180deg, rgba(74, 93, 78, 0.45) 0%, rgba(245, 242, 237, 0.65) 100%)';
    const urlImagem = `url('${imagensPreWedding[indiceAtual]}')`;
    
    document.body.style.backgroundImage = `${gradiente}, ${urlImagem}`;
    indiceAtual = (indiceAtual + 1) % imagensPreWedding.length;
}

// Inicia o carrossel e define o intervalo
trocarFotoFundo();
setInterval(trocarFotoFundo, 5000);
function copiarPix() {
    // 1. Defina aqui a sua chave PIX real (E-mail, CPF ou Telefone)
    const chavePix = "gabilu.lg80@gmail.com"; 

    // 2. Tenta copiar usando a API do navegador
    navigator.clipboard.writeText(chavePix).then(() => {
        // 3. Feedback visual para o usuário
        const btn = document.getElementById('btn-copiar');
        const textoOriginal = btn.innerText;
        
        btn.innerText = "✅ Copiado!";
        btn.style.backgroundColor = "#4A5D4E"; // Muda para o seu verde-folha
        
        // Retorna ao normal após 2 segundos
        setTimeout(() => {
            btn.innerText = textoOriginal;
            btn.style.backgroundColor = ""; 
        }, 2000);
        
    }).catch(err => {
        console.error('Erro ao copiar: ', err);
        alert("Erro ao copiar. A chave é: " + chavePix);
    });
}