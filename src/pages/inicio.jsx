import { useState } from "react";
import Menu from "../components/menu.jsx";
import Transacciones from "../pages/transacciones"; // Importamos la vista de transacciones
import "../pages/inicio.css";

const Inicio = () => {
  const [seccion, setSeccion] = useState("transacciones");

  return (
    <div className="contenedor">
      {/* Menú Lateral */}
      <Menu setSeccion={setSeccion} seccionActual={seccion} />

      {/* Contenido Dinámico */}
      <div className="contenido">
        {seccion === "transacciones" && <Transacciones />}
        {seccion === "balance" && <h2>📊 Visualización del Balance</h2>}
        {seccion === "presupuestos" && <h2>📅 Creación de Presupuestos</h2>}
      </div>
    </div>
  );
};

export default Inicio;

