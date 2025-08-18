import { valorValido } from "./validacion";

// Recibe un tablero y retorna las ubicaciones donde falta completar
function identificarBoxesVacios(tableroPrueba) {
    const respuesta = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            for (let k = 0; k < 3; k++) {
                for (let l = 0; l < 3; l++) {
                    if (tableroPrueba[i][j][k][l] == 0) {
                        respuesta.push({i:i, j:j, k:k, l:l});
                    }
                }
            }
        }
    }
    return respuesta;
}

// Recibe un tablero yu la dificultad, returna true si tiene una sola solucion, false si tiene al menos 2
function solucionUnica(tablero, dificultad) {
    const tableroPrueba = structuredClone(tablero);
    const boxVacio = identificarBoxesVacios(tableroPrueba);
    const respuestas = Array.from({ length: dificultad }, () => 9)
    let cantidadDeSoluciones = 0;
    let quedanSolucionesPorProbar = true;
    let x = 0
    let esValido = false;
    
    // Buscar soluciones y contar, si el conteo llega a 2 ya es invalido
    do {
        // Busca un valor valido para la celda elegida. Sale del loop cuando encuentra un valor valido o prueba todos los valores.
        while(!esValido && respuestas[x]) {
            tableroPrueba[boxVacio[x].i][boxVacio[x].j][boxVacio[x].k][boxVacio[x].l] = respuestas[x];
            esValido = valorValido(tableroPrueba, boxVacio[x].i, boxVacio[x].j, boxVacio[x].k, boxVacio[x].l);
            if(!esValido) {
                --respuestas[x];
            }
        }
        // Si encontro un valor valido se avanza en x para probar el siguiente
        // Si llego al final de los valores para probar, retrocede x y llena de 9 todos los valores de adelante
        if (esValido) {
            esValido = false;
            if (x == (dificultad - 1)) {
                ++cantidadDeSoluciones;
                --respuestas[x];
            } else {
                ++x;
            }
        } else {
            if ((x == 0)) {
                quedanSolucionesPorProbar = false;
            } else {
                respuestas[x] = 9;
                tableroPrueba[boxVacio[x].i][boxVacio[x].j][boxVacio[x].k][boxVacio[x].l] = 0;
                --x;
                --respuestas[x];
            }
        }
    } while ((cantidadDeSoluciones <= 1) && quedanSolucionesPorProbar);
    return (cantidadDeSoluciones > 1) ? false : true
}

function generarTableroInicial(tablero, dificultad) {
    
    // Primero creamos una nueva matriz para no modificar lo recibido
    const tableroInicial = structuredClone(tablero);

    // Despues vamos a ir eliminando valores en funcion de la dificultad deseada
    for (let index = 0; index < dificultad; index++) {
        // eliminarNumero es la posicion que vamos a borrar
        const eliminarNumero = {}
        
        // Asignamos un numero aleatorio que no se haya borrado ya
        do {
            eliminarNumero.filaBloqueIndex = Math.floor(Math.random() * 3);
            eliminarNumero.colBloqueIndex = Math.floor(Math.random() * 3);
            eliminarNumero.filaBoxIndex = Math.floor(Math.random() * 3);
            eliminarNumero.colBoxIndex = Math.floor(Math.random() * 3);
        } while ((tableroInicial[eliminarNumero.filaBloqueIndex][eliminarNumero.colBloqueIndex][eliminarNumero.filaBoxIndex][eliminarNumero.colBoxIndex] == 0));
        
        // Borramos el numero elegido
        tableroInicial[eliminarNumero.filaBloqueIndex][eliminarNumero.colBloqueIndex][eliminarNumero.filaBoxIndex][eliminarNumero.colBoxIndex] = 0;

    }

    // Retornamos el tablero para jugar
    return tableroInicial
}

export { generarTableroInicial, solucionUnica }
