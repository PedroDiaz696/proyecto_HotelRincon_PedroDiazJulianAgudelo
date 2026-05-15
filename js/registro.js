const formulario = document.querySelector(".formulario");

formulario.addEventListener("submit", (e) => {

    e.preventDefault();

    // OBTENER DATOS

    const nombre = document.querySelector("#Nombre").value.trim();
    const correo = document.querySelector("#Correo").value.trim();
    const contraseña = document.querySelector("#Contraseña").value.trim();
    const numeroid = document.querySelector("#numeroid").value.trim();
    const telefono = document.querySelector("#telefono").value.trim();
    const nacionalidad = document.querySelector("#nacionalidad").value.trim();

    // VALIDACIONES

    // NOMBRE

    const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

    if(nombre.length < 3){
        alert("El nombre debe tener mínimo 3 caracteres");
        return;
    }

    if(!regexNombre.test(nombre)){
        alert("El nombre solo puede contener letras");
        return;
    }

    // CORREO

    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!regexCorreo.test(correo)){
        alert("Correo inválido");
        return;
    }

    // CONTRASEÑA

    const regexPassword =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if(!regexPassword.test(contraseña)){
        alert("La contraseña debe tener mínimo 8 caracteres, una mayúscula, un número y un símbolo");
        return;
    }

    // NUMERO ID

    if(numeroid.length < 6){
        alert("Número ID inválido");
        return;
    }

    // TELEFONO

    const regexTelefono = /^[0-9]{10}$/;

    if(!regexTelefono.test(telefono)){
        alert("Teléfono inválido");
        return;
    }

    // NACIONALIDAD

    const regexNacionalidad = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

    if(!regexNacionalidad.test(nacionalidad)){
        alert("Nacionalidad inválida");
        return;
    }

    // CREAR OBJETO

    const usuario = {
        nombre,
        correo,
        contraseña,
        numeroid,
        telefono,
        nacionalidad
    };

    // OBTENER USUARIOS

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // VALIDAR CORREO EXISTENTE

    const usuarioExiste = usuarios.some(user => user.correo === correo);

    if(usuarioExiste){
        alert("Este correo ya está registrado");
        return;
    }

    // AGREGAR USUARIO

    usuarios.push(usuario);

    // GUARDAR

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // MENSAJE

    alert("Registro exitoso");

    // LIMPIAR

    formulario.reset();

    // REDIRECCION

    window.location.href = "index.html";

});