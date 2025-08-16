import { test, tableroValido } from "../constants/tableros";
import { valorValido } from "./validacion";

// Recibe una matriz tablero y 2 numeros, reemplaza el segundo numero en la ubicacion del primero
function reemplazarEnTablero(tablero, viejo, nuevo) {
    const result = structuredClone(tablero);
    return result.map(filaBloque =>
        filaBloque.map(bloque =>
            bloque.map(filaBox =>
                filaBox.map(box =>
                    box == viejo ? nuevo : box
                )
            )
        )
  );
}

// Recibe una matriz tablero, retorna la matriz con las filas del mismo bloque intercambiadas aleatoriamente
function swapFilas(tablero) {
    const result = structuredClone(tablero);
    for (let i = 0; i < 3; i++) {
        for (let k = 2; k > 0; k--) {
            const l = Math.floor(Math.random() * (k + 1));
            [result[i][0][k], result[i][0][l]] = [result[i][0][l], result[i][0][k]];
            [result[i][1][k], result[i][1][l]] = [result[i][1][l], result[i][1][k]];
            [result[i][2][k], result[i][2][l]] = [result[i][2][l], result[i][2][k]];
        }
    }
    return result;
}

// Recibe una matriz tablero, retorna la matriz con las filas de bloques intercambiadas aleatoriamente
function swapBloques(tablero) {
    const result = structuredClone(tablero);
    for (let i = 2; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result
} 

// Recibe una matriz tablero, retorna la matris transposicion
function transposicionTablero(tablero) {
    let result = structuredClone(tablero);
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            result[i][j] = result[i][j][0].map((_, colIndex) => 
                result[i][j].map(fila => fila[colIndex])
            );
        }
    }
    result = result[0].map((_, colIndex) => 
        result.map(fila => fila[colIndex])
    );
    return result
}

function generarTablero() {
    // Primero clonamos le tablero valido para no modificar la referencia
    let tableroInicio = structuredClone(tableroValido)

    // Hacemos swap de numeros del 1 al 9
    // Se hace swap por cada numero del 1 al 9
    for (let i = 1; i < 10; i++) {
        // Generamos el numero con el cual vamos a hacer el swap
        const j = Math.floor(Math.random() * 9) + 1;
        tableroInicio = reemplazarEnTablero(tableroInicio, i, 0);
        tableroInicio = reemplazarEnTablero(tableroInicio, j, i);
        tableroInicio = reemplazarEnTablero(tableroInicio, 0, j);
    }

    // Hacemos swap de filas dentro de cada grupo de 3 filas
    tableroInicio = swapFilas(tableroInicio);

    // Hacemos swap de columnas dentro de cada grupo de 3 columnas
    // Primero hacemos transposicion de la matriz
    tableroInicio = transposicionTablero(tableroInicio);
    // Hacemos nuevamente swap de las filas (que antes eran las columnas)
    tableroInicio = swapFilas(tableroInicio);

    // Hacemos swap de fila de bloques
    tableroInicio = swapBloques(tableroInicio);

    // Hacemos swap de columna de bloques
    // Primero hacemos transposicion de la matriz
    tableroInicio = transposicionTablero(tableroInicio);
    // Hacemos swap de fila de bloques (que antes eran las columnas)
    tableroInicio = swapBloques(tableroInicio);

    // Retornamos el resultado
    return tableroInicio;
}

export { generarTablero }