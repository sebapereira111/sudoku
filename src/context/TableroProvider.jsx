import { createContext, useContext } from "react";
import { useTablero } from "../hooks/useTablero";

// Crear los contextos
const TableroContext = createContext();
const ControlesContext = createContext();

// Provider que envuelve la app
function TableroProvider({ children }) {
    // Destructuracion de las variables usadas
    const {
        tableroResultado, setTableroResultado,
        tableroInicial, setTableroInicial,
        tableroActual, setTableroActual,
        boxSeleccionado, setBoxSeleccionado,
        apuntesActivados, setApuntesActivados,
        apuntes, setApuntes,
        dificultad, setDificultad,
        solucionUnica, setSolucionUnica
    } = useTablero();

    // Las variables que se van a pasar a los 2 contextos
    const valueTablero = {
        tableroInicial,
        tableroActual, setTableroActual,
        boxSeleccionado, setBoxSeleccionado,
        apuntesActivados, setApuntesActivados,
        apuntes, setApuntes
    };

    const valueControles = {
        tableroResultado, setTableroResultado,
        setTableroInicial,
        dificultad, setDificultad,
        solucionUnica, setSolucionUnica
    };

    return (
        <TableroContext.Provider value={valueTablero}>
            <ControlesContext.Provider value={valueControles}>
                {children}
            </ControlesContext.Provider>
        </TableroContext.Provider>
);
}

// Hooks para consumir los contextos
const useTableroContext = () => useContext(TableroContext);
const useControlesContext = () => useContext(ControlesContext);

export { TableroProvider, useTableroContext, useControlesContext }