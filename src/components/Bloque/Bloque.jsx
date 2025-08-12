import './Bloque.css'
import Box from '../Box/Box.jsx'

// Para identificar a cada uno de los elementos (box) del tablero se necesita 4 numeros
// fila y columna del bloque, y fila y columna del box


function Bloque({ tableroActualBloque, setTableroActual, tableroInicial, filaBloqueIndex, colBloqueIndex, boxSeleccionado, setBoxSeleccionado }) {
    return (
        <>
            <div className='contenedor-bloque'>
                {tableroActualBloque.map((filaBox, filaBoxIndex) => (
                    filaBox.map((tableroActualBox, colBoxIndex) => (
                        <Box 
                        key={`${filaBoxIndex}-${colBoxIndex}`} 
                        tableroActualBox={tableroActualBox} setTableroActual={setTableroActual} tableroInicial={tableroInicial}
                        filaBloqueIndex={filaBloqueIndex} colBloqueIndex={colBloqueIndex} 
                        filaBoxIndex={filaBoxIndex} colBoxIndex={colBoxIndex} 
                        boxSeleccionado={boxSeleccionado} setBoxSeleccionado={setBoxSeleccionado} 
                        />
                    ))
                ))}
            </div>
        </>
    )
}

export default Bloque