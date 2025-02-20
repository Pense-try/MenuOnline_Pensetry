// modal.js
export function abrirModal(prato) {
    const modal = document.getElementById('modal-prato');
    
    // Verificação de segurança
    if (!modal) {
        console.error('Modal não encontrado! Verifique o HTML');
        return;
    }

    // Elementos do modal
    const elementos = {
        imagem: modal.querySelector('.modal-imagem'),
        titulo: modal.querySelector('.modal-titulo'),
        ingredientes: modal.querySelector('.modal-ingredientes'),
        tempo: modal.querySelector('.modal-tempo'),
        serve: modal.querySelector('.modal-serve'),
        descricao: modal.querySelector('.modal-descricao'),
        preco: modal.querySelector('.modal-preco')
    };

    // Preenche os dados
    elementos.imagem.src = prato.imagem;
    elementos.titulo.textContent = prato.nome;
    elementos.ingredientes.textContent = prato.ingredientes;
    elementos.tempo.textContent = prato.tempoPreparo;
    elementos.serve.textContent = prato.servePessoas;
    elementos.descricao.textContent = prato.detalhes;
    elementos.preco.textContent = `R$ ${prato.preco.toFixed(2)}`;

    // Exibe o modal
    modal.style.display = 'flex';
}

// Função para fechar o modal
export function fecharModal() {
    const modal = document.getElementById('modal-prato');
    if (modal) modal.style.display = 'none';
}

// Configura o clique fora do modal
document.addEventListener('click', (e) => {
    const modal = document.getElementById('modal-prato');
    if (e.target === modal) fecharModal();
});

// Configura o botão de fechar
document.querySelector('.fechar-modal-prato')?.addEventListener('click', fecharModal);

export const modal = { abrirModal, fecharModal };