import { useState } from 'react';
import './App.css';
import Tablero from './components/Tablero/Tablero.jsx';
import Controles from './components/controles/Controles.jsx';

import { TableroProvider } from './context/TableroProvider.jsx';

function App() {
    const [darkMode, setDarkMode] = useState(window.matchMedia("(prefers-color-scheme: dark)").matches)

    function handleMouseDown(e) {
        if (!(e.target.id == 'dificultad')) {
            e.preventDefault();
        }
    }

    function handleChangeDarkMode(e) {
        if (darkMode) {
            setDarkMode(false);
        } else {
            setDarkMode(true);
        }
    }

    return (
        <>
            <div className={darkMode ? 'fondo dark' : 'fondo light'} onMouseDown={handleMouseDown} >
                <TableroProvider>
                    <Tablero />
                    <Controles />
                </TableroProvider>
                <div className='dark-mode-toggle-switch'>
                    <span className='dark-switch-text'>dark mode</span>
                    <div>
                        <label className="toggle-switch">
                        <input 
                        type="checkbox" 
                        checked={darkMode}
                        onChange={handleChangeDarkMode}
                        />
                        <span className="slider"></span>
                    </label>
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default App