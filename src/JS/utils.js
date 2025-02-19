export function mostrarNotificacao() {
    const notificacao = document.getElementById('notificacao');
    notificacao.style.display = 'block';

    setTimeout(() => {
        notificacao.style.display = 'none';
    }, 2500);
}