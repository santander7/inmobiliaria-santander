const mongoose = require('mongoose');

const cotizacionSchema = new mongoose.Schema({
  tipo_proyecto: { type: String, enum: ['LOTE_Y_CASA', 'SOLO_CASA', 'REMODELACION', 'SOLO_LOTE'], required: true },
  fase_construccion: { type: String, enum: ['OBRA_GRIS', 'OBRA_BLANCA', 'NO_APLICA'], default: 'OBRA_BLANCA' },
  tipo_estructura: { type: String, enum: ['UN_PISO_TECHO', 'UN_PISO_PLANCHA', 'DOS_PISOS', 'NO_APLICA'], default: 'UN_PISO_TECHO' },
  metros_cuadrados: { type: Number, required: true },
  habitaciones: { type: Number, required: true },
  banos: { type: Number, required: true },
  tipo_acabados: { type: String, enum: ['ECONOMICO', 'ESTANDAR', 'PREMIUM', 'NINGUNO'], default: 'ESTANDAR' },
  zona_lote: { type: String, enum: ['CENTRO', 'PERIFERIA', 'RURAL', 'NO_APLICA'], default: 'NO_APLICA' },
  area_lote: { type: Number, default: null },
  presupuesto_cliente: { type: Number, default: null },
  costo_materiales: { type: Number, required: true },
  costo_mano_obra: { type: Number, required: true },
  costo_lote: { type: Number, default: 0 },
  costo_calculado: { type: Number, required: true },
  tiempo_meses: { type: Number, required: true },
  incluye_lote: { type: Boolean, default: false },
  respuestas_cliente: { type: Object, default: null },
  estado: { type: String, enum: ['PRELIMINAR', 'CONTACTADO', 'CERRADO'], default: 'PRELIMINAR' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  lote: { type: mongoose.Schema.Types.ObjectId, ref: 'Propiedad' }
}, { timestamps: true });

module.exports = mongoose.model('Cotizacion', cotizacionSchema);
