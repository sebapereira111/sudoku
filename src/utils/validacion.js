function valorValido(tableroActual, filaBloqueIndex, colBloqueIndex, filaBoxIndex, colBoxIndex, valor) {
    console.log(valor);
    const cant = tableroActual[filaBloqueIndex][colBloqueIndex].flat(3).filter(item => item == valor).length
    console.log(cant);
    console.log(`${filaBloqueIndex}-${colBloqueIndex}-${filaBoxIndex}-${colBoxIndex}`);
    return cant > 1 ? false : true
}

export { valorValido }