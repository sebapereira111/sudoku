import './Bloque.css'
import Box from '../Box/Box.jsx'
import { useTableroContext } from '../../context/TableroProvider.jsx'

function Bloque({ filaBloqueIndex, colBloqueIndex }) {
    const { tableroActual } = useTableroContext();

    return (
        <>
            <div className='contenedor-bloque'>
                {tableroActual[filaBloqueIndex][colBloqueIndex].map((filaBox, filaBoxIndex) => (
                    filaBox.map((_, colBoxIndex) => (
                        <Box 
                        key={`${filaBoxIndex}-${colBoxIndex}`} 
                        filaBloqueIndex={filaBloqueIndex} colBloqueIndex={colBloqueIndex} 
                        filaBoxIndex={filaBoxIndex} colBoxIndex={colBoxIndex} 
                        />
                    ))
                ))}
            </div>
        </>
    )
}

export default Bloque