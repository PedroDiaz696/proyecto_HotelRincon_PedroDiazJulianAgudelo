const formulario = document.querySelector(".formulario");

formulario.addEventListener("submit", (e) => {

    e.preventDefault();

    // OBTENER DATOS

    const nombre = document.querySelector("#Nombre").value;
    const correo = document.querySelector("#Correo").value;
    const contraseña = document.querySelector("#Contraseña").value;

    // CREAR OBJETO USUARIO

    const usuario = {
        nombre: nombre,
        correo: correo,
        contraseña: contraseña
    };

    // OBTENER USUARIOS GUARDADOS

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // VALIDAR SI EL CORREO YA EXISTE

    const usuarioExiste = usuarios.some(user => user.correo === correo);

    if(usuarioExiste){

        alert("Este correo ya está registrado");
        return;

    }

    // AGREGAR NUEVO USUARIO

    usuarios.push(usuario);

    // GUARDAR EN LOCAL STORAGE

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // MENSAJE

    alert("Registro exitoso");

    // LIMPIAR FORMULARIO

    formulario.reset();

    // REDIRIGIR

    window.location.href = "index.html";

});