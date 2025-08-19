import { useState } from 'react';
import './App.css';
import Tablero from './components/Tablero/Tablero.jsx';
import Controles from './components/controles/Controles.jsx';

import { TableroProvider } from './context/TableroProvider.jsx';

function App() {
    // La variable tema determina quien controla el tema, puede ser sistema, claro u oscuro
    const [tema, setTema] = useState('sistema');
    // La variable dark controla directamente el tema, depende del sistema o lo que elija el usuario
    const [dark, setDark] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches);

    // listener para detectar cambio en tema del sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        setDark(e.matches);
        console.log(`El usuario cambió a modo ${nuevoTema}`);
    });

    function handleMouseDown(e) {
        if (!(e.target.id == 'dificultad')) {
            e.preventDefault();
        }
    }

    return (
        <>
            <div className={dark ? 'fondo dark' : 'fondo light'} onMouseDown={handleMouseDown} >
                <TableroProvider>
                    <Tablero />
                    <Controles tema={tema} setTema={setTema} setDark={setDark} />
                </TableroProvider>

            </div>
        </>
    )
}

export default App