const express = require('express');
const router = express.Router();
const cotizacionesController = require('../controllers/cotizaciones.controller');
const { verifyToken, isAdmin } = require('../middleware/auth');

// Crear cotización inteligente
router.post('/', cotizacionesController.crearCotizacion);

// Obtener cotizaciones (Admin ve todas, Usuario ve las suyas)
router.get('/', verifyToken, cotizacionesController.obtenerCotizaciones);

module.exports = router;
