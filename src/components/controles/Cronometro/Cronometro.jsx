import { useEffect, useRef } from 'react'
import { useTableroContext } from '../../../context/TableroProvider';
import './Cronometro.css'
import { guardarTiempo } from '../../../utils/guardarTiempo';

function Cronometro({ completado, dificultadTablero }) {
    // importamos las variables de contexto que vamos a usar
    // tiempo se incrementa cada 1 segundo para llevar la cuenta
    // contando es una flag que solo avisa si esta funcionando el contador
    const { 
        tiempo, setTiempo,
        contando, setContando
     } = useTableroContext();

     // En esta variable se carga la funcion del contador
    const intervalo = useRef(null);

    // Monta/desmonta el contador
    useEffect(() => {
        if (contando) {
            intervalo.current = setInterval(() => {
                setTiempo(prev => prev + 1);
            }, 1000);
        }

        return () => {
            if (intervalo.current) {
                clearInterval(intervalo.current);
            }
        }
    }, [contando]);

    let nombre;
    useEffect(() => {
        // El efecto solo se ejecuta cuando cambia completado, y el mensaje se muestra solo cuando es true
        if (completado) {
            alert('Tablero completado. Felicidades! ');
            nombre = prompt("Introduzca su nombre (se guardan solo las primeras 3 letras)");
            if (nombre) {
                nombre = nombre.substring(0,3).toUpperCase();
                guardarTiempo(nombre, tiempo, dificultadTablero);
            }
        }
    }, [completado]);

    function visibilidadContador(setContando, tiempo) {
        if (document.hidden) {
            setContando(false);
        } else if (tiempo) {
            setContando(true);
        }
    }

    useEffect(() => {
        const handler = () => {
            if (document.hidden) {
                setContando(false);
            } else if (tiempo && !completado) {
                setContando(true);
            }
        };
        document.addEventListener("visibilitychange", handler);
        return () => document.removeEventListener("visibilitychange", handler);
    }, [contando])


    // Calculamos las variables que vamos a mostrar 
    const segundos = (tiempo%60).toString().padStart(2,"0");
    const minutos = ((Math.floor(tiempo/60))%60).toString().padStart(2,"0");
    const horas = ((Math.floor(tiempo/3600))%60).toString()

    return (
        <>
            <div className='contenedor-cronometro'>
                <span className='cronometro-texto'>{`${horas}:${minutos}:${segundos}`}</span>
            </div>
        </>
    )
}

export {Cronometro}