const mongoose = require('mongoose');

const solicitudSchema = new mongoose.Schema({
  tipo: { type: String, enum: ['INFORMACION', 'COMPRA', 'CONSTRUCCION', 'ASESORIA'], required: true },
  estado: { type: String, enum: ['PENDIENTE', 'EN_PROCESO', 'FINALIZADO'], default: 'PENDIENTE' },
  detalles: { type: String, default: null },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Solicitud', solicitudSchema);
