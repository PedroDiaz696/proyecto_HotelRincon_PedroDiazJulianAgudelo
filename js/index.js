// ============================================
// CONTENEDOR
// ============================================

const contenedor =
document.getElementById("contenedorHabitaciones");

// ============================================
// OBTENER HABITACIONES
// ============================================

const habitaciones =
obtenerHabitaciones();

// ============================================
// RENDERIZAR HABITACIONES
// ============================================

function renderizarHabitaciones(){

    // LIMPIAR CONTENEDOR

    contenedor.innerHTML = "";

    // RECORRER HABITACIONES

    habitaciones.forEach(habitacion => {

        // SERVICIOS

        let servicios = "";

        if(habitacion.internet){
            servicios += "WiFi - ";
        }

        if(habitacion.minibar){
            servicios += "Minibar - ";
        }

        if(habitacion.jacuzzi){
            servicios += "Jacuzzi";
        }

        // CREAR CARD

        contenedor.innerHTML += `

            <div class="card-habitacion">

                <img
                    src="${habitacion.imagen}"
                    alt="${habitacion.nombre}"
                >

                <h3>${habitacion.nombre}</h3>

                <p>

                    ${habitacion.personas} personas -
                    ${servicios}

                </p>

                <span>

                    $${habitacion.precio} / noche

                </span>

                <a href="#">

                    Reservar

                </a>

            </div>

        `;

    });

}

// ============================================
// INICIAR
// ============================================

renderizarHabitaciones();