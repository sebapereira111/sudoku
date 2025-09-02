import './MejoresTiempos.css'
import { useEffect, useState } from 'react';
import { plantillaTiempos } from "../../../constants/plantillaTiempos.js";
import convertirTiempos from '../../../utils/convertirTiempos.js';

function MejoresTiempos({ setMostrarTiempos }) {
    const [tiempos, setTiempos] = useState(plantillaTiempos);

    // Para salir
    function handleExit(e) {
        setMostrarTiempos(false);
    }

    useEffect(() => {
        const tiemposGuardados = localStorage.getItem('MejoresTiempos');
        if (tiemposGuardados) {
            setTiempos(JSON.parse(tiemposGuardados));
        }
    }, [])

    const arrayLocalFacil = convertirTiempos(tiempos.local.facil);

    const arrayLocalMedio = convertirTiempos(tiempos.local.medio);

    const arrayLocalDificil = convertirTiempos(tiempos.local.dificil);

    return (
        <>
            <div className='contenedor-mejores-tiempos' onMouseDown={handleExit}>
                <h1 className='titulo'>Mejores tiempos</h1>
                <div className='contenedor-ubicacion' >
                    <div className='contenedor-dificultad' >
                        <h2 className='sub-titulo'>Facil</h2>
                        <div className='contenedor-lista'>
                            <div className="linea-vertical"></div>
                            <div className='contenedor-tiempos'>
                                {arrayLocalFacil.map((element, index) => <span className='texto' key={index}>{element}</span>)}
                            </div>
                            <div className="linea-vertical"></div>
                        </div>
                    </div>
                    <div className='contenedor-dificultad' >
                        <h2 className='sub-titulo'>Medio</h2>
                        <div className='contenedor-lista'>
                            <div className="linea-vertical"></div>
                            <div className='contenedor-tiempos'>
                                {arrayLocalMedio.map((element, index) => <span className='texto' key={index}>{element}</span>)}
                            </div>
                            <div className="linea-vertical"></div>
                        </div>
                    </div>
                    <div className='contenedor-dificultad' >
                        <h2 className='sub-titulo'>Dificil</h2>
                        <div className='contenedor-lista'>
                            <div className="linea-vertical"></div>
                            <div className='contenedor-tiempos'>
                                {arrayLocalDificil.map((element, index) => <span className='texto' key={index}>{element}</span>)}
                            </div>
                            <div className="linea-vertical"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MejoresTiempos