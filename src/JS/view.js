let isCarrosselView = true;

// export function toggleViewMode() {
//     const container = document.getElementById('menu-categorias');
//     const toggleText = document.getElementById('viewModeText');

//     isCarrosselView = !isCarrosselView;

//     if (isCarrosselView) {
//         container.classList.remove('grid-view');
//         container.classList.add('carrossel-view');
//         toggleText.textContent = 'Carrossel';
//     } else {
//         container.classList.remove('carrossel-view');
//         container.classList.add('grid-view');
//         toggleText.textContent = 'Grade';
//     }
// }

export function toggleViewMode() {
    const container = document.getElementById('menu-categorias');
    const toggleText = document.getElementById('viewModeText');
    const menu = document.querySelector('.menu'); // Seleciona o elemento do menu

    isCarrosselView = !isCarrosselView;

    if (isCarrosselView) {
        container.classList.remove('grid-view');
        container.classList.add('carrossel-view');
        toggleText.textContent = 'Carrossel';
        
        // Adiciona/remove classes do menu
        menu.classList.remove('menu-grid');
        menu.classList.add('menu-carrossel');
    } else {
        container.classList.remove('carrossel-view');
        container.classList.add('grid-view');
        toggleText.textContent = 'Grade';
        
        // Adiciona/remove classes do menu
        menu.classList.remove('menu-carrossel');
        menu.classList.add('menu-grid');
    }
}

export function initViewMode() {
    const container = document.getElementById('menu-categorias');
    container.classList.add(isCarrosselView ? 'carrossel-view' : 'grid-view');
}