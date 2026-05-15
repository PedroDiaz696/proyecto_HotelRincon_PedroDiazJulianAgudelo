function reservarHabitacion(){

    const usuarioLogueado = localStorage.getItem("usuarioLogueado");

    if(usuarioLogueado === "true"){
        window.location.href = "reservas.html";
    }
    
    else{
        window.location.href = "registro.html";
    }

}