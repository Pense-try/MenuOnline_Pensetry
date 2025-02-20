// init.js
import { pratos } from './data.js';
import { initMenu } from './menu.js';
import { criarBotoesFiltro, filtrarPratos } from './filters.js';
import { abrirModal } from './modal.js';
import { initViewMode, toggleViewMode } from './view.js';
import {
    adicionarAoCarrinho,
    removerDoCarrinho,
    atualizarQuantidade,
    atualizarCarrinhoDOM,
    fazerPedido,
    toggleCarrinho
} from './cart.js';
import { mostrarNotificacao } from './utils.js';

// Configura eventos globais
window.adicionarAoCarrinho = (nomePrato) => {
    adicionarAoCarrinho(nomePrato, pratos);
    atualizarCarrinhoDOM();
    mostrarNotificacao();
};
window.removerDoCarrinho = removerDoCarrinho;
window.atualizarQuantidade = atualizarQuantidade;
window.toggleCarrinho = toggleCarrinho;
window.fazerPedido = fazerPedido;
window.filtrarPratos = filtrarPratos;
window.toggleViewMode = toggleViewMode;

// Inicializa o site
document.addEventListener('DOMContentLoaded', () => {
    initMenu();
    initViewMode();
    criarBotoesFiltro();
    abrirModal();
});

