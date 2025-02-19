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

 export function abrirModal(event) {
    const pratoId = event.target.dataset.pratoId;
    const prato = pratos.find(p => p.id === Number(pratoId));
    
    document.getElementById('modal-prato').style.display = 'block';
    document.querySelector('.modal-imagem').src = prato.imagem;
    document.querySelector('.modal-titulo').textContent = prato.nome;
    document.querySelector('.modal-ingredientes').textContent = prato.ingredientes;
    document.querySelector('.modal-tempo').textContent = prato.tempoPreparo;
    document.querySelector('.modal-serve').textContent = prato.servePessoas;
    document.querySelector('.modal-descricao').textContent = prato.detalhes;
    document.querySelector('.modal-preco').textContent = `R$ ${prato.preco.toFixed(2)}`;
}

function fecharModal() {
    document.getElementById('modal-prato').style.display = 'none';
}

export const modal = { abrirModal, fecharModal };