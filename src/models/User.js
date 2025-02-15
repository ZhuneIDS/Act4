const mongoose = require('mongoose');

// Esquema del usuario en la base de datos
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }, // Correo electrónico del usuario (único y obligatorio)
  password: { type: String, required: true }, // Contraseña del usuario (obligatoria)
});

module.exports = mongoose.model('User', userSchema);
