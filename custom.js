const btnOpen = document.getElementById('btnOpen');
const menu = document.getElementById('menu');
const menuOpened = document.getElementById('menuOpened');
const panelWrap = document.getElementById('panelWrap');

btnOpen.addEventListener('click', () => {
    panelWrap.classList.add('opened')
})