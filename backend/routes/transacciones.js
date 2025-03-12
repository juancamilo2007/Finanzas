const express = require("express");
const router = express.Router();
const Transaccion = require("../models/transaccion");

// Crear una transacción
router.post("/", async (req, res) => {
  try {
    const nuevaTransaccion = new Transaccion({
      ...req.body,
      cantidad: Number(req.body.cantidad) // Convertir cantidad a número
    });
    await nuevaTransaccion.save();
    res.status(201).json({ message: "Transacción guardada" });
  } catch (error) {
    res.status(500).json({ error: "Error al guardar la transacción" });
  }
});

// Obtener todas las transacciones
router.get("/", async (req, res) => {
  try {
    const transacciones = await Transaccion.find();
    res.status(200).json(transacciones);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las transacciones" });
  }
});

module.exports = router;
