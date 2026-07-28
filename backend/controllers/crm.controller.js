const Cotizacion = require('../models/Cotizacion');

exports.obtenerLeads = async (req, res) => {
  try {
    const leads = await Cotizacion.find().populate('user', 'nombre correo telefono').sort({ createdAt: -1 });
    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener leads del CRM', error: error.message });
  }
};

exports.actualizarEstadoLead = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;
    const leadActualizado = await Cotizacion.findByIdAndUpdate(id, { estado }, { new: true }).populate('user', 'nombre correo telefono');
    res.status(200).json({ message: 'Estado del lead actualizado', lead: leadActualizado });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar lead', error: error.message });
  }
};
