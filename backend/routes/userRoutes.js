const express = require("express");
const router = express.Router();
const User = require("../models/usuario"); // Importamos el modelo de usuario
const bcrypt = require("bcrypt");

// Ruta para registrar un nuevo usuario
router.post("/register", async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    // Verificar si el usuario ya existe
    const userExistente = await User.findOne({ email });
    if (userExistente) {
      return res.status(400).json({ error: "El usuario ya está registrado" });
    }

    // Hashear la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario en la base de datos
    const nuevoUsuario = new User({
      nombre,
      email,
      password: hashedPassword,
    });

    await nuevoUsuario.save();
    res.status(201).json({ message: "Usuario registrado con éxito" });

  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
});

module.exports = router;
