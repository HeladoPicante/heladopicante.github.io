document.addEventListener('DOMContentLoaded', function(){
    desplegarNavegacion()
    cambiarEnlaceSegunResolucion()
    window.addEventListener('resize', cambiarEnlaceSegunResolucion)
    selecionarCategoria()
    flipImg()
    crearGaleria()
    configurarCategorias()
})

function desplegarNavegacion() {
    const burger = document.querySelector('.burger')
    const nav = document.querySelector('.navegacion-principal')

    burger.addEventListener('click', ()=>{
        nav.classList.toggle('activo')
    })
}

function flipImg(){
    const btns = document.querySelectorAll('.btn-ver')

    btns.forEach(boton => {
        boton.addEventListener('click', ()=>{
            const card = boton.closest('.producto') // selecciono el producto más cercano
            boton.textContent = "Ver más"

            if (card){
                card.classList.toggle('flipped')
            }
            
            if(card.classList.contains('flipped')){
                boton.textContent = "Ver menos"
            }
        })
    })
}

function crearGaleria(categoriaActual = 'todos') {
    const galeria = document.querySelector('.galeria-imagenes')
    const categorias = {
        'camisas': 0,
        'camisetas': 5,
        'chalecos': 5,
        'overol': 6,
        'uniformes': 6,
    }

    // categorias.forEach(categoria => {
    //     console.log(categoria);
        
    // })

    galeria.innerHTML = ''
    if(categoriaActual === 'todos'){
        Object.keys(categorias).forEach(categoria => {
            agregarImagenes(categoria, galeria, categorias[categoria])
            
        })
    }else{

        if(categorias[categoriaActual] === 0){
            galeria.innerHTML = `
                <p class="no-hay-imagenes">No hay imágenes disponibles</p>
            `
        }
        agregarImagenes(categoriaActual, galeria, categorias[categoriaActual])
    }
}

function agregarImagenes(categoriaActual, galeria, cantImgs) {
    for(let i = 1; i <= cantImgs; i++){
        const imagen = document.createElement('PICTURE');
        const rutaBase = `build/img/gallery/${categoriaActual}/thumb/${i}`;
        imagen.innerHTML = `
            <source srcset="${rutaBase}.avif" type="image/avif">
            <source srcset="${rutaBase}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="${rutaBase}.jpg" alt="imagen ${categoriaActual}">
        `;

        // EVENT HANDLER
        imagen.onclick = function () {
            mostrarImagen(i, categoriaActual);
        };
        
        
        galeria.appendChild(imagen);
        
    }
}

function configurarCategorias() {
    const categorias = document.querySelectorAll('.categoria');

    categorias.forEach(categoria => {
        categoria.addEventListener('click', () => {
            const categoriaActual = categoria.dataset.categoria;
            crearGaleria(categoriaActual);
        });
    });
}

function mostrarImagen(i, categoriaActual) {
    // const imagen = document.createElement('IMG')
    // imagen.src = `src/img/gallery/full/${i}.jpg`
    // imagen.alt = 'Imagen de galería'
    const imagen = document.createElement('PICTURE')
    imagen.innerHTML = `
    <source srcset="build/img/gallery/${categoriaActual}/full/${i}.avif" type="image/avif">
    <source srcset="build/img/gallery/${categoriaActual}/full/${i}.webp" type="image/webp">
    <img loading="lazy" width="200" height="300" src="build/img/gallery/${categoriaActual}/full/${i}.jpg" alt="imagen galeria">
`;

    const modal = document.createElement('DIV')
    modal.classList.add('modal')
    modal.onclick = cerrarModal

    const cerrarModalBtn = document.createElement('BUTTON')
    cerrarModalBtn.textContent = 'X'
    cerrarModalBtn.classList.add('btn-cerrar')
    cerrarModalBtn.onclick = cerrarModal

    modal.appendChild(imagen)
    modal.appendChild(cerrarModalBtn)

    // agregar modal
    const body = document.querySelector('body')
    const html = document.querySelector('html')
    body.appendChild(modal)
    html.style.overflow = 'hidden'
}

function cerrarModal() {
    const modal = document.querySelector('.modal')
    modal.classList.add('fade-out')

    setTimeout(() => {
        modal?.remove()

        const body = document.querySelector('body')
        const html = document.querySelector('html')

        html.style.overflow = 'auto'
    }, 500);
}

function selecionarCategoria(){
    const categorias = document.querySelectorAll('.categoria')
    const productos = document.querySelectorAll('.producto')


    categorias.forEach(categoria => {
        categoria.addEventListener('click', ()=>{

            categorias.forEach(cat => cat.classList.remove('activo'))
            categoria.classList.toggle('activo')
        })
    })
}

function cambiarEnlaceSegunResolucion(){
    const enlace = document.querySelector('.enlace')
    
    if(window.innerWidth <= 768){
        enlace.setAttribute('href', '#contacto')
    }else{
        enlace.setAttribute('href', '#footer')
    }
}