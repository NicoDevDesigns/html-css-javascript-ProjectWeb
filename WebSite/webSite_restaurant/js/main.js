const menu = document.querySelector('.hamburguesa');
const navegacion = document.querySelector('.navegacion');


document.addEventListener('DOMContentLoaded',()=>{
    eventos();
    console.log(menu)
});
const eventos = ()=>{
    menu.addEventListener('click',abrirMenu)
}
const abrirMenu = ()=>{
    navegacion.classList.remove('ocultar');
    botonCerrar();
}
const botonCerrar = ()=>{
    const btnCerrar = document.createElement('p');
    btnCerrar.textContent="X";
    btnCerrar.classList.add('btn-cerrar');
    navegacion.appendChild(btnCerrar)
}