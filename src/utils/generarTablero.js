import { tableroValido } from "../constants/tableros";

function reemplazarEnTablero(tablero, viejo, nuevo) {
    return tablero.map(filaBloque =>
        filaBloque.map(bloque =>
            bloque.map(filaBox =>
                filaBox.map(box =>
                    box == viejo ? nuevo : box
                )
            )
        )
  );
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

    // Hacemos swap de filas dentro de cad grupo de 3 filas

    // Hacemos swap de columnas dentro de cada grupo de 3 columnas

    // Hacemos swap de fila de bloques

    // Hacemos swap de columna de bloques

    return tableroInicio;
}

export { generarTablero }