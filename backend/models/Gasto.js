const mongoose = require('mongoose');

const gastoSchema = new mongoose.Schema({
  obra: { type: mongoose.Schema.Types.ObjectId, ref: 'ObraActiva', required: true },
  concepto: { type: String, required: true },
  categoria: { type: String, enum: ['MATERIALES', 'NOMINA', 'SERVICIOS', 'OTROS'], required: true },
  monto: { type: Number, required: true },
  fecha: { type: Date, default: Date.now },
  soporte_url: { type: String, default: null } // URL del PDF o imagen en Cloudinary
}, { timestamps: true });

module.exports = mongoose.model('Gasto', gastoSchema);
