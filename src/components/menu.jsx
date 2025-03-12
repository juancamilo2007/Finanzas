import { Link } from "react-router-dom";
import { useState } from "react";
import "../pages/inicio.css";

const Menu = ({ setSeccion }) => {
  const [seccionActiva, setSeccionActiva] = useState("transacciones");
  const [menuAbierto, setMenuAbierto] = useState(true); // Estado para abrir/cerrar el menú
  const [cambioSeccion, setCambioSeccion] = useState(false);

  const cambiarSeccion = (seccion) => {
    if (seccion !== seccionActiva) {
      setCambioSeccion(true); // Activamos la animación
      setTimeout(() => {
        setSeccion(seccion);
        setSeccionActiva(seccion);
        setCambioSeccion(false); // Desactivamos la animación después de la transición
      }, 200); // Tiempo de la animación
    }
  };
  return (
    <nav className={`sidebar ${menuAbierto ? "abierto" : "cerrado"}`}>
      {/* Botón para abrir/cerrar el menú */}
      <button className="toggle-btn" onClick={() => setMenuAbierto(!menuAbierto)}>
        {menuAbierto ? <img width="28" height="28" src="https://img.icons8.com/ios-filled/50/delete-sign--v1.png" alt="delete-sign--v1"/> : "☰"}
      </button>

      {/* Menú de opciones */}
      <h2 className={menuAbierto ? "" : "oculto"}>Menú</h2>
      <ul>
        <li
          className={seccionActiva === "transacciones" ? "activo" : ""}
          onClick={() => cambiarSeccion("transacciones")}
        >
          💰 {menuAbierto && "Agregar Transacciones"}
        </li>
        <li
          
          className={seccionActiva === "balance" ? "activo" : ""}
          onClick={() => cambiarSeccion("balance")}
        >
          📊 {menuAbierto && "Visualización del Balance"}
        </li>
        <li
          className={seccionActiva === "presupuestos" ? "activo" : ""}
          onClick={() => cambiarSeccion("presupuestos")}
        >
          📅 {menuAbierto && "Creación de Presupuestos"}
        </li>
      </ul>

      <Link to="/" className={menuAbierto ? "" : "oculto"}>Cerrar sesión</Link>
    </nav>
  );
};

export default Menu;

