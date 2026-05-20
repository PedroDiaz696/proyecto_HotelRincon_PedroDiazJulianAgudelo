// ============================================
// FUNCIÓN ORIGINAL: REDIRECCIÓN DESDE INDEX
// ============================================

function reservarHabitacion(){
    const usuarioLogueado = localStorage.getItem("usuarioLogueado");

    if(usuarioLogueado === "true"){
        window.location.href = "reservas.html";
    } else {
        window.location.href = "registro.html";
    }
}

// ============================================
// CONSULTAR DISPONIBILIDAD EN RESERVAS.HTML
// ============================================

const formDisponibilidad = document.getElementById("formDisponibilidad");
const resultado = document.getElementById("resultadoDisponibilidad");

if(formDisponibilidad){
    formDisponibilidad.addEventListener("submit", e => {
        e.preventDefault();

        const fechaInicio = document.getElementById("fechaInicio").value;
        const fechaFin = document.getElementById("fechaFin").value;
        const personas = parseInt(document.getElementById("personas").value);

        if(!fechaInicio || !fechaFin || !personas){
            alert("Por favor complete todos los campos.");
            return;
        }

        const habitaciones = obtenerHabitaciones();
        const reservas = obtenerReservas();

        // Filtrar habitaciones según capacidad y disponibilidad
        const disponibles = habitaciones.filter(habitacion => {
            if(habitacion.personas < personas) return false;

            // Verificar solapamiento de reservas
            const ocupada = reservas.some(reserva => 
                reserva.habitacionId === habitacion.id &&
                !(fechaFin <= reserva.fechaInicio || fechaInicio >= reserva.fechaFin)
            );

            return !ocupada;
        });

        renderizarDisponibles(disponibles, fechaInicio, fechaFin, personas);
    });
}

// ============================================
// RENDERIZAR HABITACIONES DISPONIBLES
// ============================================

function renderizarDisponibles(habitaciones, fechaInicio, fechaFin, personas){
    resultado.innerHTML = "";

    if(habitaciones.length === 0){
        resultado.innerHTML = "<p>No hay habitaciones disponibles para esas fechas.</p>";
        return;
    }

    habitaciones.forEach(habitacion => {
        let servicios = [];
        if(habitacion.internet) servicios.push("WiFi");
        if(habitacion.minibar) servicios.push("Minibar");
        if(habitacion.jacuzzi) servicios.push("Jacuzzi");

        const noches = calcularNoches(fechaInicio, fechaFin);
        const total = noches * habitacion.precio;

        resultado.innerHTML += `
            <div class="card-habitacion">
                <img src="${habitacion.imagen}" alt="${habitacion.nombre}">
                <h3>${habitacion.nombre}</h3>
                <p>${habitacion.camas} camas - ${habitacion.personas} personas</p>
                <p>Servicios: ${servicios.join(", ")}</p>
                <span>$${habitacion.precio} / noche</span>
                <p>Total: $${total} (${noches} noches)</p>
                <button onclick="reservar(${habitacion.id}, '${fechaInicio}', '${fechaFin}', ${personas}, ${total})">
                    Reservar
                </button>
            </div>
        `;
    });
}

// ============================================
// RESERVAR HABITACIÓN
// ============================================

function reservar(id, fechaInicio, fechaFin, personas, total){
    const usuarioLogueado = localStorage.getItem("usuarioLogueado");

    if(usuarioLogueado !== "true"){
        alert("Debe iniciar sesión para reservar.");
        window.location.href = "login.html";
        return;
    }

    const reservas = obtenerReservas();
    reservas.push({
        habitacionId: id,
        fechaInicio,
        fechaFin,
        personas,
        total
    });

    guardarReservas(reservas);
    alert("Reserva realizada con éxito.");
}

// ============================================
// CALCULAR NOCHES
// ============================================

function calcularNoches(inicio, fin){
    const fecha1 = new Date(inicio);
    const fecha2 = new Date(fin);
    const diff = fecha2 - fecha1;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
}
