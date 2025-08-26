import './Controles.css'
import { inputChange, resetTeclado, tableroCompleto } from '../../utils/inputChange';
import { generarTableroResultado } from '../../utils/generarTableroResultado';
import { generarTableroInicial } from '../../utils/generarTableroInicial';
import { useTableroContext, useControlesContext } from '../../context/TableroProvider';
import { useEffect } from 'react';
import { Cronometro } from './Cronometro/Cronometro';

function Controles({ tema, setTema, setDark, completado, setCompletado }) {
    // Importamos las variables de contexto
    const {
        tableroResultado,
        tableroInicial,
        tableroActual, setTableroActual,
        boxSeleccionado, setBoxSeleccionado,
        apuntesActivados, setApuntesActivados,
        apuntes, setApuntes,
        teclado, setTeclado,
        setDificultad,
        tiempo, setTiempo,
        contando, setContando
    } = useTableroContext();
    const {
        setTableroResultado,
        setTableroInicial,
        dificultad
    } = useControlesContext();

    useEffect(() => {
        if (tableroActual[0][0][0][0]) {
            if (tableroCompleto(tableroActual, tableroResultado, setContando)) {
                setCompletado(true);
            }
        }
    }, [tableroActual]);

    // Creamos un nuevo tablero
    function handleNuevo(e) {
        // Primero generamos el tablero de resultado valido
        const nuevoTableroResuldado = generarTableroResultado();
        // Despues eliminamos algunos numeros para generar el tablero inicial
        const nuevoTableroInicial = generarTableroInicial(structuredClone(nuevoTableroResuldado), dificultad);
        // Cargamos a las variables de trabajo
        setTableroInicial(structuredClone(nuevoTableroInicial));
        setTableroActual(structuredClone(nuevoTableroInicial));
        // Se resetea el teclado
        resetTeclado(nuevoTableroInicial, setTeclado);
        // Cargamos los valores en las variables de trabajo
        setTableroResultado(structuredClone(nuevoTableroResuldado));
        // Seteamos las variables a valores de inicio
        setBoxSeleccionado({
            filaBloqueIndex: 3,
            colBloqueIndex: 0,
            filaBoxIndex: 0,
            colBoxIndex: 0
        });
        setApuntesActivados(false);
        setApuntes(Array.from({ length: 3 }, () =>
            Array.from({ length: 3 }, () => 
                Array.from({ length: 3 }, () => 
                    Array.from({ length: 3 }, () => Array(9).fill(0))
                )
            )
        ));
        // Se ajusta la variable de completado a falso
        setCompletado(false);
        // Se inicia el cronometro
        setTiempo(0);
        setContando(true);
    } 

    function handleSliderClick(e) {
        const elementoEnFoco = document.getElementById(boxSeleccionado.filaBloqueIndex+'-'+boxSeleccionado.colBloqueIndex+'-'+boxSeleccionado.filaBoxIndex+'-'+boxSeleccionado.colBoxIndex);
        elementoEnFoco.focus();
    }

    function handleChange(e) {
        e.stopPropagation();
        e.preventDefault();
        inputChange(e, tableroInicial, boxSeleccionado, setBoxSeleccionado, setTableroActual, apuntesActivados, setApuntesActivados, tableroActual, apuntes, setApuntes, setDificultad, teclado, setTeclado, setTiempo, setContando);
    }

    function handleTema(e) {
        e.stopPropagation();
        e.preventDefault();
        // El tema se va rotando
        if (tema == 'sistema') {
            // Si tema es sistema, se cambia a claro y se guarda para el proximo reinicio
            setTema('claro');
            setDark(false);
            localStorage.setItem('temaGuardado', 'claro');
        } else if (tema == 'claro') {
            // Si el tema es claro, se cambia a oscuro y se guarda para el proximo reinicio
            setTema('oscuro');
            setDark(true);
            localStorage.setItem('temaGuardado', 'oscuro');
        } else {
            // Si el tema depende del sistema, se lee el valor actual y se elimina lo guardado para el proximo reinicio (null en guardado es sistema)
            setTema('sistema');
            setDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
            localStorage.removeItem('temaGuardado')
        }
    }

    return (
        <>
            <div className='contenedor-controles'>
                <div className='contenedor-controles-juego'>
                    <div className='contenedor-utilidades'>
                        <button title='Reiniciar juego' id='reset' className='boton-utilidades' onMouseDown={handleChange}>↻</button>
                        <button title='Borrar celda' id='borrar' className='boton-utilidades' onMouseDown={handleChange}>↩</button>
                        <button title='Apuntes' id='apuntes' className={apuntesActivados ? 'boton-utilidades apuntes-activados' : 'boton-utilidades' } onMouseDown={handleChange} >✎</button>    
                    </div>
                    <div className='contenedor-teclado-y-cronometro'>
                        <Cronometro completado={completado} />
                        <div className='contenedor-teclado'>
                            {/* Genera un array de 9 elementos button para el teclado */}
                            {teclado.map((numero, index) => <button key={1 + index} id={1 + index} title={`Numero ${1 + index}`} className='boton-teclado' onMouseDown={handleChange}>{numero ? numero : " "}</button>)}
                        </div>
                    </div>
                </div>
                <div className='contenedor-nuevo-juego'>
                    <div className='contenedor-boton-nuevo-juego' >
                        <button title='Nuevo juego' id='nuevo' className='boton-utilidades' onMouseDown={handleNuevo}>▶︎</button>
                    </div>
                    <div className='contenedor-slider-dificultad'>
                        <div className='etiquetas-slider-dificultad'>
                            <span>facil</span>
                            <label className='etiqueta-dificultad' htmlFor="dificultad">Dificultad</label>
                            <span>dificil</span>
                        </div>
                        <input
                            className='slider-dificultad' 
                            type="range"
                            id="dificultad"
                            name="dificultad"
                            min="30"
                            max="60"
                            value={dificultad}
                            onChange={handleChange}
                            onClick={handleSliderClick}
                            step="1" />
                    </div>
                </div>
                <div className='contenedor-otros'>
                    <div className='contenedor-tema'>
                        <button onMouseDown={handleTema} >{`Tema ${tema}`}</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Controles



