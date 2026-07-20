const express = require('express');
const router = express.Router();
const cloudinary = require('../config/cloudinary');
const { verifyToken, isAdmin } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post('/', verifyToken, isAdmin, upload.single('imagen'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No se ha subido ninguna imagen' });
    }

    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await cloudinary.uploader.upload(dataURI, { folder: "inmobiliaria_putumayo_proyectos" });

    res.status(200).json({ url: result.secure_url });
  } catch (error) {
    res.status(500).json({ message: 'Error al subir la imagen', error: error.message });
  }
});

module.exports = router;
