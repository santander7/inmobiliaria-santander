const ObraActiva = require('../models/ObraActiva');
const Gasto = require('../models/Gasto');

exports.crearObra = async (req, res) => {
  try {
    const nuevaObra = new ObraActiva(req.body);
    await nuevaObra.save();
    res.status(201).json({ message: 'Obra creada exitosamente', obra: nuevaObra });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear obra', error: error.message });
  }
};

exports.obtenerObras = async (req, res) => {
  try {
    const obras = await ObraActiva.find().populate('cliente', 'nombre correo telefono');
    res.status(200).json(obras);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener obras', error: error.message });
  }
};

exports.editarObra = async (req, res) => {
  try {
    const { id } = req.params;
    const obraActualizada = await ObraActiva.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ message: 'Obra actualizada exitosamente', obra: obraActualizada });
  } catch (error) {
    res.status(500).json({ message: 'Error al editar obra', error: error.message });
  }
};

exports.eliminarObra = async (req, res) => {
  try {
    const { id } = req.params;
    // Eliminar la obra y todos sus gastos asociados
    await ObraActiva.findByIdAndDelete(id);
    await Gasto.deleteMany({ obra: id });
    res.status(200).json({ message: 'Obra y gastos eliminados exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar obra', error: error.message });
  }
};

exports.registrarGasto = async (req, res) => {
  try {
    const nuevoGasto = new Gasto(req.body);
    await nuevoGasto.save();
    res.status(201).json({ message: 'Gasto registrado exitosamente', gasto: nuevoGasto });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar gasto', error: error.message });
  }
};

exports.eliminarGasto = async (req, res) => {
  try {
    const { id } = req.params;
    await Gasto.findByIdAndDelete(id);
    res.status(200).json({ message: 'Gasto eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar gasto', error: error.message });
  }
};

exports.editarGasto = async (req, res) => {
  try {
    const { id } = req.params;
    const gastoActualizado = await Gasto.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ message: 'Gasto actualizado', gasto: gastoActualizado });
  } catch (error) {
    res.status(500).json({ message: 'Error al editar gasto', error: error.message });
  }
};

exports.obtenerFinanzasObra = async (req, res) => {
  try {
    const { id } = req.params;
    const obra = await ObraActiva.findById(id).populate('cliente', 'nombre');
    if (!obra) return res.status(404).json({ message: 'Obra no encontrada' });

    const gastos = await Gasto.find({ obra: id }).sort({ fecha: -1 });

    const totalGastado = gastos.reduce((sum, g) => sum + g.monto, 0);
    const saldoDisponible = obra.presupuesto_inicial - totalGastado;
    
    // Calcula el avance basado en la ejecución presupuestal (puede superar 100% si hay sobrecostos)
    const avance_porcentaje = ((totalGastado / obra.presupuesto_inicial) * 100).toFixed(2);

    res.status(200).json({
      obra,
      finanzas: {
        presupuesto_inicial: obra.presupuesto_inicial,
        total_gastado: totalGastado,
        saldo_disponible: saldoDisponible,
        avance_porcentaje: parseFloat(avance_porcentaje)
      },
      gastos
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al calcular finanzas', error: error.message });
  }
};
