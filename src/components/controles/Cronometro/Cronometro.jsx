import { useEffect, useRef } from 'react'
import { useTableroContext } from '../../../context/TableroProvider';
import './Cronometro.css'

function Cronometro() {
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
    }, [contando])

    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            setContando(false);
        } else if (tiempo) {
            setContando(true);
        }
    });

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