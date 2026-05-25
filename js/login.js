const loginForm = document.querySelector(".formulario");

loginForm.addEventListener("submit", (e) => {

    e.preventDefault();

    // DATOS INGRESADOS

    const correo = document.querySelector("#Correo").value;
    const contraseña = document.querySelector("#Contraseña").value;

    // CUENTA ADMIN

    const admin = {
        correo: "JP@gmail.com",
        contraseña: "123"
    };

    // VALIDAR ADMIN

    if(
        correo === admin.correo &&
        contraseña === admin.contraseña
    ){

        localStorage.setItem(
            "usuarioLogueado",
            "true"
        );

        /*
            GUARDAR USUARIO ACTIVO
        */

        localStorage.setItem(
            "usuarioActivo",
            admin.correo
        );

        alert("Bienvenido Administrador");

        window.location.href = "admin.html";

        return;
    }

    // OBTENER USUARIOS

    let usuarios =
    JSON.parse(localStorage.getItem("usuarios")) || [];

    // BUSCAR USUARIO

    const usuarioEncontrado = usuarios.find(user =>

        user.correo === correo &&
        user.contraseña === contraseña

    );

    // VALIDAR LOGIN

    if(usuarioEncontrado){

        localStorage.setItem(
            "usuarioLogueado",
            "true"
        );

        /*
            GUARDAR USUARIO ACTIVO
        */

        localStorage.setItem(
            "usuarioActivo",
            usuarioEncontrado.correo
        );

        alert("Inicio de sesión exitoso");

        window.location.href = "index.html";

    }else{

        alert("Correo o contraseña incorrectos");

    }

});