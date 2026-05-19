// ============================================
// PROTEGER PANEL ADMIN
// ============================================

const usuarioLogueado =
localStorage.getItem("usuarioLogueado");

if(usuarioLogueado !== "true"){

    window.location.href = "login.html";

}

// ============================================
// OBTENER ELEMENTOS DEL DOM
// ============================================

const tabla =
document.getElementById("tablaHabitaciones");

const formulario =
document.getElementById("formHabitacion");

// ============================================
// OBTENER HABITACIONES
// ============================================

let habitaciones = obtenerHabitaciones();

// ============================================
// RENDERIZAR HABITACIONES
// ============================================

function renderizarHabitaciones(){

    // LIMPIAR TABLA

    tabla.innerHTML = "";

    // RECORRER HABITACIONES

    habitaciones.forEach(habitacion => {

        // SERVICIOS

        let servicios = "";

        if(habitacion.internet){
            servicios += "Internet ";
        }

        if(habitacion.minibar){
            servicios += "Minibar ";
        }

        if(habitacion.jacuzzi){
            servicios += "Jacuzzi";
        }

        // CREAR FILA

        tabla.innerHTML += `

            <tr>

                <td>${habitacion.nombre}</td>

                <td>${habitacion.camas}</td>

                <td>${habitacion.personas}</td>

                <td>$${habitacion.precio}</td>

                <td>${servicios}</td>

                <td>

                    <button onclick="editarHabitacion(${habitacion.id})">

                        Editar

                    </button>

                </td>

            </tr>

        `;

    });

}

// ============================================
// EDITAR HABITACIÓN
// ============================================

function editarHabitacion(id){

    // BUSCAR HABITACIÓN

    const habitacion =
        habitaciones.find(h => h.id === id);

    // LLENAR FORMULARIO

    document.getElementById("nombre").value =
        habitacion.nombre;

    document.getElementById("camas").value =
        habitacion.camas;

    document.getElementById("personas").value =
        habitacion.personas;

    document.getElementById("precio").value =
        habitacion.precio;

    document.getElementById("internet").checked =
        habitacion.internet;

    document.getElementById("minibar").checked =
        habitacion.minibar;

    document.getElementById("jacuzzi").checked =
        habitacion.jacuzzi;

    // GUARDAR ID TEMPORAL

    localStorage.setItem(
        "habitacionEditando",
        id
    );

}

// ============================================
// GUARDAR CAMBIOS
// ============================================

formulario.addEventListener("submit", (e) => {

    // EVITAR RECARGA

    e.preventDefault();

    // OBTENER ID

    const id =
        Number(localStorage.getItem("habitacionEditando"));

    // BUSCAR HABITACIÓN

    const habitacion =
        habitaciones.find(h => h.id === id);

    // VALIDAR

    if(!habitacion){

        alert("Selecciona una habitación");

        return;

    }

    // ACTUALIZAR DATOS

    habitacion.nombre =
        document.getElementById("nombre").value;

    habitacion.camas =
        Number(document.getElementById("camas").value);

    habitacion.personas =
        Number(document.getElementById("personas").value);

    habitacion.precio =
        Number(document.getElementById("precio").value);

    habitacion.internet =
        document.getElementById("internet").checked;

    habitacion.minibar =
        document.getElementById("minibar").checked;

    habitacion.jacuzzi =
        document.getElementById("jacuzzi").checked;

    // GUARDAR EN LOCALSTORAGE

    guardarHabitaciones(habitaciones);

    // VOLVER A RENDERIZAR

    renderizarHabitaciones();

    // LIMPIAR FORMULARIO

    formulario.reset();

    // ELIMINAR ID TEMPORAL

    localStorage.removeItem("habitacionEditando");

    // MENSAJE

    alert("Habitación actualizada correctamente");

});

// ============================================
// CERRAR SESIÓN
// ============================================

const btnCerrarSesion =
document.getElementById("cerrarSesion");

btnCerrarSesion.addEventListener("click", () => {

    localStorage.removeItem("usuarioLogueado");

    alert("Sesión cerrada");

    window.location.href = "login.html";

});

// ============================================
// INICIAR SISTEMA
// ============================================

renderizarHabitaciones();