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

    // Upload to Cloudinary using file path
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "inmobiliaria_putumayo_proyectos",
      resource_type: "auto"
    });

    // Delete temp file asynchronously
    const fs = require('fs');
    fs.unlink(req.file.path, (err) => {
      if (err) console.error("Failed to delete temp file:", err);
    });

    res.status(200).json({ url: result.secure_url });
  } catch (error) {
    res.status(500).json({ message: 'Error al subir la imagen', error: error.message });
  }
});

module.exports = router;
