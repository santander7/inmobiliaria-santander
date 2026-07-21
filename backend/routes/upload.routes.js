const express = require('express');
const router = express.Router();
const cloudinary = require('../config/cloudinary');
const { verifyToken, isAdmin } = require('../middleware/auth');

router.post('/', verifyToken, isAdmin, async (req, res) => {
  try {
    const { imagenBase64 } = req.body;
    if (!imagenBase64) {
      return res.status(400).json({ message: 'No se ha subido ninguna imagen' });
    }

    // Upload to Cloudinary using base64 string
    const result = await cloudinary.uploader.upload(imagenBase64, {
      folder: "inmobiliaria_putumayo_proyectos",
      resource_type: "auto"
    });

    res.status(200).json({ url: result.secure_url });
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    res.status(500).json({ message: 'Error al subir la imagen', error: error.message });
  }
});

module.exports = router;
