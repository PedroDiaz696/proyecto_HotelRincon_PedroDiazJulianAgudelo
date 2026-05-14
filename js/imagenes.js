const imagenes = [

    "assets/img/img1.png",

    "assets/img/img2.webp",

    "assets/img/img3.webpp"

];

let index = 0;

function cambiarFondo(){

    document.body.style.backgroundImage =
    `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${imagenes[index]})`;

    index++;

    if(index >= imagenes.length){
        index = 0;
    }
}

// Fondo inicial

cambiarFondo();

// Cambiar cada 3 segundos

setInterval(cambiarFondo, 900);