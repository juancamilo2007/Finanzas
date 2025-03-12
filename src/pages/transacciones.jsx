import { useState } from "react";
import "../pages/transacciones.css";

const Transacciones = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [transaccion, setTransaccion] = useState({
    tipo: "ingreso",
    cantidad: "",
    categoria: "",
    fecha: "",
    descripcion: "",
  });
  const [alerta, setAlerta] = useState({ mostrar: false, mensaje: "", tipo: "" });

  const handleChange = (e) => {
    setTransaccion({ ...transaccion, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const transaccionConCantidadNumerica = { ...transaccion, cantidad: parseFloat(transaccion.cantidad) };
      const respuesta = await fetch("http://localhost:5003/api/transacciones", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transaccionConCantidadNumerica),
      });

      if (respuesta.ok) {
        setAlerta({ mostrar: true, mensaje: "✅ Transacción guardada", tipo: "exito" });
        setMostrarFormulario(false);
        setTransaccion({ tipo: "ingreso", cantidad: "", categoria: "", fecha: "", descripcion: "" });
      } else {
        setAlerta({ mostrar: true, mensaje: "❌ Error al guardar", tipo: "error" });
      }
    } catch (error) {
      console.error("Error:", error);
      setAlerta({ mostrar: true, mensaje: "❌ Error al guardar", tipo: "error" });
    } finally {
      setTimeout(() => setAlerta({ mostrar: false, mensaje: "", tipo: "" }), 2000);
    }
  };

  return (
    <div className="transacciones-container">
      <button className="btn-agregar" onClick={() => setMostrarFormulario(true)}>
        Agregar Transacción
      </button>

      {mostrarFormulario && (
        <div className="formulario-overlay">
          {alerta.mostrar && <div className={`alerta ${alerta.tipo}`}>{alerta.mensaje}</div>}
          <form className="formulario" onSubmit={handleSubmit}>
            <h2>Agregar Transacción</h2>

            <label>Tipo:</label>
            <select name="tipo" onChange={handleChange} value={transaccion.tipo}>
              <option value="ingreso">Ingreso</option>
              <option value="costo">Costo</option>
            </select>

            <label>Cantidad:</label>
            <input type="text" name="cantidad" onChange={handleChange} value={transaccion.cantidad} required />

            <label>Categoría:</label>
            <input type="text" name="categoria" onChange={handleChange} value={transaccion.categoria} required />

            <label>Fecha:</label>
            <input type="date" name="fecha" onChange={handleChange} value={transaccion.fecha} required />

            <label>Descripción:</label>
            <textarea name="descripcion" onChange={handleChange} value={transaccion.descripcion}></textarea>

            <div className="botones">
              <button type="button" onClick={() => setMostrarFormulario(false)}>Cancelar</button>
              <button type="submit">Agregar</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Transacciones;
