import { useState } from "react";
import { Link } from "react-router-dom";
import "./LoginForm.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState(""); // Mensaje del modal
  const [modalVisible, setModalVisible] = useState(false); // Estado para mostrar/ocultar modal

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5003/api/usuarios/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMensaje("✅ Iniciando sesión...");
      } else {
        setMensaje("❌ " + data.error);
      }

      setModalVisible(true); // Muestra el modal

      // Oculta el modal después de 3 segundos
      setTimeout(() => {
        setModalVisible(false);
        if (response.ok) {
          window.location.href = "/inicio"; // Redirige si el login es exitoso
        }
      }, 3000);
    } catch (error) {
      setMensaje("❌ Error en el servidor");
      setModalVisible(true);
      setTimeout(() => setModalVisible(false), 3000);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>👤 Iniciar Sesión</h2>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Ingresar</button>

        <p className="register-text">
          ¿No tienes cuenta?
          <Link to="/register" className="register-link"> Registrarse</Link>
        </p>
      </form>

      {/* Modal de alerta con animación */}
      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <p>{mensaje}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
