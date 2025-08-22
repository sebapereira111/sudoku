import './Box.css'
import { classSelector } from '../../utils/boxColors';
import { inputChange } from '../../utils/inputChange';
import { useTableroContext } from '../../context/TableroProvider.jsx'

function Box({ filaBloqueIndex, colBloqueIndex, filaBoxIndex, colBoxIndex }) {
    // importamos las variables de contexto
    const { 
        tableroResultado,
        tableroInicial,
        tableroActual, setTableroActual,
        boxSeleccionado, setBoxSeleccionado,
        apuntesActivados, setApuntesActivados,
        apuntes, setApuntes, 
        teclado, setTeclado,
        setDificultad,
        solucionUnica,
        tiempo, setTiempo,
        contando, setContando
     } = useTableroContext();

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
        inputChange(e, tableroInicial, boxSeleccionado, setBoxSeleccionado, setTableroActual, apuntesActivados, setApuntesActivados, tableroActual, apuntes, setApuntes, setDificultad, teclado, setTeclado, setTiempo, setContando);
    }

    // Se encarga de mostrar los apuntes en el box si ese box esta en cero
    function mostrarApuntes() {
        return (
            <div className='box-apuntes'>
                {apuntes[filaBloqueIndex][colBloqueIndex][filaBoxIndex][colBoxIndex].map((item, index) => <span key={index} >{item ? item : " "}</span>)}
            </div>
        )
    }
    
    return (
        <div className={classSelector(tableroActual, tableroInicial, filaBloqueIndex, colBloqueIndex, filaBoxIndex, colBoxIndex, boxSeleccionado)} 
        onMouseDown={handleClick} 
        onKeyDown={handleKeyDown} 
        tabIndex={0} 
        id={filaBloqueIndex+'-'+colBloqueIndex+'-'+filaBoxIndex+'-'+colBoxIndex} >
            {valor ? valor : mostrarApuntes()}
        </div>
    )
}

export default Box