import { useState } from 'react';
import './Box.css'
import { classSelector } from '../../utils/boxColors';

function Box({ tableroActual, setTableroActual, tableroInicial, filaBloqueIndex, colBloqueIndex, filaBoxIndex, colBoxIndex, boxSeleccionado, setBoxSeleccionado, apuntesActivados }) {
    const [apuntes, setApuntes] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    // El valor del box, solo para no tener que esctibir todo cada vez
    const valor = tableroActual[filaBloqueIndex][colBloqueIndex][filaBoxIndex][colBoxIndex];

    // Se encarga de actualizar cual es el box seleccionado
    function handleClick(e) {
        e.stopPropagation();
        setBoxSeleccionado((prev) => {
            const newArr = structuredClone(prev);
            newArr.filaBloqueIndex = filaBloqueIndex;
            newArr.colBloqueIndex = colBloqueIndex;
            newArr.filaBoxIndex = filaBoxIndex;
            newArr.colBoxIndex = colBoxIndex;
            return newArr
        });
    }

    // Se encaraga de actualizar el valor en el box seleccionado (con foco)
    // Primero filtra solo los valores validos y actualiza el tablero actual correspondientemente
    // Luego actualiza el valor de box seleccionado
    function handleKeyDown(e) {
        const esNumero = /^[1-9]$/.test(e.key);
        const esCero = e.key === '0';
        const esDelete = e.key === 'Delete';
        const esBackspace = e.key === 'Backspace';

        if (tableroInicial[boxSeleccionado.filaBloqueIndex][boxSeleccionado.colBloqueIndex][boxSeleccionado.filaBoxIndex][boxSeleccionado.colBoxIndex]) {
            return
        }

        if (esDelete || esBackspace || esCero) {
            setTableroActual((prev => {
                const newArr = structuredClone(prev);
                newArr[boxSeleccionado.filaBloqueIndex][boxSeleccionado.colBloqueIndex][boxSeleccionado.filaBoxIndex][boxSeleccionado.colBoxIndex] = 0;
                return newArr
            }));         
        }

        if (apuntesActivados) {
            if (valor) {
                return
            }
            if (esNumero) {
                if (+e.key == apuntes[+e.key - 1]) {
                    setApuntes((prev) => {
                        const newArr = structuredClone(prev);
                        newArr[+e.key - 1] = 0;
                        return newArr;
                    });
                } else {
                    setApuntes((prev) => {
                        const newArr = structuredClone(prev);
                        newArr[+e.key - 1] = +e.key;
                        return newArr;
                    });
                }
            }
            return
        }

        if (esNumero) {
            setTableroActual((prev => {
                const newArr = structuredClone(prev);
                newArr[boxSeleccionado.filaBloqueIndex][boxSeleccionado.colBloqueIndex][boxSeleccionado.filaBoxIndex][boxSeleccionado.colBoxIndex] = +e.key;
                return newArr
            }));
        }
    }

    function mostrarApuntes() {
        return (
            <div className='box-apuntes'>
                {apuntes.map((item, index) => <span key={index} >{item ? item : " "}</span>)}
            </div>
        )
    }
    
    return (
        <div className={classSelector(tableroActual, tableroInicial, filaBloqueIndex, colBloqueIndex, filaBoxIndex, colBoxIndex, boxSeleccionado)} 
        onMouseDown={handleClick} 
        onKeyDown={handleKeyDown} 
        tabIndex={0} >
            {valor ? valor : mostrarApuntes()}
        </div>
    )
}

export default Box