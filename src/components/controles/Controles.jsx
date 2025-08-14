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
                <button id='reiniciar' onMouseDown={handleReiniciar}>↻</button>
                <button id='borrar' onMouseDown={handleBorrar}>↩</button>
                <button id='apuntes' className={apuntesActivados ? 'apuntes-activados' : "" } onMouseDown={handleApuntes} >✎</button>
            </div>
        </>
    )
}

export default Controles