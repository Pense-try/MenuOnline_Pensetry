export let carrinho = [];

export function adicionarAoCarrinho(nomePrato, pratos) {
    const prato = pratos.find(p => p.nome === nomePrato);
    const itemExistente = carrinho.find(item => item.nome === nomePrato);

    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({ ...prato, quantidade: 1 });
    }

    atualizarCarrinhoDOM();
}

export function removerDoCarrinho(nomePrato) {
    const index = carrinho.findIndex(item => item.nome === nomePrato);
    if (index !== -1) {
        carrinho.splice(index, 1);
    }

    atualizarCarrinhoDOM();
}

export function atualizarQuantidade(nomePrato, novaQuantidade) {
    const item = carrinho.find(item => item.nome === nomePrato);
    if (item) {
        item.quantidade = novaQuantidade;
        if (novaQuantidade < 1) removerDoCarrinho(nomePrato);
    }

    atualizarCarrinhoDOM();
}

// export function atualizarCarrinhoDOM() {
//     const container = document.getElementById('carrinho-itens');
//     container.innerHTML = '';

//     let total = 0;

//     carrinho.forEach(item => {
//         total += item.preco * item.quantidade;

//         const div = document.createElement('div');
//         div.className = 'carrinho-item';
//         div.innerHTML = `
//             <img src="${item.imagem}" alt="${item.nome}">
//             <div>
//                 <h4>${item.nome}</h4>
//                 <p>R$ ${item.preco.toFixed(2)}</p>
//                 <div class="quantidade-controle">
//                     <button onclick="atualizarQuantidade('${item.nome}', ${item.quantidade - 1})">-</button>
//                     <span>${item.quantidade}</span>
//                     <button onclick="atualizarQuantidade('${item.nome}', ${item.quantidade + 1})">+</button>
//                 </div>
//                 <button class="btn-remover" onclick="removerDoCarrinho('${item.nome}')">Remover</button>
//             </div>
//         `;
//         container.appendChild(div);
//     });

//     document.getElementById('carrinho-total').textContent = `R$ ${total.toFixed(2)}`;
// }

export function atualizarCarrinhoDOM() {
    const container = document.getElementById('carrinho-itens');
    if (!container) {
        console.error('Container do carrinho não encontrado!');
        return;
    }

    container.innerHTML = ''; // Limpa o conteúdo atual

    let total = 0;

    carrinho.forEach(item => {
        total += item.preco * item.quantidade;

        const div = document.createElement('div');
        div.className = 'carrinho-item';
        div.innerHTML = `
            <img src="${item.imagem}" alt="${item.nome}">
            <div>
                <h4>${item.nome}</h4>
                <p class="text-price-cart">R$ ${item.preco.toFixed(2)}</p>
                <div class="quantidade-controle">
                    <button onclick="atualizarQuantidade('${item.nome}', ${item.quantidade - 1})">-</button>
                    <span>${item.quantidade}</span>
                    <button onclick="atualizarQuantidade('${item.nome}', ${item.quantidade + 1})">+</button>
                </div>
                <button class="btn-remover" onclick="removerDoCarrinho('${item.nome}')">Remover</button>
            </div>
        `;
        container.appendChild(div);
    });

    const totalElement = document.getElementById('carrinho-total');
    if (totalElement) {
        totalElement.textContent = `R$ ${total.toFixed(2)}`;
    } else {
        console.error('Elemento do total não encontrado!');
    }
}

export function toggleCarrinho() {
    document.querySelector('.carrinho').classList.toggle('ativo');
}

export function fazerPedido() {
    const numeroWhatsApp = '5543996145479';
    let mensagem = 'Olá, gostaria de fazer o seguinte pedido:\n\n';

    carrinho.forEach(item => {
        mensagem += `${item.quantidade}x ${item.nome} - R$ ${(item.preco * item.quantidade).toFixed(2)}\n`;
    });

    const total = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
    mensagem += `\nTotal: R$ ${total.toFixed(2)}`;

    window.open(`https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`, '_blank');
}

// export function fazerPedido() {
//     // Abre o modal de finalização ao invés de enviar direto
//     const modal = document.getElementById('modal-finalizar');
//     modal.style.display = 'block';
// }

// // Nova função para enviar o pedido completo
// export function enviarPedidoCompleto() {
//     const nome = document.getElementById('nome').value;
//     const endereco = document.getElementById('endereco').value;
//     const pagamento = document.getElementById('pagamento').value;
//     const troco = document.getElementById('troco').value;
//     const observacoes = document.getElementById('observacoes').value;
    
//     if (!validarDados(nome, endereco, pagamento)) return;

//     const numeroWhatsApp = '5543996145479';
//     const mensagem = formatarMensagem(nome, endereco, pagamento, troco, observacoes);
    
//     window.open(`https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`, '_blank');
//     fecharModalFinalizacao();
// }

// function validarDados(nome, endereco, pagamento) {
//     if (!nome || !endereco || !pagamento) {
//         alert('Por favor, preencha todos os campos obrigatórios!');
//         return false;
//     }
//     if (pagamento === 'Dinheiro' && !troco) {
//         alert('Por favor, informe o valor para troco!');
//         return false;
//     }
//     return true;
// }

// function formatarMensagem(nome, endereco, pagamento, troco, observacoes) {
//     let mensagem = `*Pedido realizado via site*\n\n`;
//     mensagem += `*Cliente:* ${nome}\n`;
//     mensagem += `*Endereço:* ${endereco}\n\n`;
//     mensagem += `*Itens do pedido:*\n${carrinho.map(item => 
//         `${item.quantidade}x ${item.nome} - R$ ${(item.preco * item.quantidade).toFixed(2)}`
//     ).join('\n')}\n\n`;
//     mensagem += `*Total:* R$ ${calcularTotal().toFixed(2)}\n`;
//     mensagem += `*Forma de pagamento:* ${pagamento}\n`;
//     if (troco) mensagem += `*Troco para:* R$ ${parseFloat(troco).toFixed(2)}\n`;
//     if (observacoes) mensagem += `\n*Observações:*\n${observacoes}`;
    
//     return mensagem;
// }

// function fecharModalFinalizacao() {
//     document.getElementById('modal-finalizar').style.display = 'none';
//     document.getElementById('form-finalizar').reset();
// }

// // Mostrar campo de troco quando selecionar dinheiro
// document.getElementById('pagamento').addEventListener('change', (e) => {
//     const trocoContainer = document.getElementById('troco-container');
//     trocoContainer.style.display = e.target.value === 'Dinheiro' ? 'block' : 'none';
//     if (e.target.value !== 'Dinheiro') document.getElementById('troco').value = '';
// });

// // Submissão do formulário
// document.getElementById('form-finalizar').addEventListener('submit', (e) => {
//     e.preventDefault();
//     enviarPedidoCompleto();
// });