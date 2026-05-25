// ============================================
// FUNCIÓN ORIGINAL: REDIRECCIÓN DESDE INDEX
// ============================================

function reservarHabitacion(){

    const usuarioLogueado =
    localStorage.getItem("usuarioLogueado");

    if(usuarioLogueado === "true"){

        window.location.href = "reservas.html";

    } else {

        window.location.href = "registro.html";

    }

}

// ============================================
// CONSULTAR DISPONIBILIDAD
// ============================================

const formDisponibilidad =
document.getElementById("formDisponibilidad");

const resultado =
document.getElementById("resultadoDisponibilidad");

if(formDisponibilidad){

    formDisponibilidad.addEventListener("submit", e => {

        e.preventDefault();

        const fechaInicio =
        document.getElementById("fechaInicio").value;

        const fechaFin =
        document.getElementById("fechaFin").value;

        const personas =
        parseInt(document.getElementById("personas").value);

        if(!fechaInicio || !fechaFin || !personas){

            alert("Por favor complete todos los campos.");

            return;

        }

        const habitaciones =
        obtenerHabitaciones();

        const reservas =
        obtenerReservas();

        // FILTRAR DISPONIBLES

        const disponibles = habitaciones.filter(habitacion => {

            if(habitacion.personas < personas){

                return false;

            }

            // VALIDAR FECHAS

            const ocupada = reservas.some(reserva =>

                reserva.habitacionId === habitacion.id &&

                !(fechaFin <= reserva.fechaInicio ||

                fechaInicio >= reserva.fechaFin)

            );

            return !ocupada;

        });

        renderizarDisponibles(
            disponibles,
            fechaInicio,
            fechaFin,
            personas
        );

    });

}

// ============================================
// RENDERIZAR DISPONIBLES
// ============================================

function renderizarDisponibles(
    habitaciones,
    fechaInicio,
    fechaFin,
    personas
){

    resultado.innerHTML = "";

    if(habitaciones.length === 0){

        resultado.innerHTML = `

            <p>
                No hay habitaciones disponibles.
            </p>

        `;

        return;

    }

    habitaciones.forEach(habitacion => {

        let servicios = [];

        if(habitacion.internet){

            servicios.push("WiFi");

        }

        if(habitacion.minibar){

            servicios.push("Minibar");

        }

        if(habitacion.jacuzzi){

            servicios.push("Jacuzzi");

        }

        const noches =
        calcularNoches(fechaInicio, fechaFin);

        const total =
        noches * habitacion.precio;

        resultado.innerHTML += `

            <div class="card-habitacion">

                <img
                    src="${habitacion.imagen}"
                    alt="${habitacion.nombre}"
                >

                <h3>
                    ${habitacion.nombre}
                </h3>

                <p>
                    ${habitacion.camas} camas -
                    ${habitacion.personas} personas
                </p>

                <p>
                    Servicios:
                    ${servicios.join(", ")}
                </p>

                <span>
                    $${habitacion.precio} / noche
                </span>

                <p>
                    Total: $${total}
                    (${noches} noches)
                </p>

                <button
                    onclick="
                        reservar(
                            ${habitacion.id},
                            '${fechaInicio}',
                            '${fechaFin}',
                            ${personas},
                            ${total}
                        )
                    "
                >

                    Reservar

                </button>

            </div>

        `;

    });

}

// ============================================
// RESERVAR HABITACIÓN
// ============================================

function reservar(
    id,
    fechaInicio,
    fechaFin,
    personas,
    total
){

    const usuarioLogueado =
    localStorage.getItem("usuarioLogueado");

    if(usuarioLogueado !== "true"){

        alert("Debe iniciar sesión");

        window.location.href = "login.html";

        return;

    }

    /*
        USUARIO ACTIVO
    */

    const usuarioActivo =
    localStorage.getItem("usuarioActivo");

    /*
        RESERVAS
    */

    const reservas =
    obtenerReservas();

    /*
        AGREGAR RESERVA
    */

    reservas.push({

        id: Date.now(),

        usuario: usuarioActivo,

        habitacionId: id,

        fechaInicio,

        fechaFin,

        personas,

        total

    });

    /*
        GUARDAR
    */

    guardarReservas(reservas);

    alert("Reserva realizada con éxito");

    /*
        ACTUALIZAR
    */

    mostrarMisReservas();

}

// ============================================
// MOSTRAR MIS RESERVAS
// ============================================

function mostrarMisReservas(){

    let contenedor =
    document.getElementById("misReservas");

    /*
        CREAR CONTENEDOR
    */

    if(!contenedor){

        contenedor =
        document.createElement("section");

        contenedor.id = "misReservas";

        document.body.appendChild(contenedor);

    }

    /*
        USUARIO ACTIVO
    */

    const usuarioActivo =
    localStorage.getItem("usuarioActivo");

    /*
        OBTENER RESERVAS
    */

    const reservas =
    obtenerReservas();

    /*
        FILTRAR RESERVAS DEL USUARIO
    */

    const misReservas = reservas.filter(reserva =>

        reserva.usuario === usuarioActivo

    );

    /*
        LIMPIAR
    */

    contenedor.innerHTML = `

        <h2 class="titulo-seccion">

            Mis Reservas

        </h2>

    `;

    /*
        VALIDAR
    */

    if(misReservas.length === 0){

        contenedor.innerHTML += `

            <p class="sin-reservas">

                No tienes reservas.

            </p>

        `;

        return;

    }

    /*
        RENDERIZAR
    */

    misReservas.forEach(reserva => {

        const habitaciones =
        obtenerHabitaciones();

        const habitacion =
        habitaciones.find(h =>

            h.id === reserva.habitacionId

        );

        contenedor.innerHTML += `

            <div class="card-habitacion">

                <h3>
                    ${habitacion.nombre}
                </h3>

                <p>
                    Fecha inicio:
                    ${reserva.fechaInicio}
                </p>

                <p>
                    Fecha fin:
                    ${reserva.fechaFin}
                </p>

                <p>
                    Personas:
                    ${reserva.personas}
                </p>

                <span>
                    Total:
                    $${reserva.total}
                </span>

                <button
                    class="btn-cancelar"
                    onclick="
                        cancelarReserva(${reserva.id})
                    "
                >

                    Cancelar Reserva

                </button>

            </div>

        `;

    });

}

// ============================================
// CANCELAR RESERVA
// ============================================

function cancelarReserva(id){

    let reservas =
    obtenerReservas();

    reservas = reservas.filter(reserva =>

        reserva.id !== id

    );

    guardarReservas(reservas);

    mostrarMisReservas();

    alert("Reserva cancelada");

}

// ============================================
// CALCULAR NOCHES
// ============================================

function calcularNoches(inicio, fin){

    const fecha1 = new Date(inicio);

    const fecha2 = new Date(fin);

    const diff = fecha2 - fecha1;

    return Math.ceil(
        diff / (1000 * 60 * 60 * 24)
    );

}

// ============================================
// INICIAR
// ============================================

mostrarMisReservas();