import './Controles.css'
import { inputChange, resetTeclado } from '../../utils/inputChange';
import { generarTableroResultado } from '../../utils/generarTableroResultado';
import { generarTableroInicial, unaSolucion } from '../../utils/generarTableroInicial';
import { useTableroContext, useControlesContext } from '../../context/TableroProvider';

function Controles({ tema, setTema, setDark }) {
    // Importamos las variables de contexto
    const {
        tableroInicial,
        tableroActual, setTableroActual,
        boxSeleccionado, setBoxSeleccionado,
        apuntesActivados, setApuntesActivados,
        apuntes, setApuntes,
        teclado, setTeclado,
        setDificultad
    } = useTableroContext();
    const {
        tableroResultado, setTableroResultado,
        setTableroInicial,
        dificultad,
        solucionUnica, setSolucionUnica
    } = useControlesContext();

    // Creamos un nuevo tablero
    function handleNuevo(e) {

        const nuevoTableroResuldado = generarTableroResultado();
        const nuevoTableroInicial = generarTableroInicial(structuredClone(nuevoTableroResuldado), dificultad);
        // Primero generamos el tablero de resultado valido
        setTableroResultado(structuredClone(nuevoTableroResuldado));
        // Despues eliminamos algunos numeros para generar el tablero inicial
        setTableroInicial(structuredClone(nuevoTableroInicial));
        // Copiamos el tablero inicial en el tablero de trabajo
        setTableroActual(structuredClone(nuevoTableroInicial));
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
        
        const soloUnaSolucion = unaSolucion(nuevoTableroInicial, dificultad);
        setSolucionUnica(soloUnaSolucion);
        
        // Por ultimo se resetea el teclado
        resetTeclado(nuevoTableroInicial, setTeclado);
    } 

    function handleSliderClick(e) {
        const elementoEnFoco = document.getElementById(boxSeleccionado.filaBloqueIndex+'-'+boxSeleccionado.colBloqueIndex+'-'+boxSeleccionado.filaBoxIndex+'-'+boxSeleccionado.colBoxIndex);
        elementoEnFoco.focus();
    }

    function handleChange(e) {
        e.stopPropagation();
        e.preventDefault();
        inputChange(e, tableroInicial, boxSeleccionado, setBoxSeleccionado, setTableroActual, apuntesActivados, setApuntesActivados, tableroActual, apuntes, setApuntes, setDificultad, teclado, setTeclado);
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
                    <div className='contenedor-teclado'>
                        {/* Genera un array de 9 elementos button para el teclado */}
                        {teclado.map((numero, index) => <button key={1 + index} id={1 + index} title={`Numero ${1 + index}`} className='boton-teclado' onMouseDown={handleChange}>{numero ? numero : " "}</button>)}
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
                        <div className='solucion-unica'>
                            <span>Solucion unica:</span>&nbsp;
                            <span className={solucionUnica ? 'visible' : 'oculto'}>SI</span>
                            <span className={solucionUnica ? 'oculto' : 'visible'}>NO</span>
                        </div>
                    </div>
                </div>
                <div className='contenedor-tema'>
                   <button onMouseDown={handleTema} >{`Tema ${tema}`}</button>
                </div>
            </div>

        </>
    )
}

export default Controles



