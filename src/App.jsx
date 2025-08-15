import { useState } from 'react';
import './App.css';
import Tablero from './components/Tablero/Tablero.jsx';
import Controles from './components/controles/Controles.jsx';
import { test, validTest} from './constants/tableros.js';

function App() {
    const tableroInicial = validTest;
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

    function handelMouseDown(e) {
        e.preventDefault();
        console.log(document.activeElement); // Devuelve el nodo DOM con foco
    }

    return (
        <>
            <div className='fondo' onMouseDown={handelMouseDown} >
                <Tablero 
                tableroActual={tableroActual} setTableroActual={setTableroActual} tableroInicial={tableroInicial}
                boxSeleccionado={boxSeleccionado} setBoxSeleccionado={setBoxSeleccionado} 
                apuntesActivados={apuntesActivados} 
                apuntes={apuntes} setApuntes={setApuntes} />
                <Controles setTableroActual={setTableroActual} tableroInicial={tableroInicial} 
                boxSeleccionado={boxSeleccionado} 
                apuntesActivados={apuntesActivados} setApuntesActivados={setApuntesActivados} 
                apuntes={apuntes} setApuntes={setApuntes} 
                tableroActual={tableroActual} />
            </div>
        </>
    )
}

export default App