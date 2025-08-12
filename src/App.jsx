import { useState } from 'react';
import './App.css';
import Tablero from './components/Tablero/Tablero.jsx';
import { test, validTest} from './constants/tableros.js';

function App() {
    const [tableroActual, setTableroActual] = useState(test);
    const [boxSeleccionado, setBoxSeleccionado] = useState({
        filaBloqueIndex: 1,
        colBloqueIndex: 1,
        filaBoxIndex: 1,
        colBoxIndex: 1
    });

    

    return (
        <>
            <Tablero tableroActual={tableroActual} 
            boxSeleccionado={boxSeleccionado} setBoxSeleccionado={setBoxSeleccionado} />
        </>
    )
}

export default App
