import { useState } from 'react';
import './App.css';
import Tablero from './components/Tablero/Tablero.jsx';
import Controles from './components/controles/controles.jsx';
import { test, validTest} from './constants/tableros.js';

function App() {
    const tableroInicial = validTest;
    const [tableroActual, setTableroActual] = useState(tableroInicial);
    const [boxSeleccionado, setBoxSeleccionado] = useState({
        filaBloqueIndex: 1,
        colBloqueIndex: 1,
        filaBoxIndex: 1,
        colBoxIndex: 1
    });
    const [apuntesActivados, setApuntesActivados] = useState(false);

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
                apuntesActivados={apuntesActivados} />
                <Controles setTableroActual={setTableroActual} tableroInicial={tableroInicial} 
                boxSeleccionado={boxSeleccionado} 
                apuntesActivados={apuntesActivados} setApuntesActivados={setApuntesActivados} />
            </div>
        </>
    )
}

export default App
