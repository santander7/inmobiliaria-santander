const express = require('express');
const router = express.Router();
const citasController = require('../controllers/citas.controller');
const auth = require('../middleware/auth');

router.post('/', auth.verifyToken, citasController.crearCita);
router.get('/', auth.verifyToken, citasController.obtenerCitas);
router.put('/:id', [auth.verifyToken, auth.isAdmin], citasController.actualizarEstado);

module.exports = router;
