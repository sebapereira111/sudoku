import { useRef, useState } from 'react';
import './Box.css'

function Box({ tableroActualBox, setTableroActual, tableroInicial, filaBloqueIndex, colBloqueIndex, filaBoxIndex, colBoxIndex, boxSeleccionado, setBoxSeleccionado }) {
    const [valor, setValor] = useState(tableroActualBox)
    const inicial = useRef(tableroActualBox ? true : false);
    
    function handleClick() {
        setBoxSeleccionado({
            filaBloqueIndex: filaBloqueIndex,
            colBloqueIndex: colBloqueIndex,
            filaBoxIndex: filaBoxIndex,
            colBoxIndex: colBoxIndex,
            valor: valor
        });
        console.log(valor);
        console.log(boxSeleccionado.valor);
    }

    function handleKeyDown(e) {
        const esNumero = /^[1-9]$/.test(e.key);
        const esDelete = e.key === 'Delete';
        const esBackspace = e.key === 'Backspace';

        if (!inicial.current) {
            if (esNumero) {
                setValor(+e.key);
            } else if (esDelete || esBackspace) {
                setValor("");
            }
        }
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

    function valorSeleccionado() {
        if (valor && (valor == boxSeleccionado.valor)) {
            return true
        }
    }
    
    return (
        <div className={`box 
            ${itemSeleccionado()&&'box-seleccionado'} 
            ${areaSeleccionada()&&'area-seleccionada'}
            ${inicial.current&&'texto-original'}
            ${valorSeleccionado()&&'numero-seleccionado'}`
        }
        onClick={handleClick} 
        onKeyDown={handleKeyDown} 
        tabIndex={0} >
                {valor ? valor : ""}
        </div>
    )
}

export default Box