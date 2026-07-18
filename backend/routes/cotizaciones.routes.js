const express = require('express');
const router = express.Router();
const cotizacionesController = require('../controllers/cotizaciones.controller');
const { verifyToken, isAdmin } = require('../middleware/auth');

// Crear cotización inteligente
router.post('/', cotizacionesController.crearCotizacion);

// Panel Admin: Ver todas las cotizaciones
router.get('/', verifyToken, isAdmin, cotizacionesController.obtenerCotizaciones);

module.exports = router;
