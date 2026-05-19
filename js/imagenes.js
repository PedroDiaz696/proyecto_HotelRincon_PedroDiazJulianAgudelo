const imagenes = [

    "assets/img/img1.png",
    "assets/img/img2.webp",
    "assets/img/img3.webp"

];

let index = 0;

const fondo1 = document.querySelector(".fondo1");
const fondo2 = document.querySelector(".fondo2");

let mostrandoPrimera = true;

// Imagen inicial

fondo1.style.backgroundImage = `url(${imagenes[index]})`;

function cambiarFondo(){

    index++;

    if(index >= imagenes.length){
        index = 0;
    }

    const siguienteImagen = `url(${imagenes[index]})`;

    if(mostrandoPrimera){

        fondo2.style.backgroundImage = siguienteImagen;

        fondo2.style.opacity = 1;
        fondo1.style.opacity = 0;

    }else{

        fondo1.style.backgroundImage = siguienteImagen;

        fondo1.style.opacity = 1;
        fondo2.style.opacity = 0;
    }

    mostrandoPrimera = !mostrandoPrimera;
}

// Cambiar cada 4 segundos

setInterval(cambiarFondo, 2000);