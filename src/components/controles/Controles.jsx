import './Controles.css'
import { inputChange, resetTeclado, tableroCompleto } from '../../utils/inputChange';
import { generarTableroResultado } from '../../utils/generarTableroResultado';
import { generarTableroInicial } from '../../utils/generarTableroInicial';
import { useTableroContext, useControlesContext } from '../../context/TableroProvider';
import { useState, useEffect, useRef } from 'react';
import { Cronometro } from './Cronometro/Cronometro';
import IconReiniciar from '../../assets/images/reiniciar.svg?react';
import IconBorrar from '../../assets/images/borrar.svg?react';
import IconAnotaciones from '../../assets/images/anotaciones.svg?react';
import IconNuevo from '../../assets/images/nuevo.svg?react';
import MejoresTiempos from './MejoresTiempos/MejoresTiempos'
import InstruccionesDeJuego from './InstruccionesDeJuego/InstruccionesDeJuego';


function Controles({ tema, setTema, setDark, completado, setCompletado }) {
    // Variable que avisa que se solicito un nuevo tablero
    const [crearNuevoTablero, setCrearNuevoTablero] = useState(false);
    const [eliminarClics, setEliminarClics] = useState(false);
    const [dificultadTablero, setDificultadTablero] = useState(0);

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

    // Para el cronometro cuando se completa el tablero
    // Se ejecuta cada vez que hay un ambio en tablero actual
    useEffect(() => {
        // Pregunta si hay algo en el box 0-0-0-0 (para discriminar si el tablero esta vacio, podia
        // haber sido otro box)
        if (tableroActual[0][0][0][0]) {
            // Pregunta si el tablero actual es igual al tablero resultado
            if (tableroCompleto(tableroActual, tableroResultado, setContando)) {
                setCompletado(true);
            }
        }
    }, [tableroActual]);

    // Creamos un nuevo tablero
    useEffect(() => {
        if (crearNuevoTablero) {
            setTimeout(() => {
                // Guardamos el valor de dificultad
                setDificultadTablero(dificultad);
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
                setEliminarClics(true);
            }, 100);
        }
    }, [crearNuevoTablero]);

    // timeout para "borrar" la cola de clics
    // Durante la creacion del tablero se muestra un mensaje
    // Si se hace clic por ese mensaje, los clics quedan en cola y se ejecutan cuando desaparece como 
    // un clic en algo detras. El timeout es para dejar un momento mas ese mensaje (0.1 s) y que 
    // "absorva" los clics y no pasen a lo que esta detras
    useEffect(() => {
        if (eliminarClics) {
            setTimeout(() => {
                setCrearNuevoTablero(false)
                setEliminarClics(false)
            }, 100);
        }
    }, [eliminarClics])

    // Gestiona pulsacion de crear nuevo tablero y llama a funcion correspondiente
    function handleNuevo(e) {
        setCrearNuevoTablero(true);
    }

    // Llama la funcion que se encarga de los input
    function handleChange(e) {
        e.stopPropagation();
        e.preventDefault();
        inputChange(e, tableroInicial, boxSeleccionado, setBoxSeleccionado, setTableroActual, apuntesActivados, setApuntesActivados, tableroActual, apuntes, setApuntes, setDificultad, teclado, setTeclado, setTiempo, setContando);
    }

    // modifica el tema
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

    // Para mostrar los mejores tiempos
    const [mostrarTiempos, setMostrarTiempos] = useState(false);

    function handleMejoresPuntajes(e) {
        if (mostrarTiempos == false) {
            setMostrarTiempos(true);
        } else {
            setMostrarTiempos(false);
        }
    }

    // Para mostrar las instrucciones de juego
    const [mostrarInstrucciones, setMostrarInstrucciones] = useState(false);

    function handleInstrucciones(e) {
        if (mostrarInstrucciones == false) {
            setMostrarInstrucciones(true);
        } else {
            setMostrarInstrucciones(false);
        }
    }    

    return (
        <>
            <div className={crearNuevoTablero ? 'creando-tablero' : 'creando-tablero creando-oculto'} >
                <span className='creando-texto-principal' >Creando tablero</span>
                <span className='creando-texto-secundario' >espere un momento...</span>
            </div>
            {mostrarTiempos && <MejoresTiempos setMostrarTiempos={setMostrarTiempos} />}
            {mostrarInstrucciones && <InstruccionesDeJuego setMostrarInstrucciones={setMostrarInstrucciones} />}
            <div className='contenedor-controles'>
                <div className='contenedor-controles-juego'>
                    <div className='contenedor-utilidades'>
                        <button title='Reiniciar juego' id='reset' className='boton-utilidades' onMouseDown={handleChange}><IconReiniciar className='iconos' /></button>
                        <button title='Borrar celda' id='borrar' className='boton-utilidades' onMouseDown={handleChange}><IconBorrar className='iconos' /></button>
                        <button title='Apuntes' id='apuntes' className={apuntesActivados ? 'boton-utilidades apuntes-activados' : 'boton-utilidades' } onMouseDown={handleChange} ><IconAnotaciones className='iconos' /></button>    
                    </div>
                    <div className='contenedor-teclado-y-cronometro'>
                        <Cronometro completado={completado} dificultadTablero={dificultadTablero}/>
                        <div className='contenedor-teclado'>
                            {/* Genera un array de 9 elementos button para el teclado */}
                            {teclado.map((numero, index) => <button key={1 + index} id={1 + index} title={`Numero ${1 + index}`} className='boton-teclado' onMouseDown={handleChange}>{numero ? numero : " "}</button>)}
                        </div>
                    </div>
                </div>
                <div className='contenedor-nuevo-juego'>
                    <div className='contenedor-boton-nuevo-juego' >
                        <button title='Nuevo juego' id='nuevo' className='boton-utilidades' onMouseDown={handleNuevo}><IconNuevo className='iconos' /></button>
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
                            step="1" />
                            <div className='indicador-dificultad'>
                                <span>{(dificultad < 40) ? 'FACIL' : ((dificultad < 50) ? 'MEDIO' : 'DIFICIL')}</span>
                            </div>
                    </div>
                </div>
                <div className='contenedor-otros'>
                    <div className='contenedor-otros-boton'>
                        <button onMouseDown={handleTema} >{`Tema ${tema}`}</button>
                    </div>
                    <div className='contenedor-otros-boton'>
                        <button onMouseDown={handleMejoresPuntajes} >Mejores Tiempos</button>
                    </div>
                    <div className='contenedor-otros-boton'>
                        <button onMouseDown={handleInstrucciones} >Instrucciones</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Controles



