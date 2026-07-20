const Proyecto = require('../models/Proyecto');

exports.createProyecto = async (req, res) => {
  try {
    const { titulo, descripcion, imagenPrincipal, detalles } = req.body;
    
    const proyecto = await Proyecto.create({
      titulo,
      descripcion,
      imagenPrincipal,
      detalles: detalles || [],
      creador: req.userId
    });

    res.status(201).json({ message: 'Proyecto creado con éxito', proyecto });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el proyecto', error: error.message });
  }
};

exports.getProyectos = async (req, res) => {
  try {
    const proyectos = await Proyecto.find().sort({ createdAt: -1 }).populate('creador', 'nombre');
    res.status(200).json(proyectos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener proyectos', error: error.message });
  }
};

exports.getProyectoById = async (req, res) => {
  try {
    const proyecto = await Proyecto.findById(req.params.id);
    if (!proyecto) {
      return res.status(404).json({ message: 'Proyecto no encontrado' });
    }
    res.status(200).json(proyecto);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el proyecto', error: error.message });
  }
};

exports.updateProyecto = async (req, res) => {
  try {
    const { titulo, descripcion, imagenPrincipal, detalles } = req.body;
    
    const proyecto = await Proyecto.findByIdAndUpdate(
      req.params.id,
      {
        titulo,
        descripcion,
        imagenPrincipal,
        detalles: detalles || []
      },
      { new: true }
    );

    if (!proyecto) {
      return res.status(404).json({ message: 'Proyecto no encontrado' });
    }

    res.status(200).json({ message: 'Proyecto actualizado con éxito', proyecto });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el proyecto', error: error.message });
  }
};

exports.deleteProyecto = async (req, res) => {
  try {
    const proyecto = await Proyecto.findByIdAndDelete(req.params.id);
    if (!proyecto) {
      return res.status(404).json({ message: 'Proyecto no encontrado' });
    }
    res.status(200).json({ message: 'Proyecto eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el proyecto', error: error.message });
  }
};
