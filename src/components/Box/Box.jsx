import './Box.css'

function Box({ tableroBox, filaBloqueIndex, colBloqueIndex, filaBoxIndex, colBoxIndex, boxSeleccionado, setBoxSeleccionado }) {
    function handleClick() {
        setBoxSeleccionado({
            filaBloqueIndex: filaBloqueIndex,
            colBloqueIndex: colBloqueIndex,
            filaBoxIndex: filaBoxIndex,
            colBoxIndex: colBoxIndex
        });
    }

    function areaSeleccionada() {
        /* Para cambiar el color de fondo del bloque seleccionado */
        if (filaBloqueIndex == boxSeleccionado.filaBloqueIndex) {
            if (colBloqueIndex == boxSeleccionado.colBloqueIndex) {
                return true
            }
        }
        /* Para cambiar el color de fondo de la fila seleccionada */
        if (filaBloqueIndex == boxSeleccionado.filaBloqueIndex) {
            if (filaBoxIndex == boxSeleccionado.filaBoxIndex) {
                return true
            }
        }
        /* Para cambiar el color de fondo de la columna seleccionada */
        if (colBloqueIndex == boxSeleccionado.colBloqueIndex) {
            if (colBoxIndex == boxSeleccionado.colBoxIndex) {
                return true
            }
        }
        return false
    }

    function itemSeleccionado() {
        if (filaBloqueIndex == boxSeleccionado.filaBloqueIndex) {
            if (colBloqueIndex == boxSeleccionado.colBloqueIndex) {
                if (filaBoxIndex == boxSeleccionado.filaBoxIndex) {
                    if (colBoxIndex == boxSeleccionado.colBoxIndex) {
                        return true
                    }
                }
            }
        }
        return false
    }
    
    return (
        <div className={itemSeleccionado() ? 'box box-seleccionado' : areaSeleccionada() ? 'box area-seleccionada' : 'box'} onClick={handleClick} >
            {tableroBox ? tableroBox : ""}
        </div>
    )
}

export default Box