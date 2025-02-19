export function initModal() {
    const modal = document.createElement('div');
    modal.id = 'modal-prato';
    modal.innerHTML = `
        <div class="modal-conteudo">
            <span class="fechar-modal">&times;</span>
            <img class="modal-imagem" src="" alt="">
            <div class="modal-info">
                <h2 class="modal-titulo"></h2>
                <p class="modal-ingredientes"></p>
                <div class="modal-detalhes">
                    <p><strong>Tempo de preparo:</strong> <span class="modal-tempo"></span></p>
                    <p><strong>Serve:</strong> <span class="modal-serve"></span></p>
                </div>
                <p class="modal-descricao"></p>
                <p class="modal-preco"></p>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Event listeners
    document.querySelectorAll('.btn-saiba-mais').forEach(btn => {
        btn.addEventListener('click', abrirModal);
    });
    
    document.querySelector('.fechar-modal').addEventListener('click', fecharModal);
    modal.addEventListener('click', (e) => {
        if(e.target === modal) fecharModal();
    });
}

export function abrirModal(prato) { // Recebe o objeto prato diretamente
    const modal = document.getElementById('modal-prato');
    
    // Preenche os dados do modal
    modal.querySelector('.modal-imagem').src = prato.imagem;
    modal.querySelector('.modal-titulo').textContent = prato.nome;
    modal.querySelector('.modal-ingredientes').textContent = prato.ingredientes;
    modal.querySelector('.modal-tempo').textContent = prato.tempoPreparo;
    modal.querySelector('.modal-serve').textContent = prato.servePessoas;
    modal.querySelector('.modal-descricao').textContent = prato.detalhes;
    modal.querySelector('.modal-preco').textContent = `R$ ${prato.preco.toFixed(2)}`;
    
    modal.style.display = 'block';
}

function fecharModal() {
    document.getElementById('modal-prato').style.display = 'none';
}

export const modal = { abrirModal, fecharModal };