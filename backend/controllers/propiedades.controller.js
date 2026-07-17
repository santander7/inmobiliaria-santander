const { Propiedad, ImagenPropiedad } = require('../models');
const cloudinary = require('../config/cloudinary');
const { Op } = require('sequelize');

exports.createPropiedad = async (req, res) => {
  try {
    const { titulo, descripcion, precio, municipio, area, estado, tipo, caracteristicas } = req.body;
    
    // Crear propiedad
    const propiedad = await Propiedad.create({
      titulo,
      descripcion,
      precio,
      municipio,
      area,
      estado,
      tipo,
      caracteristicas: caracteristicas ? JSON.parse(caracteristicas) : null,
      admin_id: req.userId
    });

    // Subir imágenes a Cloudinary si existen
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const b64 = Buffer.from(file.buffer).toString('base64');
        const dataURI = "data:" + file.mimetype + ";base64," + b64;
        const result = await cloudinary.uploader.upload(dataURI, { folder: "inmobiliaria_putumayo" });
        
        await ImagenPropiedad.create({
          url: result.secure_url,
          propiedad_id: propiedad.id
        });
      }
    }

    res.status(201).json({ message: 'Propiedad creada con éxito', propiedad });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la propiedad', error: error.message });
  }
};

exports.getPropiedades = async (req, res) => {
  try {
    const { tipo, municipio, minPrecio, maxPrecio } = req.query;
    let where = {};
    
    if (tipo) where.tipo = tipo;
    if (municipio) where.municipio = municipio;
    
    if (minPrecio || maxPrecio) {
      where.precio = {};
      if (minPrecio) where.precio[Op.gte] = minPrecio;
      if (maxPrecio) where.precio[Op.lte] = maxPrecio;
    }

    const propiedades = await Propiedad.findAll({
      where,
      include: [{ model: ImagenPropiedad, as: 'imagenes' }]
    });

    res.status(200).json(propiedades);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener propiedades', error: error.message });
  }
};
