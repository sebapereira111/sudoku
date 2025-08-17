import {useState } from 'react';
import './Controles.css'
import { inputChange } from '../../utils/inputChange';

function Controles({ setTableroActual, tableroInicial, boxSeleccionado, setBoxSeleccionado, apuntesActivados, setApuntesActivados, tableroActual, apuntes, setApuntes, dificultad, setDificultad }) {

    function handleNuevo(e) {
        e.stopPropagation();
        e.preventDefault();
    }

    function handleChange(e) {
        e.stopPropagation();
        e.preventDefault();
        inputChange(e, tableroInicial, boxSeleccionado, setBoxSeleccionado, setTableroActual, apuntesActivados, setApuntesActivados, tableroActual, apuntes, setApuntes, setDificultad);
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
                    </div>
                </div>
            </div>

        </>
    )
}

export default Controles





