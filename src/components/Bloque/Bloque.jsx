import './Bloque.css'
import Box from '../Box/Box.jsx'

// Para identificar a cada uno de los elementos (box) del tablero se necesita 4 numeros
// fila y columna del bloque, y fila y columna del box


function Bloque({ tableroActual, setTableroActual, tableroInicial, filaBloqueIndex, colBloqueIndex, boxSeleccionado, setBoxSeleccionado, apuntesActivados, apuntes, setApuntes }) {
    return (
        <>
            <div className='contenedor-bloque'>
                {tableroActual[filaBloqueIndex][colBloqueIndex].map((filaBox, filaBoxIndex) => (
                    filaBox.map((_, colBoxIndex) => (
                        <Box 
                        key={`${filaBoxIndex}-${colBoxIndex}`} 
                        tableroActual={tableroActual} setTableroActual={setTableroActual} tableroInicial={tableroInicial}
                        filaBloqueIndex={filaBloqueIndex} colBloqueIndex={colBloqueIndex} 
                        filaBoxIndex={filaBoxIndex} colBoxIndex={colBoxIndex} 
                        boxSeleccionado={boxSeleccionado} setBoxSeleccionado={setBoxSeleccionado} 
                        apuntesActivados={apuntesActivados} 
                        apuntes={apuntes} setApuntes={setApuntes} />
                    ))
                ))}
            </div>
        </>
    )
}

export default Bloque