const express = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");

const router = express.Router();


// Hashear una contraseña
bcrypt.hash('miContraseñaSegura', 10, (err, hashedPassword) => {
  if (err) throw err;
  console.log('Contraseña hasheada:', hashedPassword);
});
// Ruta para iniciar sesión
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar el usuario por su email
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no registrado" });
    }

    // Comparar la contraseña ingresada con la guardada en la base de datos
    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    res.json({ message: "Inicio de sesión exitoso" });
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
});

module.exports = router;
