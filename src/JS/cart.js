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
    const numeroWhatsApp = '5543984339297';
    let mensagem = 'Olá, gostaria de fazer o seguinte pedido:\n\n';

    carrinho.forEach(item => {
        mensagem += `${item.quantidade}x ${item.nome} - R$ ${(item.preco * item.quantidade).toFixed(2)}\n`;
    });

    const total = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
    mensagem += `\nTotal: R$ ${total.toFixed(2)}`;

    window.open(`https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`, '_blank');
}

