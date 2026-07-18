const mongoose = require('mongoose');

const citaSchema = new mongoose.Schema({
  fecha_hora: { type: Date, required: true },
  estado: { type: String, enum: ['PENDIENTE', 'CONFIRMADA', 'CANCELADA', 'FINALIZADA'], default: 'PENDIENTE' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  propiedad: { type: mongoose.Schema.Types.ObjectId, ref: 'Propiedad' }
}, { timestamps: true });

module.exports = mongoose.model('Cita', citaSchema);
