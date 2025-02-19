import { pratos } from './data.js';
import { abrirModal } from './modal.js';

export function initMenu() {
    const container = document.getElementById('menu-categorias');
    const categorias = agruparPorCategoria(pratos);

    for (const [categoria, pratosCategoria] of Object.entries(categorias)) {
        const section = document.createElement('section');
        section.className = 'categoria-container';
        section.innerHTML = `
            <h2 class="categoria-titulo">${categoria}</h2>
            <div class="carrossel-container">
                <div class="pratos-container" id="${categoria.toLowerCase()}"></div>
            </div>
        `;

        const pratosContainer = section.querySelector('.pratos-container');
        pratosCategoria.forEach(prato => adicionarPratoDOM(prato, pratosContainer));

        container.appendChild(section);
    }
}

function agruparPorCategoria(pratos) {
    return pratos.reduce((acc, prato) => {
        if (!acc[prato.categoria]) {
            acc[prato.categoria] = [];
        }
        acc[prato.categoria].push(prato);
        return acc;
    }, {});
}

function adicionarPratoDOM(prato, container) {
    const div = document.createElement('div');
    div.className = 'prato';
    div.innerHTML = `
        <img src="${prato.imagem}" alt="${prato.nome}">
        <div class="prato-info">
            <h3 class="title-prato">${prato.nome}</h3>
            <p class="text-primary">
                ${prato.ingredientes}
                 <span class="saiba-mais">... saiba mais</span>
            </p>
            <p class="text-price">R$ ${prato.preco.toFixed(2)}</p>
            <button class="btn-adicionar" onclick="adicionarAoCarrinho('${prato.nome}')">Adicionar</button>
        </div>
    `;

     // Adiciona o evento de clique corretamente
     div.querySelector('.saiba-mais').addEventListener('click', (e) => {
        e.preventDefault();
        abrirModal(prato); // Passa o objeto completo do prato
    });

    container.appendChild(div);
}