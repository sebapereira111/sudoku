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
function unaSolucion(tablero, dificultad) {
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

// Recibe un tablero y dificultad deseada, retorna un tablero con celdas eliminadas de acuerdo a la dificultad elegida
// El tablero retornado tiene solucion unica
function generarTableroInicial(tablero, dificultad) {
    
    // Primero creamos una nueva matriz para no modificar lo recibido
    const tableroInicial = structuredClone(tablero);
    // La dificultad que vamos logrando en nuestro tablero
    let dificultadActual = 0;

    // Para limitar el tiempo de ejecucion
    const tiempoMaximoMs = 10000; // tiempo límite en milisegundos
    const inicio = performance.now();

    // Despues vamos a ir eliminando valores en funcion de la dificultad deseada
    for (let index = 0; index < 1000; index++) {
        // eliminarNumero es la posicion que vamos a borrar
        const eliminarNumero = {}
        
        // Asignamos un numero aleatorio que no se haya borrado ya
        do {
            eliminarNumero.filaBloqueIndex = Math.floor(Math.random() * 3);
            eliminarNumero.colBloqueIndex = Math.floor(Math.random() * 3);
            eliminarNumero.filaBoxIndex = Math.floor(Math.random() * 3);
            eliminarNumero.colBoxIndex = Math.floor(Math.random() * 3);
        } while ((tableroInicial[eliminarNumero.filaBloqueIndex][eliminarNumero.colBloqueIndex][eliminarNumero.filaBoxIndex][eliminarNumero.colBoxIndex] == 0));
        
        // Guardamos el numero elegido en una variable temporal
        const tempEliminado = tableroInicial[eliminarNumero.filaBloqueIndex][eliminarNumero.colBloqueIndex][eliminarNumero.filaBoxIndex][eliminarNumero.colBoxIndex];
        // Borramos el numero elegido
        tableroInicial[eliminarNumero.filaBloqueIndex][eliminarNumero.colBloqueIndex][eliminarNumero.filaBoxIndex][eliminarNumero.colBoxIndex] = 0;
        // Aumentamos la dificultad actual
        dificultadActual++;
        // Comprobamos si tenemos solucion unica
        if (!unaSolucion(tableroInicial, dificultadActual)) {
            // Si no tenemos solucion unica
            // Devolvemos el valor que habiamos eliminado
            tableroInicial[eliminarNumero.filaBloqueIndex][eliminarNumero.colBloqueIndex][eliminarNumero.filaBoxIndex][eliminarNumero.colBoxIndex] = tempEliminado;
            // Y reducimos la dificultad alcanzada
            dificultadActual--; 
        }
        // Revisamos las condiciones de salida
        // Vemos si ya llegamos a la dificultad deseada
        if (dificultadActual == dificultad) {
            const tiempo = performance.now()-inicio
            //console.log(dificultadActual, dificultad, tiempo, index)
            break;
        }
        // Vemos si ya llegamos al tiempo maximo de ejecucion
        if ((performance.now() - inicio) > tiempoMaximoMs) {
            const tiempo = performance.now()-inicio
            //console.log(dificultadActual, dificultad, tiempo, index)
            break
        }
    }
    
    // Retornamos el tablero para jugar
    return tableroInicial
}

export { generarTableroInicial, unaSolucion }
