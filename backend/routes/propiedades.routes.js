const express = require('express');
const router = express.Router();
const propiedadesController = require('../controllers/propiedades.controller');
const { verifyToken, isAdmin } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Rutas Públicas (Buscador Inteligente)
router.get('/', propiedadesController.getPropiedades);

// Rutas Privadas (Solo Administrador)
router.post('/', verifyToken, isAdmin, upload.array('imagenes', 5), propiedadesController.createPropiedad);

module.exports = router;
