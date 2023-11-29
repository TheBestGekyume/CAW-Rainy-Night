let cont = 0;
let legenda = document.getElementById('legenda');
let img = document.getElementById('img2');
let divEscolhas = document.getElementById('escolhas');
let divAlt = document.getElementById('divAlt'); //div que será manipulada (divAlteração)
let textoAlt = document.getElementById('divTexto');
const chuva = document.getElementById('rain-audio');
const musica = document.getElementById('caixa-audio');

chuva.volume = 0.1;
chuva.muted = false; // a chuva é "desmutada" no javascript para que "chuva.volume = 0.1" carregue junto com audio

divEscolhas.style.opacity = 0;

function delay(func, time) {
    setTimeout(func, time);
}

function exibirDivEscolhas() {
    divEscolhas.style.opacity = 1;
}

function efeitoDigit() {
    legenda.classList.remove('digitando');
    legenda.offsetWidth;
    legenda.classList.add('digitando');
}

function exibirDivAlt() {
    divAlt.style.display = "flex";
    divAlt.style.opacity = 1;
}

function receberMsg() {
    legenda.textContent = 'Quem é esse? [Você recebeu uma mensagem de um desconhecido]';
    efeitoDigit();
}

function imagemOpac(n) {

    img.style.transition = "opacity 1s 0.5s";
    if (n != 1 && n != 0) {
        img.style.transition = "opacity 4s 0.5s";
    }
    if (n != 0) {
        n = 1;
    }
    img.style.opacity = n;
}

function novaLegenda(str) {
    legenda.textContent = str;
    efeitoDigit();
}

function transicao() {
    divAlt.style.opacity = 0;
    imagemOpac(0);
}

function fimDeJogo(){
    divAlt.style.opacity = 1;
    divAlt.classList.remove('divAlt1');
    divAlt.classList.remove('divAlt2');
    divAlt.classList.remove('divAlt3');
    divAlt.classList.add('divAlt4');
    divAlt.innerHTML = '<h2>FIM DE JOGO</h2>'
    divEscolhas.innerHTML = '<a href="game.html"> <button>Jogar Novamente</button> </a>' +
            '<a href="../avaliacao/avaliacao.html"><button>Avaliar o Jogo</button></a>' +
            '<a href="../index.html"><button>Home Page</button></a>';
}

document.addEventListener("DOMContentLoaded", imagemOpac);
document.addEventListener("DOMContentLoaded", delay(exibirDivAlt, 5000));
document.addEventListener("DOMContentLoaded", delay(receberMsg, 6000));
document.addEventListener("DOMContentLoaded", delay(exibirDivEscolhas, 7500));

function aux(opc) {

    transicao();

    switch (opc) {
        case 1: //PEGAR PACOTE

            novaLegenda('[Mesmo descrente, você espera, mas o mal pressentimento é inevitável]');
            divEscolhas.innerHTML = '<button onclick="aux(2)">Continuar</button>';
            break;

        case 2: //ATENDER OU NÃO A PORTA
            divAlt.innerHTML = '<audio autoplay hidden> ' +
                '<source src="../audio/campainha.mp3" type="audio/mp3"></audio>';
            novaLegenda('[01:00 Hora e a campainha toca]');
            if (cont != 1) {
                divEscolhas.innerHTML = '<button onclick="aux(3)">Continuar</button>';
            } else {
                divEscolhas.innerHTML = '<button onclick="aux(3)">Atender</button>' +
                    '<button onclick="escolher(13)">Não atender</button>';
            }
            break;

        case 3: //PEGAR PACOTE OU NÃO PACOTE
            divAlt.innerHTML = '<audio autoplay hidden> ' +
                '<source src="../audio/abrir-porta.mp3" type="audio/mp3"></audio>'
            novaLegenda('[Você abre a porta, sente um frio na espinha, e lá está um pacote, bem na frente da sua porta]');
            if (cont != 1) {
                divEscolhas.innerHTML = '<button onclick="aux(4)">Continuar</button>';
            } else {
                divEscolhas.innerHTML = '<button onclick="aux(4)">Pegar o Pacote</button>' +
                    '<button onclick="aux(6)">Não Pegar o Pacote</button>';
            }
            break;

        case 4: //PEGAR PACOTE
            divAlt.innerHTML = '<audio autoplay hidden> ' +
                '<source src="../audio/fechar-porta.mp3" type="audio/mp3"></audio>'
            novaLegenda('[Você pega o pacote e volta pro pc]');
            divEscolhas.innerHTML = '<button onclick="escolher(6)">Continuar</button>';
            break;

        case 5: //RECUSAR LIGAÇÃO
            cont = 1;
            divAlt.innerHTML = '';
            divAlt.style.opacity = 0;
            novaLegenda('É melhor não atender uma chamada de um desconhecido.');
            divEscolhas.innerHTML = '<button onclick="aux(2);">Continuar</button>';
            break;

        case 6: //NÃO PEGAR PACOTE
            divAlt.innerHTML = '<audio autoplay hidden> ' +
                '<source src="../audio/fechar-porta.mp3" type="audio/mp3"></audio>'
            novaLegenda('[Você não pega o pacote e volta pro pc]');
            divEscolhas.innerHTML = '<button onclick="escolher(13)">Continuar</button>';
            break;


        case 7: //MORTE PELA ABERTURA DA CAIXA
            transicao();
            novaLegenda('ເຈົ້າໄດ້ຖືກເຕືອນແລ້ວ, ດຽວນີ້ຈິດວິນຍານຂອງເຈົ້າເປັນຂອງຂ້ອຍ.');
            divEscolhas.innerHTML = '<button onclick="aux(8)">Continuar</button>';
            break;

        case 8: //MORTE PELA ABERTURA DA CAIXA (FIM DE JOGO)
            fimDeJogo();
            novaLegenda('[Você sente cada osso do seu corpo se quebrando e a sua vida se esvai por completo]');
            divEscolhas.innerHTML = '<audio autoplay hidden> ' +
                '<source src="../audio/ossos-quebrando.mp3" type="audio/mp3"></audio>' +
                '<a href="game.html"> <button>Jogar Novamente</button> </a>' +
                '<a href="../avaliacao/avaliacao.html"><button>Avaliar o Jogo</button></a>' +
                '<a href="../index.html"><button>Home Page</button></a>';
            break;

        case 9: //RECEBER CAIXA E IR DORMIR
            novaLegenda('Enfim, já está tarde, amanhã eu preciso acordar cedo para trabalhar.');
            divEscolhas.innerHTML = '<button onclick="aux(10)">Continuar</button>';
            break;

        case 10: //ACORDAR 1/2
            chuva.muted = true;
            novaLegenda('[Você acorda e tudo parece perfeitamente normal]');
            divEscolhas.innerHTML = '<button onclick="aux(11)">Continuar</button>';
            break;
            
        case 11: //ACORDAR 2/2
            imagemOpac(1);
            img.src = '../img/manha.png';
            novaLegenda('[Você olha pra caixa e se pergunta novamente se deveria abri-la]');
            divEscolhas.innerHTML = '<button onclick="aux(12)">Abrir</button>' + 
            '<button onclick="aux(13)">Ir Trabalhar</button>';
            break;

        case 12: //ABRIR A CAIXA DE MANHÃ (FIM DE JOGO)
            fimDeJogo();
            novaLegenda('[A Caixa está vazia e você se sente muito desconfortável após saber disso]Como isso estava tão pesado?');
            break;

        case 13: //TRABALHAR SEM ABRIR A CAIXA (FIM DE JOGO)
            fimDeJogo();
            novaLegenda('Isso não importa agora, melhor eu ir andando para não me atrasar.');
            break;

        case 14: //ESPERAR A CHUVA PASSAR COM A CAIXA
            imagemOpac(1);
            novaLegenda('[São 4:15 da manhã e a chuva passou] Ok, agora eu posso abrir!');
            chuva.muted = 'true';
            img.src = '../img/manha.png';
            divEscolhas.innerHTML = '<button onclick="aux(12)">Abrir</button>' + 
            '<button onclick="aux(15)">Não Abrir</button>';
            break;

        case 15: //ESPEROU A CHUVA PASSAR E NÃO ABRIU A CAIXA(FIM DE JOGO)
            fimDeJogo();
            novaLegenda('Isso já passou dos limites, eu preciso dormir o resto da noite e ir trabalhar.');
            break;
        
    }
}

function escolher(option) {

    document.getElementById('img1').style.opacity = 0;

    switch (option) {
        case 1: //VER MENSAGEM
            novaLegenda('[Você abre a mensagem e lê]');
            divAlt.classList.remove('divAlt1');
            divAlt.classList.remove('divAlt3');
            divAlt.classList.add('divAlt2');
            divAlt.style.opacity = 1;
            textoAlt.textContent = 'Anjo da Morte\n\n' +
                'Você receberá um pacote na sua casa hoje, as uma\nhora da manhã, ' +
                'se você pegá-la tudo ficará bem,caso\ncontrário eu não poderei garantir a sua segurança.';

            divEscolhas.innerHTML = '<button onclick="aux(1)">Aceitar e pegar a entrega</button>' +
                '<button onclick="escolher(4)">Bloquear e não pegar</button>';
            break;

        case 2: //IGNORAR MENSAGEM
            novaLegenda('Que estranho, será que eu deveria atender?');
            divAlt.classList.remove('divAlt2');
            divAlt.classList.add('divAlt3');
            divAlt.innerHTML = '<audio autoplay hidden> ' +
                '<source src="../audio/receber-ligacao.mp3" type="audio/mp3"></audio>' +
                '<p id="divTexto">CHAMADA RECEBIDA\nANJO DA MORTE</p>' +
                '<img src="../img/chamada.png" alt="chamada">';
            divEscolhas.innerHTML = '<button onclick="escolher(5)">Atender</button>' +
                '<button onclick="aux(5);">Recusar</button>';
            break;

        case 3: //ACEITAR E PEGAR A ENTREGA
            aux(1);
            break;

        case 4: //BLOQUEAR E NÃO PEGAR
            cont = 1;
            aux(2);
            break;

        case 5: //ATENDER LIGAÇÃO
            novaLegenda('[Você ouve ruídos estranhos] Alo? Será que eu deveria ler a mensagem?');
            divAlt.classList.remove('divAlt2');
            divAlt.classList.add('divAlt3');
            divAlt.innerHTML = '<audio autoplay hidden> ' +
                '<source src="../audio/ruidos.mp3" type="audio/mp3"></audio>' +
                '<img src="../img/angel-of-death.png" alt="chamada">' +
                '<p id="divTexto">ANJO DA MORTE\nchamada em andamento</p>';

            divEscolhas.innerHTML = '<button onclick="escolher(7)">Ver Mensagem</button>' +
                '<button onclick="escolher(4)">Ignorar e Bloquear</button>';
            break;

        case 6: //CONTINUAÇÃO DO 3
            img.src = '../img/black-box-zoom.png';
            imagemOpac(1);
            divAlt.classList.remove('divAlt1');
            divAlt.classList.remove('divAlt3');
            divAlt.classList.add('divAlt2');
            novaLegenda('Que p@@ra é essa? Como uma caixa tão pequena pesa tanto?');
            divEscolhas.innerHTML = '<button onclick="escolher(8)">Continuar</button>';
            break;

        case 7: //VER MENSAGEM DEPOIS DE IGNORAR
            novaLegenda('[Você abre a mensagem e lê]');
            divAlt.classList.remove('divAlt3');
            divAlt.classList.add('divAlt2');
            divAlt.style.opacity = 1;
            divAlt.innerHTML = '<p id="divTexto">Anjo da Morte\n\n' +
                'Você receberá uma entrega na sua casa hoje, as uma\nhora da manhã,' +
                'se você pegá-la tudo ficará bem,caso\ncontrário eu não poderei garantir a sua segurança.</p>';
            divEscolhas.innerHTML = '<button onclick="escolher(3)">Aceitar e pegar a entrega</button>' +
                '<button onclick="escolher(4)">Bloquear e não pegar</button>';
            break;

        case 8: //CONTINUAÇÃO DO 7
            novaLegenda('Eu deveria abrir isso?');
            divAlt.style.opacity = 1;
            divAlt.innerHTML = '<p id="divTexto">Anjo da Morte\n\nNão abra até que não seja mais possível ouvir o choro.</p>';
            divEscolhas.innerHTML = '<button onclick="escolher(9);">Abrir</button>' +
                '<button onclick="escolher(11)">Não Abrir</button>';
            break;

        case 9: //ABRIR CAIXA
            transicao();
            novaLegenda('Eu não ouço ninguém chorando, vou abrir isso e talvez eu chame a polícia depois.');
            divEscolhas.innerHTML = '<button onclick="escolher(10);">Continuar</button>';
            break;

        case 10: //CONTINUAÇÃO DA ABERTURA
            imagemOpac(1);
            musica.play();
            musica.volume = 0.12;
            novaLegenda('[Você tenta abrir a caixa mas a sua mão queima ao tocar] M@RDA, A CAIXA TA SANGRANDO?!');
            img.src = '../img/bloody-box-zoom.png';
            divEscolhas.innerHTML = '<button onclick="aux(7);">Continuar</button>';
            break;

        case 11:
            novaLegenda('[Você fica muito tentado a abrir a caixa] Será que é seguro fazer isso?');
            divAlt.style.opacity = 0;
            divEscolhas.innerHTML = '<button onclick="escolher(10);">Abrir</button>' +
            '<button onclick="escolher(12)">Não Abrir</button>';
            break;

        case 12:
            novaLegenda('Já está tarde, mas eu realmente queria saber o que tem aí dentro.');
            divAlt.style.opacity = 0;
            divEscolhas.innerHTML =  '<button onclick="aux(9)">Ir Dormir</button>' + 
            '<button onclick="aux(14)">Esperar a Chuva Passar</button>';
            break;

        case 13: // NÃO PEGAR O PACOTE
            divAlt.classList.remove('divAlt3');
            divAlt.classList.add('divAlt2');
            imagemOpac(1);
            novaLegenda('Eu deveria chamar a polícia, ou talvez só dormir.');
            divEscolhas.innerHTML = '<button onclick="escolher(14);">Ligar Para 190</button>' +
                '<button onclick="escolher(14)">Ir Dormir</button>';
            break;

        case 14: // AVISO POR NÃO PEGAR O PACOTE
            divAlt.style.opacity = 1;
            novaLegenda('Que choro? Eu não tinha bloqueado ele?');
            divAlt.innerHTML = '<p id="divTexto">Anjo da Morte\n\nNão durma, não chame a polícia e nem tente ' +
                'pegar o\npacote agora, aquilo é muito mais rápido que você,\nporém o único sentido daquilo é a audição.\nA sua uníca chance é ficar imóvel até ' +
                'que não\nseja possível escutar mais o choro.</p>'
            divEscolhas.innerHTML = '<button onclick="escolher(15);">Ir Dormir</button>' +
                '<button onclick="escolher(16)">Ligar Para 190</button>' +
                '<button onclick="escolher(18)">Ficar Imóvel</button>';
            break;

        case 15: //IR DORMIR OU SE MOVER SEM A CAIXA
            imagemOpac(0);
            transicao();
            divAlt.innerHTML = '<audio autoplay hidden> ' +
                '<source src="../audio/abrir-porta.mp3" type="audio/mp3"></audio>';
            novaLegenda('[Você fica paralisado ao ouvir a porta do seu apartamento se abrindo enquanto começa a se levantar]');
            divEscolhas.innerHTML = '<button onclick="escolher(17);">Continuar</button>';
            break;

        case 16: //LIGANDO 190 SEM A CAIXA
            transicao();
            divAlt.innerHTML = '<audio autoplay hidden> ' +
                '<source src="../audio/abrir-porta.mp3" type="audio/mp3"></audio>' +
                '<audio autoplay hidden><source src="../audio/ligando190.mp3" type="audio/mp3"></audio>';
            novaLegenda('[Você fica paralisado ao ouvir a porta do seu apartamento se abrindo enquanto seu telefone toca]');
            divEscolhas.innerHTML = '<button onclick="escolher(17);">Continuar</button>';
            break;

        case 17: //MORTE POR ATAQUE(FIM DE JOGO)
            imagemOpac(0);
            fimDeJogo();
            divAlt.innerHTML = '<audio autoplay hidden> ' +
                '<source src="../audio/morte.mp3" type="audio/mp3"></audio>' +
                '<h2>FIM DE JOGO</h2>';
            novaLegenda('[Inevitavelmente é o seu fim...]');
            break;

        case 18: //PRIMEIRA VEZ IMÓVEL
            divAlt.style.opacity = 0;
            img.style.opacity = 0.8;
            novaLegenda('[Você está na mesma posição a cerca de uma hora e a luz do apartamento parece fraca]');
            divEscolhas.innerHTML = '<button onclick="escolher(19);">Continuar Imóvel</button>' +
                '<button onclick="escolher(15)">Se Mover</button>';
            break;

        case 19: //SEGUNDA VEZ IMÓVEL
            img.style.opacity = 0.6;
            novaLegenda('[Você está na mesma posição a cerca de duas horas e a luz do apartamento está mais fraca]');
            divEscolhas.innerHTML = '<button onclick="escolher(20);">Continuar Imóvel</button>' +
                '<button onclick="escolher(15)">Se Mover</button>';
            break;

        case 20: //TERCEIRA VEZ IMÓVEL
            img.style.opacity = 0.4;
            divAlt.innerHTML = '<audio autoplay hidden> ' +
                '<source src="../audio/abrir-porta.mp3" type="audio/mp3"></audio>'
            novaLegenda('[Você está na mesma posição a cerca de três horas, quase não há luz e a porta do apartamento se abriu]');
            divEscolhas.innerHTML = '<button onclick="escolher(21);">Continuar Imóvel</button>' +
                '<button onclick="escolher(17)">Se Mover</button>';
            break;

        case 21: //FICAR IMÓVEL A NOITE TODA(FIM DE JOGO)
            chuva.muted = true;
            fimDeJogo();
            img.src = '.../img/4&15.png';
            imagemOpac(1);
            divAlt.style.opacity = 1;
            novaLegenda('[Agora são 4:15 da manhã, a chuva parou, a luz voltou, tudo parece normal]');
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const volumeOn = document.getElementById("volumeOn");
    const volumeOff = document.getElementById("volumeOff");

    volumeOn.style.display = "inline-block";
    volumeOff.style.display = "none";

    volumeOn.addEventListener("click", function () {
        chuva.muted = true;
        volumeOn.style.display = "none";
        volumeOff.style.display = "inline-block";
    });

    volumeOff.addEventListener("click", function () {
        chuva.muted = false;
        volumeOn.style.display = "inline-block";
        volumeOff.style.display = "none";
    });
});
