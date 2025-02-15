const mongoose = require('mongoose');

// Esquema del producto en la base de datos
const productSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Nombre del producto (obligatorio)
  description: { type: String }, // Descripción opcional del producto
  price: { type: Number, required: true }, // Precio del producto (obligatorio)
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Usuario que creó el producto
});

module.exports = mongoose.model('Product', productSchema);
