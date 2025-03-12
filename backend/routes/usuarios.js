const express = require("express");
const Usuario = require("../models/usuario");

const router = express.Router();
const bcrypt = require("bcrypt");


router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Verifica si el usuario existe en la base de datos
  const usuario = await Usuario.findOne({ email });

  if (!usuario) {
    return res.status(400).json({ error: "Usuario no registrado" });
  }

  // Verifica si la contraseña es correcta (compara con bcrypt si está encriptada)
  const bcrypt = require("bcryptjs");

  const passwordValido = await bcrypt.compare(password, usuario.password);
  
  if (!passwordValido) {
    return res.status(400).json({ error: "Contraseña incorrecta" });
  }

  res.json({ mensaje: "Inicio de sesión exitoso" });
});


// Ruta para registrar un usuario
router.post("/register", async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ error: "El usuario ya existe" });
    }

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear usuario
    const nuevoUsuario = new Usuario({
      nombre,
      email,
      password: hashedPassword,
    });

    await nuevoUsuario.save();
    res.status(201).json({ mensaje: "Usuario registrado con éxito" });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

router.get("/", async (req, res) => {
  try {
    const usuarios = await Usuario.find(); // Busca todos los usuarios en la base de datos
    res.json(usuarios); // Devuelve los usuarios en formato JSON
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
});

// 📌 Actualizar un usuario por ID (PUT)
router.put("/:id", async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      req.params.id,
      { nombre, email, password },
      { new: true } // Para devolver el usuario actualizado
    );

    if (!usuarioActualizado) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(usuarioActualizado);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el usuario" });
  }
});

// 📌 Eliminar un usuario por ID (DELETE)
router.delete("/:id", async (req, res) => {
  try {
    const usuarioEliminado = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuarioEliminado) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el usuario" });
  }
});
module.exports = router;
