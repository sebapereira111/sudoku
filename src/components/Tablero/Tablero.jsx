import './Tablero.css'
import Bloque from '../Bloque/Bloque.jsx'

function Tablero({ tableroActual, setTableroActual, tableroInicial, boxSeleccionado, setBoxSeleccionado, apuntesActivados, apuntes, setApuntes }) {
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
                        apuntesActivados={apuntesActivados} 
                        apuntes={apuntes} setApuntes={setApuntes} />
                    ))
                ))}
            </div>
        </>
    )
}

export default Tablero