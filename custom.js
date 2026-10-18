const btnOpen = document.getElementById('btnOpen');
const panelWrap = document.getElementById('panelWrap');

btnOpen.addEventListener('click', () => {
    panelWrap.classList.add('opened')
})