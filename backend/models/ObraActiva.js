const mongoose = require('mongoose');

const obraActivaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  presupuesto_inicial: { type: Number, required: true },
  fecha_inicio: { type: Date, default: Date.now },
  estado: { type: String, enum: ['INICIADA', 'EN_PROGRESO', 'PAUSADA', 'FINALIZADA'], default: 'INICIADA' }
}, { timestamps: true });

module.exports = mongoose.model('ObraActiva', obraActivaSchema);
