import { useState, useEffect } from 'react';
import './App.css';
import Tablero from './components/Tablero/Tablero.jsx';
import Controles from './components/controles/Controles.jsx';

import { TableroProvider } from './context/TableroProvider.jsx';

function App() {
    // La variable tema determina quien controla el tema, puede ser sistema, claro u oscuro.
    // El valor inicial depende de temaGuardado y temaInicial
    const [tema, setTema] = useState('sistema');
    // La variable dark controla directamente el tema, depende del sistema o lo que elija el usuario
    const [dark, setDark] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches);
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // dentro de useEffect para que solo se ejecute en el primer renderizado
    // Se inicializan las variables de tema
    useEffect(() => {
        // Se lee el tema guardado
        const temaGuardado = localStorage.getItem('temaGuardado');
        // Si el temaGuardado da null se usa del sistema, o sino se usa el valor guardado
        const temaInicial = (temaGuardado == null) ? 'sistema' : temaGuardado;
        // Si el temaInicial es sistema se lee cual es, o sino se usa el guardado
        const darkInicial = (temaInicial == 'sistema') ? 
            window.matchMedia('(prefers-color-scheme: dark)').matches 
            : ((temaGuardado == 'oscuro') ? 
                true 
                : false);
        setTema(temaInicial);
        setDark(darkInicial);
        // listener para detectar cambio en tema del sistema
    }, []);
        
    function cambiarTemaSistema(e) {
        setDark(e.matches);
    }

    useEffect(() => {
        if (tema === 'sistema') {
            mediaQuery.addEventListener('change', cambiarTemaSistema);
        }

        return () => {
            mediaQuery.removeEventListener('change', cambiarTemaSistema);
        };
    }, [tema]);

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