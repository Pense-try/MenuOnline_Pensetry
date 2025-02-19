import { pratos } from './data.js';

// filters.js
export function filtrarPratos() {
    const termo = document.getElementById('busca').value.toLowerCase();
    const categoriaAtiva = document.querySelector('.btn-filtro.active').textContent.toLowerCase();
    const categorias = document.querySelectorAll('.categoria-container');

    categorias.forEach(categoriaSection => {
        const categoriaNome = categoriaSection.querySelector('.categoria-titulo').textContent.toLowerCase();
        const deveMostrar = categoriaAtiva === 'todos' || categoriaNome === categoriaAtiva;

        if (deveMostrar) {
            const pratos = categoriaSection.querySelectorAll('.prato');
            let hasVisible = false;

            pratos.forEach(prato => {
                const nomePrato = prato.querySelector('h3').textContent.toLowerCase();
                const visivel = nomePrato.includes(termo);
                prato.style.display = visivel ? 'block' : 'none';
                if (visivel) hasVisible = true;
            });

            categoriaSection.style.display = hasVisible ? 'block' : 'none';
        } else {
            categoriaSection.style.display = 'none';
        }
    });
}

export function criarBotoesFiltro() {
    const categorias = ['Todos', ...new Set(pratos.map(prato => prato.categoria))];
    const container = document.getElementById('filtros-container');

    categorias.forEach(categoria => {
        const button = document.createElement('button');
        button.className = 'btn-filtro';
        button.textContent = categoria;

        // Define "Todos" como ativo inicialmente
        if (categoria === 'Todos') {
            button.classList.add('active');
        }

        button.onclick = () => filtrarPorCategoria(categoria);
        container.appendChild(button);
    });
}

export function filtrarPorCategoria(categoria) {
    document.querySelectorAll('.btn-filtro').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.toLowerCase() === categoria.toLowerCase());
    });

    const termoBusca = document.getElementById('busca').value.toLowerCase();
    const categorias = document.querySelectorAll('.categoria-container');

    categorias.forEach(categoriaSection => {
        const categoriaNome = categoriaSection.querySelector('.categoria-titulo').textContent;
        const deveMostrar = categoria === 'Todos' || categoriaNome === categoria;

        categoriaSection.style.display = deveMostrar ? 'block' : 'none';

        if (deveMostrar) {
            const pratos = categoriaSection.querySelectorAll('.prato');
            pratos.forEach(prato => {
                const nomePrato = prato.querySelector('h3').textContent.toLowerCase();
                prato.style.display = nomePrato.includes(termoBusca) ? 'block' : 'none';
            });
        }
    });
}