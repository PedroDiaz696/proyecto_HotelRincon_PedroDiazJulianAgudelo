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

const tablaReservas =
document.getElementById("tablaReservas");

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

menuDashboard.addEventListener("click", () => {

    ocultarVistas();

    vistaDashboard.style.display = "block";

});

menuHabitaciones.addEventListener("click", () => {

    ocultarVistas();

    vistaHabitaciones.style.display = "block";

});

menuReservas.addEventListener("click", () => {

    ocultarVistas();

    vistaReservas.style.display = "block";

});

// ============================================
// OBTENER DATOS
// ============================================

let habitaciones = obtenerHabitaciones();

let reservas = obtenerReservas();

// ============================================
// DASHBOARD
// ============================================

function actualizarDashboard(){

    document.getElementById("totalHabitaciones").textContent =
    habitaciones.length;

    document.getElementById("totalReservas").textContent =
    reservas.length;

}

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

    document.getElementById("imagen").value =
    habitacion.imagen;

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
// GUARDAR / AGREGAR
// ============================================

formulario.addEventListener("submit", (e) => {

    e.preventDefault();

    const idEditando =
    localStorage.getItem("habitacionEditando");

    // EDITAR

    if(idEditando){

        const habitacion =
        habitaciones.find(
            h => h.id === Number(idEditando)
        );

        habitacion.nombre =
        document.getElementById("nombre").value;

        habitacion.camas =
        Number(document.getElementById("camas").value);

        habitacion.personas =
        Number(document.getElementById("personas").value);

        habitacion.precio =
        Number(document.getElementById("precio").value);

        habitacion.imagen =
        document.getElementById("imagen").value;

        habitacion.internet =
        document.getElementById("internet").checked;

        habitacion.minibar =
        document.getElementById("minibar").checked;

        habitacion.jacuzzi =
        document.getElementById("jacuzzi").checked;

        alert("Habitación actualizada");

        localStorage.removeItem("habitacionEditando");

    }

    // AGREGAR

    else{

        const nuevaHabitacion = {

            id: Date.now(),

            nombre:
            document.getElementById("nombre").value,

            camas:
            Number(document.getElementById("camas").value),

            personas:
            Number(document.getElementById("personas").value),

            precio:
            Number(document.getElementById("precio").value),

            imagen:
            document.getElementById("imagen").value,

            internet:
            document.getElementById("internet").checked,

            minibar:
            document.getElementById("minibar").checked,

            jacuzzi:
            document.getElementById("jacuzzi").checked

        };

        habitaciones.push(nuevaHabitacion);

        alert("Habitación agregada");

    }

    guardarHabitaciones(habitaciones);

    renderizarHabitaciones();

    actualizarDashboard();

    formulario.reset();

});

// ============================================
// RENDERIZAR RESERVAS
// ============================================

function renderizarReservas(){

    tablaReservas.innerHTML = "";

    reservas.forEach((reserva, index) => {

        const habitacion =
        habitaciones.find(
            h => h.id === reserva.habitacionId
        );

        tablaReservas.innerHTML += `

            <tr>

                <td>${habitacion.nombre}</td>

                <td>${reserva.fechaInicio}</td>

                <td>${reserva.fechaFin}</td>

                <td>${reserva.personas}</td>

                <td>$${reserva.total}</td>

                <td>

                    <button
                    class="btn-cancelar"
                    onclick="cancelarReserva(${index})">

                        Cancelar

                    </button>

                </td>

            </tr>

        `;

    });

}

// ============================================
// CANCELAR RESERVA
// ============================================

function cancelarReserva(index){

    reservas.splice(index, 1);

    guardarReservas(reservas);

    renderizarReservas();

    actualizarDashboard();

    alert("Reserva cancelada");

}

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

renderizarReservas();

actualizarDashboard();