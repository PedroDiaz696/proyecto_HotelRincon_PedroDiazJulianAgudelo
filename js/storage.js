// ============================================
// OBTENER HABITACIONES
// ============================================

function obtenerHabitaciones(){

    // BUSCAR HABITACIONES EN LOCALSTORAGE

    let habitaciones =
        JSON.parse(localStorage.getItem("habitaciones"));

    /*
        SI NO EXISTEN HABITACIONES
        SE CREAN AUTOMÁTICAMENTE
    */

    if(!habitaciones){

        habitaciones = [

            {
                id: 1,
                nombre: "Habitación Deluxe",
                camas: 2,
                personas: 2,
                precio: 250000,
                internet: true,
                minibar: false,
                jacuzzi: true,
                imagen: "./assets/img/habitacion1.webp"
            },

            {
                id: 2,
                nombre: "Habitación Familiar",
                camas: 2,
                personas: 4,
                precio: 350000,
                internet: false,
                minibar: true,
                jacuzzi: false,
                imagen: "./assets/img/habitacion2.jpg"
            },

            {
                id: 3,
                nombre: "Suite Ejecutiva",
                camas: 1,
                personas: 2,
                precio: 420000,
                internet: true,
                minibar: true,
                jacuzzi: false,
                imagen: "./assets/img/habitacion3.jpg"
            },

            {
                id: 4,
                nombre: "Habitación Premium",
                camas: 1,
                personas: 2,
                precio: 310000,
                internet: false,
                minibar: true,
                jacuzzi: false,
                imagen: "./assets/img/habitacion4.jpg"
            },

            {
                id: 5,
                nombre: "Suite Presidencial",
                camas: 2,
                personas: 4,
                precio: 650000,
                internet: true,
                minibar: true,
                jacuzzi: true,
                imagen: "./assets/img/habitacion5.jpg"
            },

            {
                id: 6,
                nombre: "Suite Romántica",
                camas: 1,
                personas: 2,
                precio: 480000,
                internet: true,
                minibar: false,
                jacuzzi: true,
                imagen: "./assets/img/habitacion6.jpg"
            }

        ];

        // GUARDAR HABITACIONES INICIALES

        localStorage.setItem(
            "habitaciones",
            JSON.stringify(habitaciones)
        );

    }

    // RETORNAR HABITACIONES

    return habitaciones;

}

// ============================================
// GUARDAR HABITACIONES
// ============================================

function guardarHabitaciones(habitaciones){

    localStorage.setItem(
        "habitaciones",
        JSON.stringify(habitaciones)
    );

}

// ============================================
// OBTENER RESERVAS
// ============================================

function obtenerReservas(){

    let reservas =
        JSON.parse(localStorage.getItem("reservas")) || [];

    return reservas;

}

// ============================================
// GUARDAR RESERVAS
// ============================================

function guardarReservas(reservas){

    localStorage.setItem(
        "reservas",
        JSON.stringify(reservas)
    );

}