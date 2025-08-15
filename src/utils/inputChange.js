// Se encaraga de actualizar el valor en el box seleccionado (con foco)
// Primero filtra solo los valores validos y actualiza el tablero actual correspondientemente
// Luego actualiza el valor de box seleccionado
function inputChange(e, tableroInicial, boxSeleccionado, setBoxSeleccionado, setTableroActual, apuntesActivados, tableroActual, apuntes, setApuntes) {
    const valor = tableroActual[boxSeleccionado.filaBloqueIndex][boxSeleccionado.colBloqueIndex][boxSeleccionado.filaBoxIndex][boxSeleccionado.colBoxIndex];
    
    // Se filtra el tipo de entrada
    if (!(e.type == 'keydown' || e.type == 'mousedown')) {
        return
    }

    // Se carga el valor del input recibido como texto (igual si es numero)
    const input = (e.type == 'keydown') ? e.key : e.target.id
    // Para comprobar si es uno de los inputs validos
    const esNumero = /^[1-9]$/.test(input);
    const esBorrar = ['0', 'Delete', 'Backspace', 'borrar'].includes(input);
    const esFlecha = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(input);

    // Si se presiona alguna de las flechas para mover el box seleccionado
    if(esFlecha) {
        let filaBloqueIndex = boxSeleccionado.filaBloqueIndex;
        let colBloqueIndex = boxSeleccionado.colBloqueIndex;
        let filaBoxIndex = boxSeleccionado.filaBoxIndex;
        let colBoxIndex = boxSeleccionado.colBoxIndex;
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
        const newObj = {
            filaBloqueIndex: filaBloqueIndex,
            colBloqueIndex: colBloqueIndex,
            filaBoxIndex: filaBoxIndex,
            colBoxIndex: colBoxIndex
        }
        setBoxSeleccionado(newObj);
        const elementoEnFoco = document.getElementById(filaBloqueIndex+'-'+colBloqueIndex+'-'+filaBoxIndex+'-'+colBoxIndex);
        elementoEnFoco.focus();
    }

    // Si el box seleccionado es no modificable (del tablero inicial) se retorna
    if (tableroInicial[boxSeleccionado.filaBloqueIndex][boxSeleccionado.colBloqueIndex][boxSeleccionado.filaBoxIndex][boxSeleccionado.colBoxIndex]) {
        return
    }

    // Si es borrar se borra el box seleccionado
    if (esBorrar) {
        setApuntes((prev) => {
            const newArr = structuredClone(prev);
            newArr[boxSeleccionado.filaBloqueIndex][boxSeleccionado.colBloqueIndex][boxSeleccionado.filaBoxIndex][boxSeleccionado.colBoxIndex] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
            return newArr;
        });
        setTableroActual((prev => {
            const newArr = structuredClone(prev);
            newArr[boxSeleccionado.filaBloqueIndex][boxSeleccionado.colBloqueIndex][boxSeleccionado.filaBoxIndex][boxSeleccionado.colBoxIndex] = 0;
            return newArr
        }));
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
            setTableroActual((prev => {
                const newArr = structuredClone(prev);
                newArr[boxSeleccionado.filaBloqueIndex][boxSeleccionado.colBloqueIndex][boxSeleccionado.filaBoxIndex][boxSeleccionado.colBoxIndex] = +input;
                return newArr
            }));
        }
    }
}

export { inputChange }

