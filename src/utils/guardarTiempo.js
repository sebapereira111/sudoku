import { plantillaTiempos } from "../constants/plantillaTiempos";

function guardarTiempo(nombre, tiempo, dificultadTablero) {
    let mejoresTiempos = plantillaTiempos;
    let dificultad
    if (dificultadTablero < 40) {
        dificultad = 'facil';
    } else if (dificultadTablero < 50) {
        dificultad = 'medio';
    } else {
        dificultad = 'dificil';
    }
    let tiempoNuevo = tiempo;
    let nombreNuevo = nombre;

    const tiemposGuardados = localStorage.getItem("MejoresTiempos");
    if (tiemposGuardados) {
        mejoresTiempos = JSON.parse(tiemposGuardados);
    }

    let tiempoTemp;
    let nombreTemp;
    for (let i = 1; i < 6; i++) {
        if ((mejoresTiempos.local[dificultad][i].tiempo == 0) || (mejoresTiempos.local[dificultad][i].tiempo > tiempoNuevo)) {
            if (i < 5) {
                tiempoTemp = mejoresTiempos.local[dificultad][i].tiempo;
                nombreTemp = mejoresTiempos.local[dificultad][i].nombre;
            }
            mejoresTiempos.local[dificultad][i].tiempo = tiempoNuevo;
            mejoresTiempos.local[dificultad][i].nombre = nombreNuevo;
            if (i < 5) {
                tiempoNuevo = tiempoTemp;
                nombreNuevo = nombreTemp;
            }
        }
    }

    localStorage.setItem("MejoresTiempos", JSON.stringify(mejoresTiempos));
}

export { guardarTiempo }