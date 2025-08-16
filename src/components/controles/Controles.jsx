import './Controles.css'
import { inputChange } from '../../utils/inputChange';

function Controles({ setTableroActual, tableroInicial, boxSeleccionado, setBoxSeleccionado, apuntesActivados, setApuntesActivados, tableroActual, apuntes, setApuntes }) {

    function handleNuevo(e) {
        e.stopPropagation();
        e.preventDefault();
    }

    function handleMouseDown(e) {
        e.stopPropagation();
        e.preventDefault();
        inputChange(e, tableroInicial, boxSeleccionado, setBoxSeleccionado, setTableroActual, apuntesActivados, setApuntesActivados, tableroActual, apuntes, setApuntes);
    }

    return (
        <>
            <div className='contenedor-controles'>
                <div className='contenedor-utilidades'>
                    <button title='Nuevo juego' id='nuevo' className='boton-utilidades' onMouseDown={handleNuevo}>▶︎</button>
                    <button title='Reiniciar juego' id='reset' className='boton-utilidades' onMouseDown={handleMouseDown}>↻</button>
                    <button title='Borrar celda' id='borrar' className='boton-utilidades' onMouseDown={handleMouseDown}>↩</button>
                    <button title='Apuntes' id='apuntes' className={apuntesActivados ? 'boton-utilidades apuntes-activados' : 'boton-utilidades' } onMouseDown={handleMouseDown} >✎</button>    
                </div>
                <div className='contenedor-teclado'>
                    {/* Genera un array de 9 elementos button para el teclado */}
                    {Array.from({ length: 9 }, (_, index) => <button key={1 + index} id={1 + index} title={`Numero ${1 + index}`} className='boton-teclado' onMouseDown={handleMouseDown}>{1 + index}</button> )}
                </div>
            </div>
        </>
    )
}

export default Controles