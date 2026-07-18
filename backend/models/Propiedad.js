const mongoose = require('mongoose');

const propiedadSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  precio: { type: Number, required: true },
  municipio: { type: String, required: true },
  area: { type: Number, required: true },
  estado: { type: String, enum: ['DISPONIBLE', 'VENDIDO', 'RESERVADO'], default: 'DISPONIBLE' },
  tipo: { type: String, enum: ['CASA', 'LOTE'], required: true },
  caracteristicas: { type: Object, default: {} }, // { habitaciones: 3, baños: 2, etc }
  imagenes: [{ url: { type: String, required: true } }], // Embedded array of images
  creador: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Propiedad', propiedadSchema);
