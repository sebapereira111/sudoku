import { useState } from 'react';
import './App.css';
import Tablero from './components/Tablero/Tablero.jsx';
import { test, validTest} from './constants/tableros.js';

function App() {
    const [tableroActual, setTableroActual] = useState(test);


    return (
        <>
            <Tablero tableroActual={tableroActual} />
        </>
    )
}

export default App
