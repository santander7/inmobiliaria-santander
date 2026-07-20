const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyecto.controller');
const { verifyToken, isAdmin } = require('../middleware/auth');

// Rutas Públicas
router.get('/', proyectoController.getProyectos);

// Rutas Privadas (Solo Administrador)
router.post('/', verifyToken, isAdmin, proyectoController.createProyecto);
router.delete('/:id', verifyToken, isAdmin, proyectoController.deleteProyecto);

module.exports = router;
