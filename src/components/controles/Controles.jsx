import {useState } from 'react';
import './Controles.css'
import { inputChange } from '../../utils/inputChange';
import { generarTableroResultado } from '../../utils/generarTableroResultado';
import { generarTableroInicial, unaSolucion } from '../../utils/generarTableroInicial';

function Controles({ setTableroActual, tableroInicial, boxSeleccionado, setBoxSeleccionado, apuntesActivados, setApuntesActivados, tableroActual, apuntes, setApuntes, dificultad, setDificultad, tableroResultado, setTableroResultado, setTableroInicial, solucionUnica, setSolucionUnica }) {

    function handleNuevo(e) {
        e.stopPropagation();
        e.preventDefault();
        const nuevoTableroResuldado = generarTableroResultado();
        const nuevoTableroInicial = generarTableroInicial(structuredClone(nuevoTableroResuldado), dificultad)
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
        console.time('calculo')
        console.log(unaSolucion(nuevoTableroInicial, dificultad));
        console.timeEnd('calculo')
    }

    function handleChange(e) {
        e.stopPropagation();
        e.preventDefault();
        inputChange(e, tableroInicial, boxSeleccionado, setBoxSeleccionado, setTableroActual, apuntesActivados, setApuntesActivados, tableroActual, apuntes, setApuntes, setDificultad);
    }

    function handleChangeSolucionUnica(e) {
        setSolucionUnica(e.target.checked);
        console.log(e.target.checked)
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
                        {Array.from({ length: 9 }, (_, index) => <button key={1 + index} id={1 + index} title={`Numero ${1 + index}`} className='boton-teclado' onMouseDown={handleChange}>{1 + index}</button> )}
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
                            step="1" />
                        <div className='toggle-solucion-unica'>
                            <h2>Solucion unica</h2>
                            <label className="toggle-switch">
                                <input 
                                type="checkbox" 
                                value={solucionUnica}
                                onChange={handleChangeSolucionUnica}/>
                                <span className="slider"></span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Controles



