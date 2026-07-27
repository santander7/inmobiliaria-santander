const express = require('express');
const router = express.Router();
const erpController = require('../controllers/erp.controller');
const auth = require('../middleware/auth');

// Solo administradores pueden gestionar el ERP
router.post('/obras', [auth.verifyToken, auth.isAdmin], erpController.crearObra);
router.get('/obras', [auth.verifyToken, auth.isAdmin], erpController.obtenerObras);
router.get('/obras/:id/finanzas', [auth.verifyToken, auth.isAdmin], erpController.obtenerFinanzasObra);
router.post('/gastos', [auth.verifyToken, auth.isAdmin], erpController.registrarGasto);

module.exports = router;
