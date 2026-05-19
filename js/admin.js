// ============================================
// PROTEGER PANEL ADMIN
// ============================================

const usuarioLogueado =
localStorage.getItem("usuarioLogueado");

if(usuarioLogueado !== "true"){

    window.location.href = "login.html";

}

// ============================================
// ELEMENTOS DOM
// ============================================

const tabla =
document.getElementById("tablaHabitaciones");

const formulario =
document.getElementById("formHabitacion");

// MENÚ

const menuDashboard =
document.getElementById("menuDashboard");

const menuHabitaciones =
document.getElementById("menuHabitaciones");

const menuReservas =
document.getElementById("menuReservas");

// VISTAS

const vistaDashboard =
document.getElementById("vistaDashboard");

const vistaHabitaciones =
document.getElementById("vistaHabitaciones");

const vistaReservas =
document.getElementById("vistaReservas");

// ============================================
// CAMBIAR VISTAS
// ============================================

function ocultarVistas(){

    vistaDashboard.style.display = "none";

    vistaHabitaciones.style.display = "none";

    vistaReservas.style.display = "none";

}

// DASHBOARD

menuDashboard.addEventListener("click", () => {

    ocultarVistas();

    vistaDashboard.style.display = "block";

});

// HABITACIONES

menuHabitaciones.addEventListener("click", () => {

    ocultarVistas();

    vistaHabitaciones.style.display = "block";

});

// RESERVAS

menuReservas.addEventListener("click", () => {

    ocultarVistas();

    vistaReservas.style.display = "block";

});

// ============================================
// OBTENER HABITACIONES
// ============================================

let habitaciones = obtenerHabitaciones();

// ============================================
// DASHBOARD
// ============================================

document.getElementById("totalHabitaciones").textContent =
habitaciones.length;

document.getElementById("totalReservas").textContent =
1;

// ============================================
// RENDERIZAR HABITACIONES
// ============================================

function renderizarHabitaciones(){

    tabla.innerHTML = "";

    habitaciones.forEach(habitacion => {

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

    const habitacion =
    habitaciones.find(h => h.id === id);

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

    localStorage.setItem(
        "habitacionEditando",
        id
    );

}

// ============================================
// GUARDAR CAMBIOS
// ============================================

formulario.addEventListener("submit", (e) => {

    e.preventDefault();

    const id =
    Number(localStorage.getItem("habitacionEditando"));

    const habitacion =
    habitaciones.find(h => h.id === id);

    if(!habitacion){

        alert("Selecciona una habitación");

        return;

    }

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

    guardarHabitaciones(habitaciones);

    renderizarHabitaciones();

    formulario.reset();

    localStorage.removeItem(
        "habitacionEditando"
    );

    alert("Habitación actualizada");

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
// INICIAR
// ============================================

vistaDashboard.style.display = "block";

renderizarHabitaciones();