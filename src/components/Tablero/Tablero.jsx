import './Tablero.css'
import Bloque from '../Bloque/Bloque.jsx'

function Tablero({ tableroActual }) {
    return (
        <>
            <div className='contenedor-tablero'>
                {tableroActual.map((filaBloque, filaBloqueIndex) => (
                    filaBloque.map((tableroBloque, colBloqueIndex) => (
                        <Bloque key={`${filaBloqueIndex}-${colBloqueIndex}`} 
                        tableroBloque={tableroBloque} 
                        filaBloqueIndex={filaBloqueIndex} colBloqueIndex={colBloqueIndex} />
                    ))
                ))}
            </div>
        </>
    )
}

export default Tablero