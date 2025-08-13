import './Tablero.css'
import Bloque from '../Bloque/Bloque.jsx'

function Tablero({ tableroActual, setTableroActual, tableroInicial, boxSeleccionado, setBoxSeleccionado, apuntesActivados }) {
    return (
        <>
            <div className='contenedor-tablero'>
                {tableroActual.map((filaBloque, filaBloqueIndex) => (
                    filaBloque.map((_, colBloqueIndex) => (
                        <Bloque 
                        key={`${filaBloqueIndex}-${colBloqueIndex}`} 
                        tableroActual={tableroActual} setTableroActual={setTableroActual} tableroInicial={tableroInicial}
                        filaBloqueIndex={filaBloqueIndex} colBloqueIndex={colBloqueIndex} 
                        boxSeleccionado={boxSeleccionado} setBoxSeleccionado={setBoxSeleccionado}
                        apuntesActivados={apuntesActivados} />
                    ))
                ))}
            </div>
        </>
    )
}

export default Tablero