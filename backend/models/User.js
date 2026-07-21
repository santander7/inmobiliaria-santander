const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  telefono: { type: String, default: null },
  password: { type: String, required: true },
  role: { type: String, enum: ['USER', 'ADMIN'], default: 'USER' },
  activo: { type: Boolean, default: true },
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String },
  favoritos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Propiedad' }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
