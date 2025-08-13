import { useRef, useState } from 'react';
import './Box.css'
import { classSelector } from '../../utils/boxColors';

function Box({ tableroActual, setTableroActual, tableroInicial, filaBloqueIndex, colBloqueIndex, filaBoxIndex, colBoxIndex, boxSeleccionado, setBoxSeleccionado }) {
    
    // Se encarga de actualizar cual es el box seleccionado
    function handleClick() {
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

        if (!tableroInicial[filaBloqueIndex][colBloqueIndex][filaBoxIndex][colBoxIndex]) {
            if (esNumero) {
                setTableroActual((prev => {
                    const newArr = structuredClone(prev);
                    newArr[filaBloqueIndex][colBloqueIndex][filaBoxIndex][colBoxIndex] = +e.key;
                    return newArr
                }));
            } else if (esDelete || esBackspace || esCero) {
                setTableroActual((prev => {
                    const newArr = structuredClone(prev);
                    newArr[filaBloqueIndex][colBloqueIndex][filaBoxIndex][colBoxIndex] = 0;
                    return newArr
                }));         
            }
        }
    }
    
    return (
        <div className={classSelector(tableroActual, tableroInicial, filaBloqueIndex, colBloqueIndex, filaBoxIndex, colBoxIndex, boxSeleccionado)} 
        onClick={handleClick} 
        onKeyDown={handleKeyDown} 
        tabIndex={0} >
                {tableroActual[filaBloqueIndex][colBloqueIndex][filaBoxIndex][colBoxIndex] ? tableroActual[filaBloqueIndex][colBloqueIndex][filaBoxIndex][colBoxIndex] : ""}
        </div>
    )
}

export default Box