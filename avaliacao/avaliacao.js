function enviarAvaliacao() {
    var nome = document.getElementById('nome').value;
    var comentario = document.getElementById('comentario').value;
    var avaliar = document.querySelector('input[name="avaliar"]:checked');

    if (nome && comentario && avaliar) {
        var avaliacoesSection = document.getElementById('avaliacoes');
        var novaAvaliacao = document.createElement('div');
        novaAvaliacao.classList.add('novaAvaliacao');

        if (avaliar.value > 1) {
            novaAvaliacao.innerHTML = '<p>Jogador: ' + nome + '</p>' +
                '<p>Comentário: ' + comentario + '</p>' +
                '<p>' + avaliar.value + ' estrelas</p>';
        } else {
            novaAvaliacao.innerHTML = '<p>Jogador: ' + nome + '</p>' +
                '<p> Comentário: ' + comentario + '</p>'+
                '<p>' + avaliar.value + ' estrela</p>';
        }

        avaliacoesSection.appendChild(novaAvaliacao);
        document.getElementById('nome').value = '';
        document.getElementById('comentario').value = '';
        avaliar.checked = false;

    } else {
        alert('Preencha todos os campos e selecione uma avaliação.');
    }
}
