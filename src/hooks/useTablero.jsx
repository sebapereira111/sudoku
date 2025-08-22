import { tableroVacio } from "../constants/tableros";
import { useState } from "react";

//////////////////////////////////////////////////////////////////////////////////////////////////
// En este archivo se encuentran centralizadas las variables usadas para administrar el tablero
//////////////////////////////////////////////////////////////////////////////////////////////////

function useTablero() {
    // Tablero resultado en base al cual se realiza el resto del juego
    const [tableroResultado, setTableroResultado] = useState(structuredClone(tableroVacio));
    // Tablero con los valores faltantes de acuerdo a la dificultad seleccionada, sirve para iniciar/reiniciar
    const [tableroInicial, setTableroInicial] = useState(structuredClone(tableroVacio));
    // Tablero de trabajo, es el que se muestra en pantalla
    const [tableroActual, setTableroActual] = useState(structuredClone(tableroVacio));
    // El box que esta selecionado actualmente en el tablero
    // Si esta seleccionado filaBloqueIndex = 3 es ningun box seleccionado
    const [boxSeleccionado, setBoxSeleccionado] = useState({
        filaBloqueIndex: 3,
        colBloqueIndex: 0,
        filaBoxIndex: 0,
        colBoxIndex: 0
    });
    // Avisa si los apuntes estan seleccionados o no
    const [apuntesActivados, setApuntesActivados] = useState(false);
    // Los apuntes son otro tablero pero que en el lugar de cada box tienen un array de 9 items que guardan los apuntes
    const [apuntes, setApuntes] = useState(Array.from({ length: 3 }, () =>
        Array.from({ length: 3 }, () =>
            Array.from({ length: 3 }, () =>
                Array.from({ length: 3 }, () => Array(9).fill(0))
            )
        )
    ));
    // Dificultad es cuantos boxes se eliminan
    const [dificultad, setDificultad] = useState(45);
    // Selecciona/avisa si el nuevo tablero debe ser de solucion unica
    const [solucionUnica, setSolucionUnica] = useState(true);
    const [teclado, setTeclado] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    // Variables del cronometro
    const [tiempo, setTiempo] = useState(0);
    const [contando, setContando] = useState(false);

    return {
        tableroResultado, setTableroResultado,
        tableroInicial, setTableroInicial,
        tableroActual, setTableroActual,
        boxSeleccionado, setBoxSeleccionado,
        apuntesActivados, setApuntesActivados,
        apuntes, setApuntes,
        dificultad, setDificultad,
        solucionUnica, setSolucionUnica,
        teclado, setTeclado,
        tiempo, setTiempo,
        contando, setContando
    };
}

export { useTablero }