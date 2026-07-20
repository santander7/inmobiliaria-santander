const mongoose = require('mongoose');

const detalleSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  texto: { type: String, required: true },
  imagen: { type: String, required: true } // URL de la imagen
});

const proyectoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  imagenPrincipal: { type: String, required: true },
  detalles: [detalleSchema],
  creador: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Proyecto', proyectoSchema);
