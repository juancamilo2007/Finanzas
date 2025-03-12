const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config({ path: './conexion.env' });

// Inicializamos Express
const app = express();

// Requiere las rutas
const transaccionesRoutes = require("./routes/transacciones");
const authRoutes = require("./routes/auth");
const usuariosRoutes = require("./routes/usuarios");

// Middleware
app.use(express.json()); // Para recibir datos en formato JSON
app.use(cors()); // Permitir conexiones desde el frontend

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((error) => console.error("❌ Error al conectar a MongoDB:", error));

// Rutas
app.use("/api/usuarios", authRoutes);
app.use("/api/usuarios", usuariosRoutes); // Ruta para usuarios
app.use("/api/transacciones", transaccionesRoutes); // Ruta para transacciones

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor funcionando 🚀");
});

// Iniciar el servidor
const PORT = process.env.PORT || 5003; // Asegúrate de que el puerto sea 5003
app.listen(PORT, () => {
  console.log(`🔥 Servidor corriendo en http://localhost:${PORT}`);
});

console.log("✅ Rutas de usuarios cargadas correctamente");
console.log("✅ Rutas de transacciones cargadas correctamente");