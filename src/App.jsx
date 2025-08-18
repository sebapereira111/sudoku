import { useState, useEffect } from 'react';
import './App.css';
import Tablero from './components/Tablero/Tablero.jsx';
import Controles from './components/controles/Controles.jsx';
import { test, tableroValido, tableroVacio} from './constants/tableros.js';
import { generarTableroResultado } from './utils/generarTableroResultado.js';
import { generarTableroInicial, solucionUnica } from './utils/generarTableroInicial.js';

function App() {
    // Dificultad es cuantos boxes se eliminan
    const [dificultad, setDificultad] = useState(45);
    // Primero generamos el tablero de resultado valido
    const [tableroResultado, setTableroResultado] = useState(structuredClone(tableroVacio));
    // Despues eliminamos algunos numeros para generar el tablero inicial
    const [tableroInicial, setTableroInicial] = useState(structuredClone(tableroVacio));
    // Copiamos el tablero inicial en el tablero de trabajo
    const [tableroActual, setTableroActual] = useState(structuredClone(tableroVacio));
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
                dificultad={dificultad} setDificultad={setDificultad} 
                tableroResultado={tableroResultado} setTableroResultado = {setTableroResultado} 
                setTableroInicial={setTableroInicial} />
            </div>
        </>
    )
}

export default App