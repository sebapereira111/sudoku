import './Tablero.css'
import Box from '../Box/Box'

const test = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9]
]

function Tablero({ tableroActual }) {
    return (
        <>
            <div className='contenedor-tablero'>
                <div className='contenedor-bloque'>
                    {test.map((fila, rowIndex) => (
                        fila.map((item, colIndex) => (
                            <Box key={`${rowIndex}-${colIndex}`} dato={item}/>
                        ))
                    ))}
                </div>
            </div>
        </>
    )
}

export default Tablero