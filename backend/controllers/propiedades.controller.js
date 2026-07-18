const Propiedad = require('../models/Propiedad');
const cloudinary = require('../config/cloudinary');

exports.createPropiedad = async (req, res) => {
  try {
    const { titulo, descripcion, precio, municipio, area, estado, tipo, caracteristicas } = req.body;
    
    // Subir imágenes a Cloudinary si existen
    const imagenesList = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const b64 = Buffer.from(file.buffer).toString('base64');
        const dataURI = "data:" + file.mimetype + ";base64," + b64;
        const result = await cloudinary.uploader.upload(dataURI, { folder: "inmobiliaria_putumayo" });
        imagenesList.push({ url: result.secure_url });
      }
    }

    // Crear propiedad
    const propiedad = await Propiedad.create({
      titulo,
      descripcion,
      precio,
      municipio,
      area,
      estado,
      tipo,
      caracteristicas: caracteristicas ? JSON.parse(caracteristicas) : {},
      imagenes: imagenesList,
      creador: req.userId // Creador
    });

    res.status(201).json({ message: 'Propiedad creada con éxito', propiedad });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la propiedad', error: error.message });
  }
};

exports.getPropiedades = async (req, res) => {
  try {
    const { tipo, municipio, minPrecio, maxPrecio } = req.query;
    let filter = {};
    
    if (tipo) filter.tipo = tipo;
    if (municipio) filter.municipio = municipio;
    
    if (minPrecio || maxPrecio) {
      filter.precio = {};
      if (minPrecio) filter.precio.$gte = Number(minPrecio);
      if (maxPrecio) filter.precio.$lte = Number(maxPrecio);
    }

    // Usamos el .find de Mongoose en vez de .findAll
    const propiedades = await Propiedad.find(filter).populate('creador', 'nombre correo');

    res.status(200).json(propiedades);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener propiedades', error: error.message });
  }
};
