import { valorValido, bloqueSeleccionado, filaSeleccionada, columnaSeleccionada } from "./validacion";

// Funcion que retorna la clase correspondiente al box evaluado
// Recibe tablero actual e inicial, posicion del box evaluado y box seleccionado
const classSelector = function(tableroActual, tableroInicial, filaBloqueIndex, colBloqueIndex, filaBoxIndex, colBoxIndex, boxSeleccionado) {
    const clase = ['box'];

    /* Primero definimos el color del texto */
    if (tableroInicial[filaBloqueIndex][colBloqueIndex][filaBoxIndex][colBoxIndex]) {
        // Texto negro es para los valores de la matriz original
        clase.push('texto-negro');
    } else {
        // Texto azul es para los valores nuevos
        clase.push('texto-azul');
    }

    if (boxSeleccionado.filaBloqueIndex == 3) {
        clase.push('fondo-general')
        return clase.join(' ');
    }

    /* Despues definimos el color del bloque */
    if ((filaBloqueIndex == boxSeleccionado.filaBloqueIndex) && (colBloqueIndex == boxSeleccionado.colBloqueIndex) && (filaBoxIndex == boxSeleccionado.filaBoxIndex) && (colBoxIndex == boxSeleccionado.colBoxIndex)) {
        // Fondo para box seleccionado
        clase.push('fondo-seleccionado');
    } else if (!valorValido(tableroActual, filaBloqueIndex, colBloqueIndex, filaBoxIndex, colBoxIndex)) {
        // Fondo rojo para box con valores invalidos
        clase.push('fondo-invalido');
    } else if (bloqueSeleccionado(filaBloqueIndex, colBloqueIndex, boxSeleccionado)) {
        // Fondo para bloque seleccionado
        clase.push('fondo-bloque');
    } else if (filaSeleccionada(filaBloqueIndex, filaBoxIndex, boxSeleccionado)) {
        // Fondo para fila seleccionada
        clase.push('fondo-fila');
    } else if (columnaSeleccionada(colBloqueIndex, colBoxIndex, boxSeleccionado)) {
        // Fondo para columna seleccionada
        clase.push('fondo-columna');
    } else if ((tableroActual[filaBloqueIndex][colBloqueIndex][filaBoxIndex][colBoxIndex] == tableroActual[boxSeleccionado.filaBloqueIndex][boxSeleccionado.colBloqueIndex][boxSeleccionado.filaBoxIndex][boxSeleccionado.colBoxIndex]) && (tableroActual[filaBloqueIndex][colBloqueIndex][filaBoxIndex][colBoxIndex] != 0)) {
        // Fondo para numero seleccionado
        clase.push('fondo-numero');
    } else {
        // Fondo para el resto
        clase.push('fondo-general')
    }

    return clase.join(' ');
}

export { classSelector }


