import './Tablero.css'
import Bloque from '../Bloque/Bloque.jsx'
import { useTableroContext } from '../../context/TableroProvider.jsx'

function Tablero() {
    const { tableroActual } = useTableroContext();
    
    return (
        <>
            <div className='contenedor-tablero'>
                {tableroActual.map((filaBloque, filaBloqueIndex) => (
                    filaBloque.map((_, colBloqueIndex) => (
                        <Bloque 
                        key={`${filaBloqueIndex}-${colBloqueIndex}`} 
                        filaBloqueIndex={filaBloqueIndex} colBloqueIndex={colBloqueIndex} 
                        />
                    ))
                ))}
            </div>
        </>
    )
}

export default Tablero