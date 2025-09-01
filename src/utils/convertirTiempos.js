function mostrarTiempo(tiempo) {
    const segundos = (tiempo%60).toString().padStart(2,"0");
    const minutos = ((Math.floor(tiempo/60))%60).toString().padStart(2,"0");
    const horas = ((Math.floor(tiempo/3600))%60).toString()
    
    return `${horas}:${minutos}:${segundos}`
}

function convertirTiempos(tiempos) {
    const arrayResultado = [];

    for (let i = 1; i < 6; i++) {
        arrayResultado.push(i, tiempos[i].nombre, mostrarTiempo(tiempos[i].tiempo));
    }

    return arrayResultado
}

export default convertirTiempos