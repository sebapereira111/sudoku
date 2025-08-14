import './Controles.css'

function Controles({ setTableroActual, tableroInicial, boxSeleccionado, apuntesActivados, setApuntesActivados }) {
    const valorSeleccionado = tableroInicial[boxSeleccionado.filaBloqueIndex][boxSeleccionado.colBloqueIndex][boxSeleccionado.filaBoxIndex][boxSeleccionado.colBoxIndex];


    function handleReiniciar(e) {
        e.stopPropagation();
        e.preventDefault();
    }

    function handleBorrar(e) {
        e.stopPropagation();
        e.preventDefault();
        if (!valorSeleccionado) {
            setTableroActual((prev => {
                const newArr = structuredClone(prev);
                newArr[boxSeleccionado.filaBloqueIndex][boxSeleccionado.colBloqueIndex][boxSeleccionado.filaBoxIndex][boxSeleccionado.colBoxIndex] = 0;
                return newArr
            }));  
        } 
    }

    function handleApuntes(e) {
        e.stopPropagation();
        e.preventDefault();
        if(apuntesActivados) {
            setApuntesActivados(false);
        } else {
            setApuntesActivados(true);
        }
    }

    return (
        <>
            <div className='contenedor-controles'>
                <div className='contenedor-utilidades'>
                    <button id='reiniciar' className='boton-controles' onMouseDown={handleReiniciar}>↻</button>
                    <button id='borrar' className='boton-controles' onMouseDown={handleBorrar}>↩</button>
                    <button id='apuntes' className={apuntesActivados ? 'boton-controles apuntes-activados' : 'boton-controles' } onMouseDown={handleApuntes} >✎</button>    
                </div>
                

            </div>
        </>
    )
}

export default Controles