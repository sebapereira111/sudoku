import './InstruccionesDeJuego.css'

function InstruccionesDeJuego({ setMostrarInstrucciones }) {

    // Para salir
    function handleExit(e) {
        setMostrarInstrucciones(false);
    }

    return (
        <>
            <div className="contenedor-instrucciones" onMouseDown={handleExit} >
                <div className='contenedor-texto'>
                    <h1 className='titulo'>Instrucciones de Juego</h1>
                    <h2 className='sub-titulo'>Completar una cuadrícula de 9x9 con números del 1 al 9, asegurándote de que:</h2>
                    <ul className='texto'>
                        <li>Cada fila contenga los números del 1 al 9 sin repetir.</li>
                        <li>Cada columna contenga los números del 1 al 9 sin repetir.</li>
                        <li>Cada bloque de 3x3 (hay 9 en total) también contenga los números del 1 al 9 sin repetir.</li>
                    </ul>
                    <h2 className='sub-titulo'>Cómo empezar</h2>
                    <ul className='texto'>
                        <li>El tablero viene con algunos números ya colocados (llamados pistas).</li>
                        <li>Tu tarea es deducir los números faltantes usando lógica, no adivinación.</li>
                        <li>No se necesita hacer cálculos, solo observar y razonar.</li>
                    </ul>
                    <h2 className='sub-titulo'>Estrategias básicas</h2>
                    <ul className='texto'>
                        <li>Escaneo: Revisa filas, columnas y bloques para ver qué números faltan.</li>
                        <li>Proceso de eliminación: Si un número ya está en una fila, columna o bloque, no puede ir en esa celda.</li>
                        <li>Candidatos: Anotá posibles números en celdas vacías (como notas pequeñas).</li>
                        <li>Avanza por zonas fáciles: Comenzá donde haya más pistas disponibles.</li>
                        <li>Evitá adivinar: Un buen Sudoku tiene una única solución lógica asegurándote.</li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default InstruccionesDeJuego