import { useState, useEffect } from 'react';
import './App.css';
import Tablero from './components/Tablero/Tablero.jsx';
import Controles from './components/controles/Controles.jsx';
import { test, tableroValido} from './constants/tableros.js';
import { generarTablero } from './utils/generarTablero.js';

function App() {
    // Primero generamos el tablero de resultado valido
    const [dificultad, setDificultad] = useState(30);
    const tableroResultado = generarTablero();
    // Despues eliminamos algunos numeros para generar el tablero inicial
    const tableroInicial = tableroResultado;
    const [tableroActual, setTableroActual] = useState(tableroInicial);
    const [boxSeleccionado, setBoxSeleccionado] = useState({
        filaBloqueIndex: 3,
        colBloqueIndex: 0,
        filaBoxIndex: 0,
        colBoxIndex: 0
    });
    const [apuntesActivados, setApuntesActivados] = useState(false);
    const [apuntes, setApuntes] = useState(Array.from({ length: 3 }, () =>
        Array.from({ length: 3 }, () => 
            Array.from({ length: 3 }, () => 
                Array.from({ length: 3 }, () => Array(9).fill(0))
            )
        )
    ));

    function handleMouseDown(e) {
        if (!(e.target.id == 'dificultad')) {
            e.preventDefault();
        } 
    }

    return (
        <>
            <div className='fondo' onMouseDown={handleMouseDown} >
                <Tablero 
                tableroActual={tableroActual} setTableroActual={setTableroActual} tableroInicial={tableroInicial}
                boxSeleccionado={boxSeleccionado} setBoxSeleccionado={setBoxSeleccionado} 
                apuntesActivados={apuntesActivados} setApuntesActivados={setApuntesActivados} 
                apuntes={apuntes} setApuntes={setApuntes} />
                <Controles setTableroActual={setTableroActual} tableroInicial={tableroInicial} 
                boxSeleccionado={boxSeleccionado} setBoxSeleccionado={setBoxSeleccionado} 
                apuntesActivados={apuntesActivados} setApuntesActivados={setApuntesActivados} 
                apuntes={apuntes} setApuntes={setApuntes} 
                tableroActual={tableroActual} 
                dificultad={dificultad} setDificultad={setDificultad} />
            </div>
        </>
    )
}

export default App