function borrarTecla(input, tableroActual, teclado, setTeclado, boxSeleccionado, valor) {
    const tecladoTemporal = structuredClone(teclado);
    if (valor) {
        tecladoTemporal[valor-1] = valor;
    }
    const tempTableroActual = structuredClone(tableroActual);
    tempTableroActual[boxSeleccionado.filaBloqueIndex][boxSeleccionado.colBloqueIndex][boxSeleccionado.filaBoxIndex][boxSeleccionado.colBoxIndex] = 0;
    const cantidad = tempTableroActual.flat(3).filter((item) => item == (+input)).length;
    if (cantidad > 7) {
        tecladoTemporal[+input - 1] = 0;
    }
    setTeclado(tecladoTemporal);
}












// Funcion que resetea el teclado
// Revisa el tablero recibido y de acuerdo a eso habilita las teclas
// Se usa cuando se resetea el tablero o con tablero nuevo
function resetTeclado(tablero, setTeclado) {
    const tableroArray = tablero.flat(3);
    const newTeclado = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i = 0; i < 9; i++) {
        const cantidad = tableroArray.filter((item) => item == (i + 1)).length;
        if (cantidad > 8) {
            newTeclado[i] = 0;
        }
    }
    setTeclado(newTeclado);
}

// Funcion que resetea el tablero
function resetTablero(tableroInicial, setBoxSeleccionado, setTableroActual, setApuntesActivados, setApuntes, setTeclado) {
    // El tablero de trabajo se establece en el inicial
    setTableroActual(structuredClone(tableroInicial));
    // Se borran los apuntes
    setApuntes(Array.from({ length: 3 }, () =>
        Array.from({ length: 3 }, () => 
            Array.from({ length: 3 }, () => 
                Array.from({ length: 3 }, () => Array(9).fill(0))
            )
        )
    ));
    // Se desactivan los apuntes
    setApuntesActivados(false);
    // Se selecciona ningun box >>> filaBloqueIndex: 3
    setBoxSeleccionado({
        filaBloqueIndex: 3,
        colBloqueIndex: 0,
        filaBoxIndex: 0,
        colBoxIndex: 0
    });
    resetTeclado(tableroInicial, setTeclado)
}

// Cuando se presionan las flechas para mover el box seleccionado
function moverSeleccionado(boxSeleccionado, setBoxSeleccionado, input) {
    // Se extrae la posicion del cursor
    let filaBloqueIndex = boxSeleccionado.filaBloqueIndex;
    let colBloqueIndex = boxSeleccionado.colBloqueIndex;
    let filaBoxIndex = boxSeleccionado.filaBoxIndex;
    let colBoxIndex = boxSeleccionado.colBoxIndex;
    // Se modifica la posicion del cursor dependiendo de cual fue la tecla pulsada
    if (input == 'ArrowUp') {
        if (boxSeleccionado.filaBoxIndex > 0) {
            filaBoxIndex--;
        } else if (boxSeleccionado.filaBloqueIndex > 0) {
            filaBloqueIndex--;
            filaBoxIndex = 2;
        }
    }
    if (input == 'ArrowDown') {
        if (boxSeleccionado.filaBoxIndex < 2) {
            filaBoxIndex++;
        } else if (boxSeleccionado.filaBloqueIndex < 2) {
            filaBloqueIndex++;
            filaBoxIndex = 0;
        }
    }
    if (input == 'ArrowLeft') {
        if (boxSeleccionado.colBoxIndex > 0) {
            colBoxIndex--;
        } else if (boxSeleccionado.colBloqueIndex > 0) {
            colBloqueIndex--;
            colBoxIndex = 2;
        }
    }
    if (input == 'ArrowRight') {
        if (boxSeleccionado.colBoxIndex < 2) {
            colBoxIndex++;
        } else if (boxSeleccionado.colBloqueIndex < 2) {
            colBloqueIndex++;
            colBoxIndex = 0;
        }
    }
    // Se crea un nuevo objeto en base a la nneva posicion modificada y se guarda en setBoxSeleccionado
    const newObj = {
        filaBloqueIndex: filaBloqueIndex,
        colBloqueIndex: colBloqueIndex,
        filaBoxIndex: filaBoxIndex,
        colBoxIndex: colBoxIndex
    }
    setBoxSeleccionado(newObj);
    // Se le da foco al nuevo elemento seleccionado
    const elementoEnFoco = document.getElementById(filaBloqueIndex+'-'+colBloqueIndex+'-'+filaBoxIndex+'-'+colBoxIndex);
    elementoEnFoco.focus();
}

// Funcion que borra el box seleccionado
function borrarBox(boxSeleccionado, setTableroActual, setApuntes, teclado, setTeclado, valor) {
    // Se borran los apuntes
    setApuntes((prev) => {
        const newArr = structuredClone(prev);
        newArr[boxSeleccionado.filaBloqueIndex][boxSeleccionado.colBloqueIndex][boxSeleccionado.filaBoxIndex][boxSeleccionado.colBoxIndex] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        return newArr;
    });
    // Se borra el valor del box
    setTableroActual((prev => {
        const newArr = structuredClone(prev);
        newArr[boxSeleccionado.filaBloqueIndex][boxSeleccionado.colBloqueIndex][boxSeleccionado.filaBoxIndex][boxSeleccionado.colBoxIndex] = 0;
        return newArr
    }));
    // Si en el teclado se habia deshabilitado, se vuelve a habilitar esa tecla
    // falta arreglar para que solo rehabilite, ahora siempre sobreescribe
    const newTeclado = teclado;
    newTeclado[valor-1] = valor;
    setTeclado(newTeclado);
}

// inputChange recibe un evento y los parametros. 
// Dependiendo del evento recibido redirecciona a la funcion correspondiente
function inputChange(e, tableroInicial, boxSeleccionado, setBoxSeleccionado, setTableroActual, apuntesActivados, setApuntesActivados, tableroActual, apuntes, setApuntes, setDificultad, teclado, setTeclado) {
    // Se filtra solo los eventos que son manejados por la funcion
    if (!(e.type == 'keydown' || e.type == 'mousedown' || e.type == 'change')) {
        return
    }
    
    // Se carga el valor ingresado a una variable temporal
    const tempInput = (e.type == 'keydown') ? e.key : e.target.id
    // Si el valor ingresado (de la variable temporal) es un numero se pasa de texto a numero
    const input = /^[0-9]$/.test(tempInput) ? +tempInput : tempInput
  
    console.log(input)

    // Se crean variables de acuerdo al valor ingresado para discriminar mas facil
    // Con estos valores se llama a la funcion correspondiente
    const esReset = ['reset', 'r', 'R'].includes(input);
    const esBorrar = ['borrar', 0, 'Delete', 'Backspace'].includes(input);
    const esApunte = ['apuntes', 'a', 'A', ' '].includes(input);
    const esNumero = /^[1-9]$/.test(input);
    const esDificultad = ['dificultad'].includes(input);
    const esFlecha = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(input);
    
    ///////////////////////////////////////////////////////////////////////
    // Desde aqui se determina la entrada y que hay que hacer en cada caso
    //////////////////////////////////////////////////////////////////////
    
    // Si es el slider de dificultad, se ajusta el slider al valor seleccionado
    if (esDificultad) {
        setDificultad(Number(e.target.value));
        return
    }

    // Si se presiona r o R o tecla reset, se llama la funcion para resetear el tablero
    if (esReset) {
        resetTablero(tableroInicial, setBoxSeleccionado, setTableroActual, setApuntesActivados, setApuntes, setTeclado);
        return
    }

    // Si se presiona a o A o tecla apuntes, se hace toggle de la opcion de apuntes
    if (esApunte) {
        if(apuntesActivados) {
            setApuntesActivados(false);
        } else {
            setApuntesActivados(true);
        }
        return
    }

    // boxSeleccionado.filaBloqueIndex == 3. es para el inicio cuando no hay ningun elemento selecionado
    // Se retorna sin hacer nada en ese caso
    if (boxSeleccionado.filaBloqueIndex == 3) {
        return
    }

    // En caso contrario, tiene que haber algun box seleccionado, su valor se carga para facil acceso
    const valor = tableroActual[boxSeleccionado.filaBloqueIndex][boxSeleccionado.colBloqueIndex][boxSeleccionado.filaBoxIndex][boxSeleccionado.colBoxIndex];
    
    // Si se pulso alguna flecha, se llama la funcion para mover el box seleccionado
    if(esFlecha) {
        moverSeleccionado(boxSeleccionado, setBoxSeleccionado, input);
        return
    }

    // Si el box seleccionado es no modificable (numero con texto negro, del tablero inicial) no se hace nada
    // estas lineas tienen que estar antes de los que modifican el tablero
    if (tableroInicial[boxSeleccionado.filaBloqueIndex][boxSeleccionado.colBloqueIndex][boxSeleccionado.filaBoxIndex][boxSeleccionado.colBoxIndex]) {
        return
    }

    // Si es borrar se llama a la funcion para borrar el box
    if (esBorrar) {
        borrarBox(boxSeleccionado, setTableroActual, setApuntes, teclado, setTeclado, valor);
        return
    }















    if (esNumero) {
        if (apuntesActivados) {
            // Si apuntes esta activado primero borra el valor que habia en el box si habia algo
            if (valor) {
                setTableroActual((prev => {
                    const newArr = structuredClone(prev);
                    newArr[boxSeleccionado.filaBloqueIndex][boxSeleccionado.colBloqueIndex][boxSeleccionado.filaBoxIndex][boxSeleccionado.colBoxIndex] = 0;
                    return newArr
                }));
                const newTeclado = teclado;
                newTeclado[valor-1] = valor;
                setTeclado(newTeclado);
            }
            if (+input == apuntes[boxSeleccionado.filaBloqueIndex][boxSeleccionado.colBloqueIndex][boxSeleccionado.filaBoxIndex][boxSeleccionado.colBoxIndex][+input - 1]) {
                setApuntes((prev) => {
                    const newArr = structuredClone(prev);
                    newArr[boxSeleccionado.filaBloqueIndex][boxSeleccionado.colBloqueIndex][boxSeleccionado.filaBoxIndex][boxSeleccionado.colBoxIndex][+input - 1] = 0;
                    return newArr;
                });
            } else {
                setApuntes((prev) => {
                    const newArr = structuredClone(prev);
                    newArr[boxSeleccionado.filaBloqueIndex][boxSeleccionado.colBloqueIndex][boxSeleccionado.filaBoxIndex][boxSeleccionado.colBoxIndex][+input - 1] = +input;
                    return newArr;
                });
            }
        } else {
            if (teclado[+input-1]) {
                setTableroActual((prev => {
                    const newArr = structuredClone(prev);
                    newArr[boxSeleccionado.filaBloqueIndex][boxSeleccionado.colBloqueIndex][boxSeleccionado.filaBoxIndex][boxSeleccionado.colBoxIndex] = +input;
                    return newArr
                }));
                borrarTecla(input, tableroActual, teclado, setTeclado, boxSeleccionado, valor);
            }
        }
        return
    }
}

export { inputChange, resetTeclado }