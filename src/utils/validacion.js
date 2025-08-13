// Funciones varias para validaciones

// La funcion retorna falso si encuentra un valor invalido
// Valor invalido es si hay repetido en el mismo bloque, fila o columna
// Recibe el tablero completo actual y las coordenadas del box a evaluar
function valorValido(tableroActual, filaBloqueIndex, colBloqueIndex, filaBoxIndex, colBoxIndex) {
    // Primero se extrae el numero que se va a probar
    const numero = tableroActual[filaBloqueIndex][colBloqueIndex][filaBoxIndex][colBoxIndex]; 
    
    // Si el numero evaluado es 0 se retorna como valido (porque esta vacio)
    if (numero == 0) {
        return true
    }
    
    // Primero se prueba el bloque
    // Nuevo array para probar el bloque
    const arrBloque = tableroActual[filaBloqueIndex][colBloqueIndex].flat();
    // Se cuenta cuantas veces aparece el numero en el array
    const cantBloque = arrBloque.filter(item => item == numero).length;
    // Si la cantidad es mayor a 1 se retorna falso
    if (cantBloque > 1) {
        return false
    }

    // Despues se prueba la fila y columna
    // Primero pasamos el tablero 3x3x3x3 a 9x9
    const tablero99Fila = Array.from({ length: 9 }, () => Array(9));
    const tablero99Columna = Array.from({ length: 9 }, () => Array(9));
    tableroActual.forEach((filaBloque, i) => {
        filaBloque.forEach((columnaBloque, j) => {
            columnaBloque.forEach((filaBox, k) => {
                filaBox.forEach((box, l) => {
                    const x = (i * 3) + k;
                    const y = (j * 3) + l;
                    tablero99Fila[x][y] = box;
                    tablero99Columna[y][x] = box;
                })
            })
        })
    })
    // Probamos las filas
    // Identificamos cual es la fila que vamos a probar
    const fila = (filaBloqueIndex * 3) + filaBoxIndex;
    // Nuevo array para probar la fila
    const arrFila = tablero99Fila[fila].flat();
    // Se cuenta cuantas veces aparece el numero en el array
    const cantFila = arrFila.filter(item => item == numero).length;
    // Si la cantidad es mayor a 1 se retorna falso
    if (cantFila > 1) {
        return false
    }
    // Probamos las columna
    // Identificamos cual es la columna que vamos a probar
    const columna = (colBloqueIndex * 3) + colBoxIndex;
    // Nuevo array para probar la columna
    const arrColumna = tablero99Columna[columna].flat();
    // Se cuenta cuantas veces aparece el numero en el array
    const cantColumna = arrColumna.filter(item => item == numero).length;
    // Si la cantidad es mayor a 1 se retorna falso
    if (cantColumna > 1) {
        return false
    }

    // Si no se encuentra ningun problema se retorna verdadero
    return true

}

// Recibe fila y columna de un bloque y box seleccionado
// Retorna verdadero si el box seleccionado esta en el bloque
function bloqueSeleccionado(filaBloqueIndex, colBloqueIndex, boxSeleccionado) {
    // Para saber si el box evaluado es del mismo bloque que el seleccionado 
    // comparamos los valores de fila y columa bloque
    if ((filaBloqueIndex == boxSeleccionado.filaBloqueIndex) && (colBloqueIndex == boxSeleccionado.colBloqueIndex)) {
        return true
    }
    return false
}

// Recibe fila bloque y fila box y box seleccionado
// Retorna verdadero si el box seleccionado esta en la fila
function filaSeleccionada(filaBloqueIndex, filaBoxIndex, boxSeleccionado) {
    // Para saber si el box evauado es de la misma fila al seleccionado
    // comparamos los valores de fila bloque y fila box
    if ((filaBloqueIndex == boxSeleccionado.filaBloqueIndex) && (filaBoxIndex == boxSeleccionado.filaBoxIndex)) {
        return true
    }
    return false
}

// Recibe columna bloque y columna box y box seleccionado
// Retorna verdadero si el box seleccionado esta en la columna
function columnaSeleccionada (colBloqueIndex, colBoxIndex, boxSeleccionado) {
    // Para saber si el box evauado es de la misma columna al seleccionado
    // comparamos los valores de columna bloque y columna box
    if ((colBloqueIndex == boxSeleccionado.colBloqueIndex) && (colBoxIndex == boxSeleccionado.colBoxIndex)) {
        return true
    }
    return false
}

export { valorValido, bloqueSeleccionado, filaSeleccionada, columnaSeleccionada }