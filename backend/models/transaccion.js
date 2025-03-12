const mongoose = require("mongoose");

const transaccionSchema = new mongoose.Schema({
  tipo: { type: String, required: true },
  cantidad: { type: Number, required: true },
  categoria: { type: String, required: true },
  fecha: { type: Date, required: true },
  descripcion: { type: String },
});

module.exports = mongoose.model("Transaccion", transaccionSchema);
