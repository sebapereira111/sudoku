import { useState } from 'react'
import './App.css'
import Tablero from './components/Tablero/Tablero';

function App() {
    const [tableroActual, setTableroActual] = useState();

    return (
        <Tablero />
    )
}

export default App
